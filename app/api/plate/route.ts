import { sendViolationEmail } from "@/actions/actions"
import { BookingModel } from "@/schemas/booking"
import { BookingStatus } from "@/types"
import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"

export async function POST(req: Request) {
    try {
        // Connect to database first
        await connectToDB()

        const body = await req.json()
        const authHeader = req.headers.get('authorization')

        if (!authHeader) {
            return NextResponse.json({message: "Not allowed"}, {status: 401})
        }

        const token = authHeader.split(' ')[1]
        if (token !== process.env.APP_KEY) {
            return NextResponse.json({message: "Wrong credentials"}, {status: 401})
        }

        const { plate, address, timestamp } = body

        if (!plate || !address || !timestamp) {
            return NextResponse.json({
                message: "Missing required fields",
                required: ["plate", "address", "timestamp"],
                received: { plate, address, timestamp }
            }, { status: 400 })
        }

        const booking = await BookingModel.findOne({
            plate: plate.toLowerCase(),
            status: BookingStatus.BOOKED
        })

        if (!booking) {
            console.log("Violation: ", plate)
            await sendViolationEmail(plate, address, timestamp)
        } else {
            console.log("OK ", plate)
        }

        return NextResponse.json({
            message: "ok",
            plate,
            hasBooking: !!booking
        })

    } catch(error) {
        console.error("Plate API Error:", error)
        return NextResponse.json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error",
            stack: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.stack : undefined : undefined
        }, { status: 500 })
    }
}