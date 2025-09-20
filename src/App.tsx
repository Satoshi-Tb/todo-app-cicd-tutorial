import React, { useCallback, useEffect, useState } from "react";
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
      <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded">
        <h1 className="text-2xl font-bold mb-4">TODOリスト</h1>
        <TodoList todos={todos} setTodos={setTodos} />
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

type TodoListProps = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const TodoList = React.memo(({ todos, setTodos }: TodoListProps) => {
  // useEffect(() => {
  //   console.log("レンダリングTODO LIST");
  // });

  const handleTodoDone = useCallback(
    (id: number) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        )
      );
    },
    [setTodos]
  );

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} handleDone={handleTodoDone} />
      ))}
    </div>
  );
});

type TodoItemProps = {
  todo: TodoType;
  handleDone: (id: number) => void;
};

const TodoItem = React.memo(({ todo, handleDone }: TodoItemProps) => {
  // useEffect(() => {
  //   console.log("レンダリングTODO ITEM", todo.id);
  // });

  const handleTodoDone = useCallback(() => {
    handleDone(todo.id);
  }, [handleDone, todo.id]);

  return (
    <div className="flex items-center mt-4">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={handleTodoDone}
        className="mr-2"
      />
      <span className={todo.done ? "line-through" : ""}>{todo.title}</span>
    </div>
  );
});

export default App;
