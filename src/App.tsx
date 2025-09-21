import { useCallback, useRef, useState } from "react";
import "./App.css";
import { TodoInput } from "./components/TodoInput";
import type { TodoType } from "./types/todo";
import { TodoList } from "./components/TodoList";

const initialTodos: TodoType[] = [
  { id: 1, title: "買い物", done: false },
  { id: 2, title: "掃除", done: true },
  { id: 3, title: "散歩", done: false },
];

function App() {
  const [todos, setTodos] = useState<TodoType[]>(initialTodos);
  const nextId = useRef(initialTodos.length);
  const getSeq = () => ++nextId.current;

  const handleAddTodo = useCallback((title: string) => {
    if (title.trim() === "") return;

    setTodos((prevTodos) => {
      const newTodo: TodoType = {
        id: getSeq(),
        title: title.trim(),
        done: false,
      };
      return [...prevTodos, newTodo];
    });
  }, []);

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded">
        <h1 className="text-2xl font-bold mb-4">TODOリスト</h1>
        <TodoInput handleAddTodo={handleAddTodo} />
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </>
  );
}

export default App;
