export interface Item {
    id: number;
    date: string;
    item: string
}

export interface CrudItemsProps {
    items: Item[];
    deleteItem: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function CrudItems({ items, deleteItem }: CrudItemsProps) {
    return (
        <>
            {items.map((i) => (
                <li key={i.id.toString()} className="mb-2">{i.item}
                    <button
                        value={i.id}
                        onClick={deleteItem}
                        className="ml-2 p-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Delete
                    </button>
                </li>
            ))}

        </>
    )
}