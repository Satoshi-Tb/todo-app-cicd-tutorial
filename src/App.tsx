import { useState } from "react";
import "./App.css";

type TodoType = { id: number; title: string; done: boolean };

const initialTodos: TodoType[] = [
  { id: 1, title: "買い物", done: false },
  { id: 2, title: "掃除", done: true },
  { id: 3, title: "散歩", done: false },
];

function App() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todos, setTodos] = useState<TodoType[]>(initialTodos);

  return (
    <>
      <div>
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center mt-4">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => {
                setTodos((prevTodos) =>
                  prevTodos.map((t) =>
                    t.id === todo.id ? { ...t, done: !t.done } : t
                  )
                );
              }}
              className="mr-2"
            />
            <span className={todo.done ? "line-through" : ""}>
              {todo.title}
            </span>
          </div>
        ))}
        <form
          className="mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (todoTitle.trim() === "") return;

            setTodos((prevTodos) => {
              const newTodo: TodoType = {
                id: prevTodos.length + 1,
                title: todoTitle,
                done: false,
              };
              return [...prevTodos, newTodo];
            });
            setTodoTitle("");
          }}
        >
          <input
            type="text"
            placeholder="追加するタスク"
            className="border border-gray-300 rounded px-2 py-1 mt-4"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
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
