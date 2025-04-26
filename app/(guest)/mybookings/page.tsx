import CancelBookingButton from '@/components/cancel-booking-button'
import EditBookingButton from '@/components/edit-booking-button'
import { connectToDB } from '@/lib/db'
import { getStreetFromAddress } from '@/lib/utils'
import { Booking, BookingModel } from '@/schemas/booking'
import { ParkingLocation, ParkingLocationModel } from '@/schemas/parking-locations'
import { BookingStatus } from '@/types'
import { auth } from '@clerk/nextjs/server'
import { format, formatRelative } from 'date-fns'
import React from 'react'

async function MyBookingsPage() {
    const { userId } = auth()

    if (!userId) {
        await auth().redirectToSignIn({ returnBackUrl: '/mybookings'})
    }

    await connectToDB()

    const bookings: Booking[] = await BookingModel.find({
        userid: userId
    }).populate({
        path: 'locationid', model: ParkingLocationModel
    })

    const getStatusColor = (status: BookingStatus) => {
        switch (status) {
            case BookingStatus.BOOKED:
                return "text-green-500"
            case BookingStatus.CANCELLED:
                return "text-red-500"
            case BookingStatus.PENDING:
                return "text-yellow-500"
            default:
                return "text-muted-foreground"
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 mt-16">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-card rounded-lg shadow-sm border border-border">
                        <header className="text-2xl sm:text-4xl text-center w-full p-6 text-foreground font-bold">
                            My Bookings
                        </header>
                        <div className="divide-y divide-border">
                            {bookings.length === 0 ? (
                                <div className="p-6 text-center text-muted-foreground">
                                    No bookings found
                                </div>
                            ) : (
                                bookings.map(booking => (
                                    <div key={booking.id} className="p-6 hover:bg-muted/50 transition-colors">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                                            <div className="flex flex-col space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <span className={`text-sm font-medium ${getStatusColor(booking.status as BookingStatus)}`}>
                                                        {booking.status}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-semibold text-foreground">
                                                    {getStreetFromAddress(((booking.locationid as unknown) as ParkingLocation).address)}
                                                </h3>
                                                <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                                                    <p>{format(booking.bookingdate, 'MMM, dd yyy')}</p>
                                                    <p>
                                                        {format(booking.starttime, 'hh:mm a')} - {format(booking.endtime, 'hh:mm a')}
                                                    </p>
                                                </div>
                                            </div>
                                            {booking.status === BookingStatus.BOOKED && (
                                                <div className="flex sm:flex-col sm:space-y-2 items-end justify-end">
                                                    <CancelBookingButton param={JSON.parse(JSON.stringify(booking.id))} />
                                                    <EditBookingButton booking={JSON.parse(JSON.stringify(booking))} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyBookingsPage