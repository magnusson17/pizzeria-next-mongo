"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Admin() {
    const { status } = useSession()
    const router = useRouter()

    const showSession = () => {
        if (status === "authenticated") {
            return (
                <button
                    onClick={() => {
                        signOut({ redirect: false }).then(() => {
                            router.push("/")
                        })
                    }}
                >
                    Sign Out
                </button>
            )
        } else if (status === "loading") {
            return <span>Loading...</span>
        }
    }
    return (
        <main>
            <h1>Admin page</h1>

            <Link href="/admin/pizza">Add pizza</Link>

            {showSession()}
        </main>
    )
}