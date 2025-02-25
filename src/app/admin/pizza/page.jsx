"use client"

import { addPizza } from "@/actions/addPizza"

export default function Pizza() {
    const handleSubmit = async (formData) => {
        const add = await addPizza({
            nome: formData.get("nome"),
            prezzo: formData.get("prezzo")
        })
    }
    
    return (
        <form action={handleSubmit}>
            <input name="nome" placeholder="nome" />
            <input name="prezzo" placeholder="prezzo" />
            <input type="submit" />
        </form>
    )
}