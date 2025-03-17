import { useState, useEffect } from "react"
import { urlApi } from "@/lib/publicVars"

export function useFetchSingleData(endpoint) {
    const [fetchedElement, setFetchedElement] = useState(null)

    const handleFetch = async () => {
        try {
            const res = await fetch(`${urlApi}/${endpoint}`)
            const { data } = await res.json()
            console.log(data)
            setFetchedElement(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleFetch()
    }, [])

    return { handleFetch, fetchedElement }
}
