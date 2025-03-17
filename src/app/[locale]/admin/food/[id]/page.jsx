"use client"

import { useParams, useRouter } from "next/navigation"
import { updateFood } from "@/actions/foodCRUD"
import { useFetchData } from "@/custom-hooks/useFetchData"
import { useFetchSingleData } from "@/custom-hooks/useFetchSingleData"

export default function Food() {
    const { id } = useParams()
    const router = useRouter()

    const { fetchedElement: fetchedElementFood } = useFetchSingleData(`foods/${id}`)
    const { fetchedElements: fetchedElementsIngredients } = useFetchData(`ingredients`)
    const { fetchedElements: fetchedElementsFoodTypes } = useFetchData(`food-types`)

    const handleSubmit = async e => {
        e.preventDefault()
        const formData = new FormData(e.target)

        const ingredienti = formData.getAll("ingredienti").map(el => el)
        const tipologie = formData.getAll("tipologie").map(el => el)

        const update = await updateFood({
            id,
            titoloIt: formData.get("titolo-it"),
            titoloEn: formData.get("titolo-en"),
            prezzo: formData.get("prezzo"),
            ingredienti,
            tipologie
        })

        router.push("/admin/food")
    }

    if (!fetchedElementFood) return <p>Loading...</p>

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="titolo-it" defaultValue={fetchedElementFood.titolo.it} />
            <input type="text" name="titolo-en" defaultValue={fetchedElementFood.titolo.en} />
            <input type="number" name="prezzo" defaultValue={fetchedElementFood.prezzo} />

            <div>Ingredienti</div>
            {fetchedElementsIngredients.map(el => {
                return (
                    <div key={el._id}>
                        <input 
                            type="checkbox"
                            name="ingredienti"
                            value={el._id}
                            defaultChecked={fetchedElementFood.ingredienti.some(ing => ing._id === el._id)}
                        />
                        <label htmlFor="ingredienti">{el.titolo.it}</label>
                    </div>
                )
            })}
            
            <div>Tipologie</div>
            {fetchedElementsFoodTypes.map(el => {
                return (
                    <div key={el._id}>
                        <input 
                            type="checkbox"
                            name="tipologie"
                            value={el._id}
                            defaultChecked={fetchedElementFood.tipologie.some(type => type._id === el._id)}
                        />
                        <label htmlFor="ingredienti">{el.titolo.it}</label>
                    </div>
                )
            })}
            <input type="submit" />
        </form>
    )
}