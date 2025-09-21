import React, { useCallback } from "react";
import type { TodoType } from "../types/todo";

type TodoItemProps = {
  todo: TodoType;
  handleDone: (id: number) => void;
  handleDelete: (id: number) => void;
};

export const TodoItem = React.memo(
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
