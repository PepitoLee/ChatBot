import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
  var mongoose: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

export {}