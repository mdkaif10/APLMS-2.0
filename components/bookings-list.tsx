'use client'

import { Booking } from '@/schemas/booking'
import { ParkingLocation } from '@/schemas/parking-locations'
import { BookingStatus } from '@/types'
import { format } from 'date-fns'
import { getStreetFromAddress } from '@/lib/utils'
import CancelBookingButton from '@/components/cancel-booking-button'
import EditBookingButton from '@/components/edit-booking-button'

interface BookingsListProps {
  bookings: any[]
}

export default function BookingsList({ bookings }: BookingsListProps) {
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
                    <p>{format(new Date(booking.bookingdate), 'MMM, dd yyy')}</p>
                    <p>
                      {format(new Date(booking.starttime), 'hh:mm a')} - {format(new Date(booking.endtime), 'hh:mm a')}
                    </p>
                  </div>
                </div>
                {booking.status === BookingStatus.BOOKED && (
                  <div className="flex sm:flex-col sm:space-y-2 items-end justify-end">
                    <CancelBookingButton param={booking.id} />
                    <EditBookingButton booking={booking} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
} 