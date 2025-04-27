import { connectToDB } from '@/lib/db'
import { Booking, BookingModel } from '@/schemas/booking'
import { ParkingLocationModel } from '@/schemas/parking-locations'
import { auth } from '@clerk/nextjs/server'
import BookingsList from '@/components/bookings-list'
import { stripe } from '@/lib/stripe'
import { BookingStatus } from '@/types'
import { sendConfirmationEmail } from '@/actions/actions'
import { Metadata } from '@stripe/stripe-js'

async function MyBookingsPage({
    searchParams
}: { searchParams: { session_id?: string } }) {
    const { userId } = auth()

    if (!userId) {
        await auth().redirectToSignIn({ returnBackUrl: '/mybookings'})
    }

    // Process the booking if session_id is provided
    if (searchParams.session_id) {
        try {
            const checkoutSession = await stripe.checkout.sessions.retrieve(searchParams.session_id, {
                expand: ['payment_intent']
            })
            
            const paymentIntent = checkoutSession.payment_intent as any
            if (paymentIntent && paymentIntent.status === 'succeeded') {
                const metadata = checkoutSession.metadata as Metadata
                const bookingid = metadata['bookingid']
                
                await connectToDB()
                
                const booking = await BookingModel.findById<Booking>(bookingid)
                if (booking && booking.status === BookingStatus.PENDING) {
                    booking.status = BookingStatus.BOOKED
                    booking.stripesessionid = searchParams.session_id
                    
                    await booking.save()
                    
                    await sendConfirmationEmail(bookingid)
                }
            }
        } catch (error) {
            console.error('Error processing booking:', error)
        }
    }

    await connectToDB()

    const bookings: Booking[] = await BookingModel.find({
        userid: userId
    }).populate({
        path: 'locationid', model: ParkingLocationModel
    })

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 mt-16">
                <div className="max-w-4xl mx-auto">
                    {searchParams.session_id && (
                        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-md">
                            <h2 className="text-xl font-semibold text-green-700">Booking Confirmed!</h2>
                            <p className="text-green-600">Your booking has been successfully processed.</p>
                        </div>
                    )}
                    <BookingsList bookings={JSON.parse(JSON.stringify(bookings))} />
                </div>
            </div>
        </div>
    )
}

export default MyBookingsPage 