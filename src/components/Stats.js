export default function Stats({ items }) {
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