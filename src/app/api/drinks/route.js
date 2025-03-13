"use server"

import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { Drink } from "@/models/drinks"

export async function GET() {
    try {
        await connectDB()
        const data = await Drink.find()

        return NextResponse.json({success: true, data})
    } catch(error) {
        return NextResponse.json({success: false, error: error.message}, {status: 500})
    }
}