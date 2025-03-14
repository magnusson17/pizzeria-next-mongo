"use server"

import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { FoodType } from "@/models/foodTypes"

export async function GET() {
    await connectDB()

    try {
        const data = await FoodType.find().sort({ updateAt: -1 })
        return NextResponse.json({success: true, data})
    } catch (error) {
        return NextResponse.json({success: false, error: error.message}, {status: 500})
    }
}