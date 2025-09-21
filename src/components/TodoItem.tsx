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

    const checkboxId = `todo-${todo.id}`;

    return (
      <div className="flex items-center mt-2 mb-2 border border-gray-200 rounded-lg p-2">
        <input
          id={checkboxId}
          type="checkbox"
          checked={todo.done}
          onChange={handleTodoDone}
          className="mr-2 cursor-pointer"
        />
        <label
          htmlFor={checkboxId}
          className={`${
            todo.done ? "line-through" : ""
          } hover:cursor-pointer select-none`}
        >
          {todo.title}
        </label>
        <button
          className="ml-auto bg-red-500 text-white rounded px-2 py-1 hover:cursor-pointer"
          onClick={handleTodoDelete}
        >
          削除
        </button>
      </div>
    );
  }
);
