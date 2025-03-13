"use client"

import { useState } from "react"

export default function FilterContent({ fetchedElements, setElements, hasTranslation }) {
    const [search, setSearch] = useState("")

    const filterContent = e => {
        const val = e.target.value
        setSearch(val)

        if (val === "") {
            setElements(fetchedElements)
        } else {
            setElements(fetchedElements.filter(ing => hasTranslation ? ing.nome.it.toLowerCase().includes(val) : ing.nome.toLowerCase().includes(val)))
        }
    }

    return (
        <div>
            <label>Filtra per nome contenuto</label>
            <input type="text" value={search} onChange={filterContent} />
        </div>
    )
}