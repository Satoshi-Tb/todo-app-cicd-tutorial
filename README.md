# TODO リストアプリ（React + TypeScript + Vite）

## アプリ概要

このリポジトリは、React（TypeScript）と Vite で作成したシンプルな TODO 管理アプリです。最小構成で実装しつつ、実用的な UI/UX とテストを備えています。

### 主な機能

- TODO の追加：テキスト入力欄と「追加」ボタンで新規作成（空文字・空白のみは無視）
- 完了/未完の切替：各項目のチェックボックスでトグル
- 削除：各項目の「削除」ボタンで項目を削除
- 集計表示：「完了済み: X / Y」をヘッダ下に表示
- 初期データ：サンプル TODO データがあらかじめ投入されています

### 技術スタック

- フロントエンド：React 19, TypeScript, Vite
- スタイル：Tailwind CSS
- テスト：Vitest, @testing-library/react, @testing-library/jest-dom

## セットアップと実行

前提：Node.js 18+ を推奨

```bash
npm install
npm run dev    # 開発サーバ起動
npm run test   # テスト実行（Vitest）
npm run build  # 本番ビルド
```

## 画面概要

- 画面上部に「TODO リスト」の見出し
- 入力欄に TODO を入力して「追加」を押すと一覧に表示
- 各項目のチェックボックスで完了状態を切替、右端の「削除」で項目削除
- 一覧の上に「完了済み: X / Y」を表示

---
