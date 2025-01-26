'use client'
import { useEffect, useState } from "react"
import { FetchItems, AddItems } from "@/lib/firebase/firebase"


export default function Page() {
    const [item, setItem] = useState("")
    const [items, setItems] = useState<any[]>([])

    useEffect(() => {
        const getItems = async () => {
            try {
                const fetchedItems = await FetchItems()
                setItems(fetchedItems)
            } catch (error) {
                console.error('Failed to fetch items')
            }
        }
        getItems()
    }, [])


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await AddItems(item)
            const fetchedItems = await FetchItems()
            setItems(fetchedItems)
        } catch (error) {
            console.error
        }
    }

    const handleItems = (e: any) => {
        setItem(e.target.value);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <ul className="mb-4">
                        {items.map((i) => (
                            <li key={i.id} className="mb-2">{i.item} <button className="ml-2 p-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button></li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        name="item"
                        placeholder="Item"
                        className="mb-4 p-2 border border-black rounded bg-white"
                        value={item}
                        onChange={handleItems}
                    />
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Add New Item
                    </button>
                </div>
            </form>
        </>

    )
}