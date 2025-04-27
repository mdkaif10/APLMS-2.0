import { stripe } from "@/lib/stripe"
import Stripe from "stripe"
import { Metadata } from '@stripe/stripe-js'
import { connectToDB } from "@/lib/db"
import { Booking, BookingModel } from "@/schemas/booking"
import { ParkingLocation, ParkingLocationModel } from "@/schemas/parking-locations"
import { formatDate } from "date-fns"
import { BookingStatus } from "@/types"
import React from "react"
import { CheckCircle2, XCircle } from "lucide-react"
import { sendConfirmationEmail } from "@/actions/actions"
import { currentUser } from "@clerk/nextjs/server"
import { formatAmountForDisplay } from '@/lib/utils'

async function BookingCheckoutResultPage({
    searchParams
}: { searchParams: { session_id: string } }) {

    const session_id = searchParams.session_id
    // get the user
    const user = await currentUser()

    if (!session_id) {
        return (
            <main className="sm:container flex flex-col items-center pt-16">
                <XCircle size={64} className="text-red-500" />
                <h1 className="text-2xl font-bold text-red-500 mt-4">Invalid Session</h1>
                <p className="text-gray-600 mt-2">The booking session is invalid or has expired.</p>
            </main>
        )
    }

    if (!user) {
        return (
            <main className="sm:container flex flex-col items-center pt-16">
                <XCircle size={64} className="text-red-500" />
                <h1 className="text-2xl font-bold text-red-500 mt-4">Authentication Required</h1>
                <p className="text-gray-600 mt-2">Please log in to view your booking details.</p>
            </main>
        )
    }
    
    let checkoutSession: Stripe.Checkout.Session
    try {
        checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['payment_intent']
        })
    } catch (error) {
        console.error('Failed to retrieve checkout session:', error)
        return (
            <main className="sm:container flex flex-col items-center pt-16">
                <XCircle size={64} className="text-red-500" />
                <h1 className="text-2xl font-bold text-red-500 mt-4">Session Error</h1>
                <p className="text-gray-600 mt-2">Failed to retrieve booking information. Please contact support if this persists.</p>
            </main>
        )
    }

    if (!checkoutSession.payment_intent) {
        return (
            <main className="sm:container flex flex-col items-center pt-16">
                <XCircle size={64} className="text-red-500" />
                <h1 className="text-2xl font-bold text-red-500 mt-4">Payment Error</h1>
                <p className="text-gray-600 mt-2">Payment information not found. Please contact support.</p>
            </main>
        )
    }

    const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent
    const paymentStatus = paymentIntent.status === 'succeeded' ? 'Payment Successful' : 'Payment failed'

    let address = ''
    let date = ''
    let arrivingon = ''
    let leavingon = ''
    let plate = ''
    let amount = 0

    if (paymentIntent.status === 'succeeded') {
        const metadata = checkoutSession.metadata as Metadata
        const bookingid = metadata['bookingid']

        await connectToDB()

        const booking = await BookingModel.findById<Booking>(bookingid).populate({
            path: 'locationid', model: ParkingLocationModel
        })

        if (booking) {
            address = ((booking?.locationid as any) as ParkingLocation).address
            date = formatDate(booking?.bookingdate!, 'MMM dd, yyyy')
            arrivingon = formatDate(booking?.starttime!, 'hh:mm a')
            leavingon = formatDate(booking?.endtime!, 'hh:mm a')
            plate = booking.plate
            amount = booking.amount

            if (booking.status === BookingStatus.PENDING) {
                booking.status = BookingStatus.BOOKED
                booking.stripesessionid = session_id
                await booking.save()

                // send confirmation email
                await sendConfirmationEmail(bookingid)
            }
        }
    }

    return (
        <main className="sm:container flex flex-col items-center pt-16">
            {paymentIntent.status === 'succeeded' ? (
                <>
                    <CheckCircle2 size={64} className="text-green-500" />
                    <h1 className="text-2xl font-bold text-green-500 mt-4">{paymentStatus}</h1>
                    <div className="mt-8 p-6 bg-white rounded-lg shadow-md w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
                        <div className="space-y-2">
                            <p><span className="font-medium">Location:</span> {address}</p>
                            <p><span className="font-medium">Date:</span> {date}</p>
                            <p><span className="font-medium">Arrival:</span> {arrivingon}</p>
                            <p><span className="font-medium">Departure:</span> {leavingon}</p>
                            <p><span className="font-medium">Plate Number:</span> {plate}</p>
                            <p><span className="font-medium">Amount Paid:</span> {formatAmountForDisplay(amount, 'INR')}</p>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <XCircle size={64} className="text-red-500" />
                    <h1 className="text-2xl font-bold text-red-500 mt-4">{paymentStatus}</h1>
                    <p className="text-gray-600 mt-2">Your payment was not successful. Please try again.</p>
                </>
            )}
        </main>
    )
}

export default BookingCheckoutResultPage 