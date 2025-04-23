"use client"

import { useParams, useRouter } from "next/navigation"
import { useFetchSingleData } from "@/custom-hooks/useFetchSingleData"
import { updateDrink } from "@/actions/drinkCRUD"

export default function SingleDrink() {
    const { id } = useParams()
    const router = useRouter()

    const { fetchedElement } = useFetchSingleData(`drinks/${id}`)

    const handleSubmit = async e => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const update = await updateDrink({
            id,
            titoloIt: formData.get("titolo-it"),
            titoloEn: formData.get("titolo-en"),
            prezzo: formData.get("prezzo"),
        })

        if (!update.success) return alert(update.message)

        alert(update.message)
        router.push("/admin/drink")
    }

    if (!fetchedElement) return <p>Loading...</p>

    return (
        <div>
            <h1>{fetchedElement.titolo.it}</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" name="titolo-it" defaultValue={fetchedElement.titolo.it} />
                <input type="text" name="titolo-en" defaultValue={fetchedElement.titolo.en} />
                <input type="number" step="0.01" name="prezzo" defaultValue={fetchedElement.prezzo} />
                <input type="submit" />
            </form>
        </div>
    )
}