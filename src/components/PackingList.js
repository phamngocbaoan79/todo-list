import { useState } from "react";
import Item from "./Item.js";

export default function PackingList({ items, onDeleteItem, onHandleChecked, handleClearList }) {
    const [sortBy, setSortBy] = useState("input");

    let sortedItems;

    if (sortBy === "input") sortedItems = items;

    if (sortBy === 'description') sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

    if (sortBy === 'packed') sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

    return (
        <div className="list">
            <ul>
                {items.length === 0 ? <em className="empty-list">Your list is empty</em> : sortedItems.map((item) => (
                    <Item item={item}
                        key={item.id}
                        onDeleteItem={onDeleteItem}
                        onHandleChecked={onHandleChecked} />
                ))}
            </ul>

            {items.length > 0 && <div className="actions">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="input">sort by input order.</option>
                    <option value="description">sort by description</option>
                    <option value="packed">sort by status</option>
                </select>

                <button onClick={handleClearList}>Clear List</button>
            </div>}
        </div>
    );
}