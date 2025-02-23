import mongoose from 'mongoose'

// In Next.js Server Components execute on every request, which means your connect() function might be running repeatedly
// da trovare quindi un metodo per non ripetere la connessione in loop

let isConnected = false

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected")
    } catch (error) {
        console.log("MongoDB connection error", error)
    }
}

export default connect