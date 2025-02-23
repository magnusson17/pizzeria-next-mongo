"use client"

async function getData() {
    const res = await fetch("http://localhost:3000/api/users", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
}

export default async function Page() {
    const { data } = await getData();

    return (
        <div>
            <h1>Data from MongoDB</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}