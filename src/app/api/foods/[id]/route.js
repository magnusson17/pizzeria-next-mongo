"use server"

import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { Food } from "@/models/foods"

export async function GET(req, { params }) {
    const { id } = await params
    
    await connectDB()
    
    try {
        const data = await Food.findById(id)
            .populate("ingredienti", "titolo")
            .populate("tipologie", "titolo")

        return NextResponse.json({ success: true, data })
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}