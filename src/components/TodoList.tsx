import React, { useMemo } from "react";
import type { TodoType } from "../types/todo";
import { TodoItem } from "./TodoItem";

type TodoListProps = {
  todos: TodoType[];
  onToggleTodo: (id: number) => void;
  onDeleteTotod: (id: number) => void;
};

export const TodoList = React.memo(
  ({ todos, onToggleTodo, onDeleteTotod }: TodoListProps) => {
    // useEffect(() => {
    //   console.log("レンダリングTODO LIST");
    // });

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
            handleDone={onToggleTodo}
            handleDelete={onDeleteTotod}
          />
        ))}
      </div>
    );
  }
);
