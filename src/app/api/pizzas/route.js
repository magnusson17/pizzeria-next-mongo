"use server"

import { NextResponse } from "next/server"
import connect from "@/lib/db"
import { Pizza } from "@/models/pizzas"

// il nome della funzione deve essere GET(), POST()...
export async function GET() {
    try {
        await connect()
        // .populate: al posto del id di ogni ingrediente associato alla singola pizza
        // popola la key ingredienti con i contenuti ingrediente, in questo caso farà un retrieve solo del id e del "nome"
        const data = await Pizza.find().populate("ingredienti", "nome")

        return NextResponse.json({ success: true, data })
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
