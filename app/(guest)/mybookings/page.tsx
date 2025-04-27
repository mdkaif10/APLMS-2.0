import { connectToDB } from '@/lib/db'
import { Booking, BookingModel } from '@/schemas/booking'
import { ParkingLocationModel } from '@/schemas/parking-locations'
import { auth } from '@clerk/nextjs/server'
import BookingsList from '@/components/bookings-list'

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

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 mt-16">
                <div className="max-w-4xl mx-auto">
                    <BookingsList bookings={JSON.parse(JSON.stringify(bookings))} />
                </div>
            </div>
        </div>
    )
}

export default MyBookingsPage