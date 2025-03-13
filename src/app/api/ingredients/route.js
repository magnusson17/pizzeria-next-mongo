"use server"

import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { Ingredient } from "@/models/ingredients"

export async function GET() {
    try {
        await connectDB()
        const data = await Ingredient.find().sort({ "nome.it": 1 })

        return NextResponse.json({ success: true, data })
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}