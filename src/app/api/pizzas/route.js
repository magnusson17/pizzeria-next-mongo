import { NextResponse } from "next/server";
import connect from "@/lib/db.js";
import { Pizza } from "@/models/pizzas.js"

// il nome della funzione deve essere GET(), POST()...
export async function GET() {
    try {
        await connect()
        const pizzas = await Pizza.find()

        return NextResponse.json({ success: true, data: pizzas }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
