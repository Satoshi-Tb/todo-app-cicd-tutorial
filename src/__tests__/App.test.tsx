import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  test("アプリタイトルが表示されている", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "TODOリスト" })
    ).toBeInTheDocument();
  });

  test("TODOを追加できる", async () => {
    render(<App />);
    const input = screen.getByRole("textbox", { name: "新しいTODOを入力" });
    const addButton = screen.getByRole("button", { name: "追加" });

    // テキストフィールド入力後、追加ボタンをクリック
    fireEvent.change(input, { target: { value: "新しいTODO" } });
    fireEvent.click(addButton);
    // 追加したTODOが表示され、入力欄がクリアされていること
    expect(screen.getByText("新しいTODO")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  test("空のTODOは追加されない", async () => {
    render(<App />);
    const input = screen.getByRole("textbox", { name: "新しいTODOを入力" });
    const addButton = screen.getByRole("button", { name: "追加" });
    // 空文字で追加ボタンをクリック
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(addButton);
    // 初期表示のTODOが3件のままであること
    expect(screen.getAllByRole("checkbox")).toHaveLength(3);
  });

  test("TODOの完了状態を切り替えられる", async () => {
    render(<App />);
    const firstTodoCheckbox = screen.getAllByRole("checkbox")[0];
    // 最初のTODOのチェックボックスをクリック
    fireEvent.click(firstTodoCheckbox);
    // チェックが入っていること
    expect(firstTodoCheckbox).toBeChecked();
  });

  test("完了済みTODOの件数が表示される", async () => {
    render(<App />);
    expect(screen.getByText("完了済み: 1 / 3")).toBeInTheDocument();
    const firstTodoCheckbox = screen.getAllByRole("checkbox")[0];
    // 最初のTODOのチェックボックスをクリック
    fireEvent.click(firstTodoCheckbox);
    expect(screen.getByText("完了済み: 2 / 3")).toBeInTheDocument();
  });

  test("削除ボタンでTODOを削除できる", async () => {
    render(<App />);
    const firstTodoDeleteButton = screen.getAllByRole("button", {
      name: "削除",
    })[0];
    // 最初のTODOの削除ボタンをクリック
    fireEvent.click(firstTodoDeleteButton);
    expect(screen.queryByText("買い物")).not.toBeInTheDocument();
    expect(screen.getAllByRole("checkbox")).toHaveLength(2);
  });
});
