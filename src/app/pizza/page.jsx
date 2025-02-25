"use client"

import { GET as handler } from "@/app/api/pizzas/route"

export default async function Page() {
    const { data } = await handler();

    return (
        <div>
            <h1>Data from MongoDB</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}