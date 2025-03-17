"use server"

import { NextResponse } from "next/server"
import connect from "@/lib/db"
import { Food } from "@/models/foods"

// il nome della funzione deve essere GET(), POST()...
export async function GET() {
    await connect()
    
    try {
        // .populate: al posto del id di ogni ingrediente associato alla singola Food
        // popola la key ingredienti con i contenuti ingrediente, in questo caso farà un retrieve solo del id e del "nome"
        const data = await Food.find()
            .populate("ingredienti", "titolo")
            .populate("tipologie", "titolo")
            .sort({ updatedAt: -1 })

        return NextResponse.json({ success: true, data })
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
