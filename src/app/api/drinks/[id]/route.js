"use server"

import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { Drink } from "@/models/drinks"

export async function GET(req, res) {
    const { id } = await res.params

    await connectDB()

    try {
        const data = await Drink.findById(id)
        return NextResponse.json({ success: true, data })
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}