"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Login() {
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async e => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const res = await signIn("credentials", {
            username: formData.get("username"),
            password: formData.get("password"),
            redirect: false,
        })
        
        if (res?.error) {
            setError(res.error)
        }
        if (res?.ok) {
            return router.push("/admin")
        }
    }

    return (
        <div className="page-login page">
            <form onSubmit={handleSubmit} className="comp-form">
                {error && <div>{error}</div>}
                <h1>Sign In</h1>

                <div className="comp-form__wrapper-input">
                    <label>Username</label>
                    <input type="text" placeholder="Username" name="username"/>
                </div>               
                
                <div className="comp-form__wrapper-input">
                    <label>Password</label>
                    <input type="password" placeholder="Password" name="password"/>
                </div>

                <button className="comp-cta">Sign In</button>
            </form>
        </div>
    )
}
