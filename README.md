# ①課題番号-プロダクト名

グルメ検索アプリ

## ②課題内容（どんな作品か）

- 地域やジャンルを選択することでHotPepperに登録されている飲食店を検索できる
- ログインすることでお気に入り登録ができる

## ③DEMO

https://web-api-app.vercel.app/

## ④作ったアプリケーション用のIDまたはPasswordがある場合

- ユーザー名: テスト2
- E-mail: test2@example.com
- PW: test_2024_2

## ⑤工夫した点・こだわった点

- 状態管理でReduxを使ってユーザー情報をグローバルに管理
- お気に入り機能を導入して、FireStore Databaseにて保持
- 動的ルーティングで実装

## ⑥難しかった点・次回トライしたいこと(又は機能)

- Reduxの概念理解（大規模アプリだとより有効らしい）
- CSRとSSRでのコンポーネントやAPI実装
- Reduxでのユーザー情報保持アルゴリズムの実装
- UIに力を入れれなかったため、磨き込みたい
- ReduxのStoreにもっと情報を保持させて有効性を確かめたかった
- OpenAIのAPIも使ってレコメンド機能も付けたかった

## ⑦質問・疑問・感想、シェアしたいこと等なんでも

- [質問]
- [感想]前回はContext、今回はReduxで共通情報を扱ったがReduxはToolkitで現在の情報を可視化できるから開発はしやすかった。だが、アプリ規模的にContextで良かった。
- [参考記事]
  - 1. https://qiita.com/FarStep131/items/ad834facc57a443a9dc3
  - 2. https://ja.react.dev/reference/react/hooks
  - 3. https://react-redux.js.org/introduction/getting-started
  - 4. https://www.vareal.co.jp/column/react-redux/
  - 5. https://qiita.com/asagohan2301/items/6ddd90845a710a5478f2