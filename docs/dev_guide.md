# 🛠️ 開発者向けドキュメント

## 🚀 推奨ランタイム

- Bun

## 📁 ディレクトリ構成

```
.
├── LICENSE           # ライセンス（GPL 3.0）
├── README.md         # プロジェクト概要
├── docs/             # 仕様・開発ドキュメント
├── entrypoints/      # 拡張機能のエントリポイント群
│   ├── popup/        # ポップアップUI（React）
│   ├── zenn.content/ # Zenn本体へのContentScript
│   ├── modules/      # 共通ロジック・設定管理
│   │   └── ExtensionEnabledSetting.ts # 拡張機能ON/OFF状態管理
│   └── components/   # UI部品
├── public/           # 公開用静的ファイル
├── package.json      # 依存・スクリプト管理
└── wxt.config.ts     # WXT拡張設定
```

---

## 📦 package.json scripts

| コマンド              | 内容                                 |
|----------------------|--------------------------------------|
| `bun run dev`        | 開発用ローカルサーバ起動（Chrome）   |
| `bun run dev:firefox`| 開発用ローカルサーバ起動（Firefox）   |
| `bun run build`      | 本番ビルド（Chrome）                  |
| `bun run build:firefox`| 本番ビルド（Firefox）               |
| `bun run zip`        | 拡張機能zip化（Chromeストア提出用）   |
| `bun run zip:firefox`| 拡張機能zip化（Firefox提出用）        |
| `bun run compile`    | TypeScript型チェックのみ              |
| `bun run postinstall`| WXTのセットアップ                     |

- すべてのスクリプトは`bun run <script名>`で実行できます

## 💡 補足
- 依存パッケージやバージョンは`bun pm ls`や`package.json`を参照
- 詳細な仕様や設計は`docs/dark_mode_spec.md`も参照
- `ExtensionEnabledSetting.ts`で拡張機能自体のON/OFF状態を管理できます。OFF時はZennページで一切の操作を行いません。ON/OFF切り替えはポップアップUIから可能で、全タブに即時反映されます。
