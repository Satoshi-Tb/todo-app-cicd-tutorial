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
        <form>
          <input
            type="text"
            placeholder="追加するタスク"
            className="border border-gray-300 rounded px-2 py-1 mt-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-1 ml-2"
          >
            追加
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
