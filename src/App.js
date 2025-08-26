import { useState } from "react";
import Logo from "./components/Logo.js";
import Form from "./components/Form.js";
import PackingList from "./components/PackingList.js";
import Stats from "./components/Stats.js";

const initialItems = [
  
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

  function clearList() {
    setItems([]);
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
      <PackingList items={items} onDeleteItem={handleDeleteItem} onHandleChecked={handleChecked} handleClearList={clearList}/>
      <Stats items={items}/>
    </div>
  );
}