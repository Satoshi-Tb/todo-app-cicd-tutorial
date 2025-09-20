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
});
