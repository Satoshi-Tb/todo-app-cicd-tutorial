import React, { useCallback, useState } from "react";

type TodoInputProps = {
  handleAddTodo: (title: string) => void;
};

export const TodoInput = React.memo(({ handleAddTodo }: TodoInputProps) => {
  const [todoTitle, setTodoTitle] = useState("");

  const handleTodoTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTodoTitle(e.target.value);
    },
    []
  );

  const onAddTodo = useCallback(() => {
    handleAddTodo(todoTitle);
    setTodoTitle("");
  }, [handleAddTodo, todoTitle]);

  return (
    <>
      <div className="mt-4">
        <input
          type="text"
          placeholder="新しいTODOを入力..."
          className="border border-gray-300 rounded px-2 py-1 mt-4"
          value={todoTitle}
          onChange={handleTodoTitleChange}
          aria-label="新しいTODOを入力"
        />
        <button
          type="button"
          className="bg-blue-500 text-white rounded px-4 py-1 ml-2 hover:cursor-pointer"
          onClick={onAddTodo}
        >
          追加
        </button>
      </div>
    </>
  );
});
