interface CrudItemsProps {
    items: any[];
    deleteItem: (e: any) => void;
  }
export default function CrudItems({items, deleteItem}:CrudItemsProps) {
    return (
        <>
            {items.map((i) => (
                <li key={i.id} className="mb-2">{i.item}
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