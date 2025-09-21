import React, { useCallback, useMemo, useState } from "react";
import "./App.css";
import { TodoInput } from "./components/TodoInput";

type TodoType = { id: number; title: string; done: boolean };

const initialTodos: TodoType[] = [
  { id: 1, title: "買い物", done: false },
  { id: 2, title: "掃除", done: true },
  { id: 3, title: "散歩", done: false },
];

const getSeq = (() => {
  let id = initialTodos.length;
  return () => {
    id += 1;
    return id;
  };
})();

function App() {
  const [todos, setTodos] = useState<TodoType[]>(initialTodos);

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

  const handleTodoDelete = useCallback(
    (id: number) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    },
    [setTodos]
  );

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.done).length,
    [todos]
  );

  return (
    <div>
      {todos.length === 0 && (
        <p className="mt-4 text-gray-500">TODOを追加してください。</p>
      )}
      {todos.length > 0 && (
        <p className="mt-4 text-gray-700">
          完了済み: {completedCount} / {todos.length}
        </p>
      )}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDone={handleTodoDone}
          handleDelete={handleTodoDelete}
        />
      ))}
    </div>
  );
});

type TodoItemProps = {
  todo: TodoType;
  handleDone: (id: number) => void;
  handleDelete: (id: number) => void;
};

const TodoItem = React.memo(
  ({ todo, handleDone, handleDelete }: TodoItemProps) => {
    // useEffect(() => {
    //   console.log("レンダリングTODO ITEM", todo.id);
    // });

    const handleTodoDone = useCallback(() => {
      handleDone(todo.id);
    }, [handleDone, todo.id]);

    const handleTodoDelete = useCallback(() => {
      handleDelete(todo.id);
    }, [handleDelete, todo.id]);

    return (
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={handleTodoDone}
          className="mr-2"
        />
        <span className={todo.done ? "line-through" : ""}>{todo.title}</span>
        <button
          className="ml-auto bg-red-500 text-white rounded px-2 py-1"
          onClick={handleTodoDelete}
        >
          削除
        </button>
      </div>
    );
  }
);

export default App;
