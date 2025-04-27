import { connectToDB } from "@/lib/db";
import { ParkingLocation, ParkingLocationModel } from "@/schemas/parking-locations";
import { BookingModel } from "@/schemas/booking";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        await connectToDB()
        const formData: FormData = await request.formData()
        const data = formData.get('data') as string
        const parkingLocation = JSON.parse(data) as ParkingLocation
        console.log(parkingLocation.address)
        const record = await ParkingLocationModel.create<ParkingLocation>({
            address: parkingLocation.address,
            gpscoords: parkingLocation.gpscoords,
            location: {
                coordinates: [parkingLocation.gpscoords.lng, parkingLocation.gpscoords.lat]
            },
            numberofspots: parkingLocation.numberofspots,
            price: parkingLocation.price,
            status: parkingLocation.status
        })
        return NextResponse.json({
            message: 'Parking location created',
            parkinglocation: record
        })
    } catch (error) {
        console.log(error)
        return new NextResponse("Server error", { status: 500 })
    }
}

// GET: Return all locations with real-time spotsBooked and spotsAvailable
export async function GET(request: NextRequest) {
    try {
        await connectToDB();
        const locations = await ParkingLocationModel.find().lean();
        // For each location, count bookings with status 'booked' or 'active'
        const results = await Promise.all(locations.map(async (loc: any) => {
            const spotsBooked = await BookingModel.countDocuments({
                locationid: loc._id,
                status: { $in: ['booked', 'active', 'BOOKED', 'ACTIVE'] }
            });
            return {
                ...loc,
                spotsBooked,
                spotsAvailable: (loc.numberofspots || 0) - spotsBooked
            };
        }));
        return NextResponse.json(results);
    } catch (error) {
        console.error('[LOCATIONS_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}