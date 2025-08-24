import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Oil", quantity: 100, packed: true },
];

export default function App() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState(initialItems);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { id: Date.now(), description, quantity, packed: false };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);

    setDescription("");
    setQuantity(1);
  }

  return (
    <div className="app">
      <Logo />
      <Form
        description={description}
        setDescription={setDescription}
        quantity={quantity}
        setQuantity={setQuantity}
        handleSubmit={handleSubmit}
      />
      <PackingList items={items}/>
      <Stats />
    </div>
  );
}

// 🔥 Tách các component ra ngoài để không bị re-mount
function Logo() {
  return <h1>🌴 Far Away 🏕️</h1>;
}

function Form({ description, setDescription, quantity, setQuantity, handleSubmit }) {
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({items}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have 0 items on your list, you need to pack 0 items</em>
    </footer>
  );
}
