
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "oil", quantity: 100, packed: true },
];

export default function App() {
  return (
    <div className="app">
        <Logo />
        <Form />
        <PackingList />
        <Stats />
    </div>
  )

  function handleSubmit(e) {
    e.preventDefault();
    console.log("form submitted");
  }

  function Logo() {
    return <h1>🌴 Far Away 🏕️</h1>;
  }

  function Form() {
    return (
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>what do you need for your trip ?</h3>
        <select>
          {/* Array from dùng để tạo ra 1 mảng mới, ở đây có length : 20 => array like object có 20 phần tử như nhau 
          với call back i + 1 => 1 tới 20. trong callback có _ là giá trị của phần tử không dùng nên để _, i là index  */}
          {Array.from({length: 20}, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>{num}</option>
          ))}
        </select>
        <input type="text" placeholder="Item..." />
        <button>Add</button>
      </form>
    )
  }

  function PackingList() {
    return (
      <div className="list">
        <ul>
            {initialItems.map(item => (
              <Item item={item} key={item.id}/>
            ))}
        </ul>
      </div>
    )
  }

  function Item({item}) {
    return (
      <li>
        <span style={item.packed ? {textDecoration: "line-through"} : {}}>
            {item.quantity} {item.description}
        </span>
        <button>❌</button>
      </li>
    )
  }

  function Stats() {
    return (
      <footer className="stats">
        <em>💼 You have 0 items on your list, you need to pack 0 items</em>
      </footer>
    )
  }
}