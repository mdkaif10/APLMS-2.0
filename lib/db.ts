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

// Set max listeners to prevent warning
mongoose.connection.setMaxListeners(20)

// Store event listener references for cleanup
const eventListeners = {
    connected: () => console.log('MongoDB connected successfully'),
    error: (err: Error) => console.error('MongoDB connection error:', err),
    disconnected: () => console.log('MongoDB disconnected')
}

// Function to remove event listeners
const removeEventListeners = () => {
    mongoose.connection.removeListener('connected', eventListeners.connected)
    mongoose.connection.removeListener('error', eventListeners.error)
    mongoose.connection.removeListener('disconnected', eventListeners.disconnected)
}

export const clientPromise = async () => {
    await connectToDB()
    return Promise.resolve<MongoClientType>(client)
}

export const connectToDB = async () => {
    try {
        // Remove any existing listeners before adding new ones
        removeEventListeners()

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

        // Add event listeners
        mongoose.connection.on('connected', eventListeners.connected)
        mongoose.connection.on('error', eventListeners.error)
        mongoose.connection.on('disconnected', eventListeners.disconnected)

        // Handle process termination
        const cleanup = async () => {
            removeEventListeners()
            await mongoose.connection.close()
            process.exit(0)
        }

        process.on('SIGINT', cleanup)
        process.on('SIGTERM', cleanup)

    } catch (error) {
        console.error('MongoDB connection error:', error)
        throw error
    }
}