"use server"

import connectDB from "@/lib/db"
import { AuthUser } from "@/models/authUsers"
import bcrypt from "bcryptjs"

export const register = async (values) => {
    const { username, password } = values

    try {
        await connectDB()
        const userFound = await AuthUser.findOne({ username })
        
        if (userFound) {
            return {
                error: 'User already exists!'
            }
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new AuthUser({
            username,
            password: hashedPassword,
        })

        await user.save()

    } catch (error) {
        console.log(error)
    }
}