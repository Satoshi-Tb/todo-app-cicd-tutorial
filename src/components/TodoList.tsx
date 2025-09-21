import React, { useCallback, useMemo } from "react";
import type { TodoType } from "../types/todo";
import { TodoItem } from "./TodoItem";

type TodoListProps = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

export const TodoList = React.memo(({ todos, setTodos }: TodoListProps) => {
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
