import { NextResponse } from "next/server";
import connect from "@/lib/db.js";
import { User } from "@/lib/models/users.js"

// il nome della funzione deve essere GET(), POST()...
export async function GET() {
    try {
        await connect()
        const users = await User.find()

        return NextResponse.json({ success: true, data: users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
