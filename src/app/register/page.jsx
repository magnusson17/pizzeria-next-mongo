"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { register } from "@/actions/register"

export default function Register() {

    const [error, setError] = useState()
    const router = useRouter()
    const ref = useRef(null)

    const handleSubmit = async (formData) => {
        const r = await register({
            username: formData.get("username"),
            password: formData.get("password"),
        })

        ref.current?.reset()
        
        if (r?.error) {
            setError(r.error)
            return
        } else {
            return router.push("/login")
        }
    }

    return (
        <section>
            <form ref={ref} action={handleSubmit}>
                {error && <div>{error}</div>}
                <h1>Register</h1>

                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                </div>

                <button>Sign up</button>

                <Link href="/login">Already have an account?</Link>
            </form>
        </section>
    )
}

