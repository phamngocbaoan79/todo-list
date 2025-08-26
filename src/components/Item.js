export default function Item({ item, onDeleteItem, onHandleChecked }) {
    return (
        <li>
            <input type="checkbox" checked={item.packed} readOnly onClick={() => onHandleChecked(item.id)} />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}