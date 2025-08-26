import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Oil", quantity: 100, packed: false },
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

  function handleDeleteItem(id) {
     setItems((items) => items.filter(item => item.id !== id));
  }

  function handleChecked(id) {
    // Map nó sẽ duyệt qua từng phần tử trong mảng, và return lại một phần tử mới để tạo thành mảng mới
    // => ...item để trả ra 1 object như cũ, sau đó ghi đè thuộc tính packed bằng cách đảo ngược giá trị hiện tại của nó
    setItems((items) => items.map((item) => item.id === id ? {...item, packed: !item.packed} : item ));
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
      <PackingList items={items} onDeleteItem={handleDeleteItem} onHandleChecked={handleChecked}/>
      <Stats items={items}/>
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

function PackingList({items, onDeleteItem, onHandleChecked}) {
  return (
    <div className="list">
      <ul>
        {items.length === 0 ? <em className="empty-list">Your list is empty</em> : items.map((item) => (
          <Item item={item} 
          key={item.id} 
          onDeleteItem={onDeleteItem} 
          onHandleChecked={onHandleChecked}/>
        )) }
      </ul>

      <div className="actions">
        <select>
          <option value="sort">sort by input order.</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by status</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem , onHandleChecked}) {
  // Nên dùng onChange + checked thay vì onClick + value để tránh lỗi cũng như đảm bảo tính truy cập, chuẩn React hơn
  // dùng onClick vẫn chạy bình thường nhưng phải thêm readOnly để không bị lỗi (warning)
  return (
    <li>
      <input type="checkbox" checked={item.packed} readOnly onClick={() => onHandleChecked(item.id)}/>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const numberItems = items.length;
  const numberPacked = items.filter(item => (item.packed)).length;
  const percentTage = Math.round((numberPacked / numberItems) * 100);
  return (
    <footer className="stats">
      {
        percentTage === 100 ? <em>You are ready to go! 🏕️</em> 
        : <em>💼 You have {numberItems} items on your list and you already packed {numberPacked} ({percentTage} %)
          </em>
      }
    </footer>
  );
}
