"use client"

import { addFoodType } from "@/actions/foodTypeCRUD"
import { useFetchData } from "@/custom-hooks/useFetchData"
import FilterContent from "@/components/FilterContent"

export default function FoodType() {
    const { handleFetch, fetchedElements, setPrintedElements, printedElements } = useFetchData("food-types")

    const handleSubmit = async e => {
        e.preventDefault()
        const formData = new FormData(e.target)

        const add = await addFoodType({
            titoloIt: formData.get("titolo-it"),
            titoloEn: formData.get("titolo-en")
        })

        alert(add.message)

        if (add.success) {
            handleFetch();
            e.target.reset();
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="titolo-it" />
                <input type="text" name="titolo-en" />
                <input type="submit" />
            </form>

            <FilterContent
                fetchedElements={fetchedElements}
                setPrintedElements={setPrintedElements}
            />
        
            <ul>
                {printedElements.map(el => (
                    <li key={el._id}>
                        <h2>{el.titolo.it}</h2>
                    </li>
                ))}
            </ul>
        </div>
    )
}