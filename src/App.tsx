import "./App.css";

function App() {
  const todos = [
    { id: 1, title: "買い物", done: false },
    { id: 2, title: "掃除", done: true },
    { id: 3, title: "散歩", done: false },
  ];
  return (
    <>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => alert("ボタンクリック")}
        >
          追加
        </button>
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center mt-4">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => {}}
              className="mr-2"
            />
            <span className={todo.done ? "line-through" : ""}>
              {todo.title}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
