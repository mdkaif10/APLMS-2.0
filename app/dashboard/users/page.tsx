import { connectToDB } from "@/lib/db"
import { BookingModel } from "@/schemas/booking"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Car, Clock } from "lucide-react"
import { formatAmountForDisplay } from "@/lib/utils"

async function UsersPage() {
  await connectToDB()

  const totalBookings = await BookingModel.countDocuments({})
  const totalRevenue = await BookingModel.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" }
      }
    }
  ])

  const bookingsByStatus = await BookingModel.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    }
  ])

  const revenue = totalRevenue[0]?.total || 0

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatAmountForDisplay(revenue, 'INR')}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Booking Statistics</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookingsByStatus.map((status) => (
            <Card key={status._id}>
              <CardHeader>
                <CardTitle className="text-sm font-medium capitalize">{status._id} Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{status.count}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UsersPage 