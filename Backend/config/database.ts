import mongoose from 'mongoose'
import 'dotenv/config'

export const connection = async () => {
    try {
        await mongoose.set('strictQuery', false)
        await mongoose.connect(`${process.env.mongo_url}`)
        console.log('MongoDB Connected')
    } catch (err) {
        console.log(err)
    }
}

