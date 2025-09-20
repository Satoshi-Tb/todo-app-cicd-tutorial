import React, { useCallback, useEffect, useState } from "react";
import "./App.css";

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
  const [todoTitle, setTodoTitle] = useState("");
  const [todos, setTodos] = useState<TodoType[]>(initialTodos);

  const handleAddTodo = useCallback(() => {
    if (todoTitle.trim() === "") return;

    setTodos((prevTodos) => {
      const newTodo: TodoType = {
        id: getSeq(),
        title: todoTitle,
        done: false,
      };
      return [...prevTodos, newTodo];
    });
    setTodoTitle("");
  }, [todoTitle]);

  const handleTodoTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTodoTitle(e.target.value);
    },
    []
  );

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded">
        <h1 className="text-2xl font-bold mb-4">TODOリスト</h1>
        <div className="mt-4">
          <input
            type="text"
            placeholder="新しいTODOを入力..."
            className="border border-gray-300 rounded px-2 py-1 mt-4"
            value={todoTitle}
            onChange={handleTodoTitleChange}
          />
          <button
            type="button"
            className="bg-blue-500 text-white rounded px-4 py-1 ml-2"
            onClick={handleAddTodo}
          >
            追加
          </button>
        </div>
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

  return (
    <div>
      {todos.length === 0 && (
        <p className="mt-4 text-gray-500">TODOを追加してください。</p>
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
