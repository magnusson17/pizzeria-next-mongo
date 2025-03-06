"use server"

import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { Pizza } from "@/models/pizzas"

export async function GET(req, { params }) {
    const { id } = await params
    
    try {
        await connectDB()

        const data = await Pizza.findById(id).populate("ingredienti", "nome")

        return NextResponse.json({ success: true, data })
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}