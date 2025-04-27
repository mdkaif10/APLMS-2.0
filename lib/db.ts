// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb/lib/mongodb.ts
import { MongoClient } from "mongodb"
import mongoose, { Mongoose } from 'mongoose'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
type MongoClientType = MongoClient | mongoose.mongo.MongoClient
let client: MongoClientType

let globalWithMongo = global as typeof globalThis & {
    _mongooseClient?: Mongoose
}

export const clientPromise = async () => {
    await connectToDB()
    return Promise.resolve<MongoClientType>(client)
}

export const connectToDB = async () => {
    try {
        if (process.env.NODE_ENV === 'development') {
            if (!globalWithMongo._mongooseClient) {
                globalWithMongo._mongooseClient = await mongoose.connect(uri, {
                    maxPoolSize: 10,
                    serverSelectionTimeoutMS: 5000,
                    socketTimeoutMS: 45000,
                })
            }
            client = globalWithMongo._mongooseClient.connection.getClient()
        } else {
            let _client = await mongoose.connect(uri, {
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            })
            client = _client.connection.getClient()
        }

        // Add connection event listeners
        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully')
        })

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err)
        })

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected')
        })

        // Handle process termination
        process.on('SIGINT', async () => {
            await mongoose.connection.close()
            process.exit(0)
        })

    } catch (error) {
        console.error('MongoDB connection error:', error)
        throw error
    }
}