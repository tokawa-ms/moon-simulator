# 🌙 月の満ち欠けシミュレーター

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat&logo=three.js&logoColor=white)](https://threejs.org/)

> **小学校理科教材** - 太陽・地球・月の位置関係と月の満ち欠けを学ぶ3D可視化アプリケーション

## 📋 概要

このアプリケーションは、太陽・地球・月の位置関係と月の満ち欠けの仕組みを視覚的に学習できる教育ツールです。Three.jsを使用した3D表現により、宇宙空間での天体の配置や、異なる視点からの月の見え方を直感的に理解できます。

![月の満ち欠けシミュレーター UI](https://github.com/user-attachments/assets/a5ca0295-1e10-41b3-96b0-3e4b38ebcb69)

### ✨ 主な機能

- 🌌 **3D空間ビュー** - 太陽・地球・月の位置関係を宇宙から観察
- 🌍 **地球視点** - 地球から見た月の満ち欠け
- 🌕 **月視点** - 月から見た地球の見え方
- 🗾 **日本視点** - 日本から観測した月の形と名称（新月、三日月、満月など）
- ⏱️ **タイムコントロール** - 月の公転（0-29.5日）と地球の自転（0-24時間）をスライダーで操作
- ▶️ **自動アニメーション** - 月の公転を自動的に再生
- 🖱️ **インタラクティブ操作** - マウスで視点を自由に変更（ドラッグで回転、ホイールでズーム）

## 🛠️ 技術スタック

### フロントエンド

| 技術 | バージョン | 用途 |
| ---- | ---------- | ---- |
| HTML5 | Latest | セマンティックなマークアップ |
| CSS3 | Latest | スタイリング |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x (CDN) | レスポンシブデザイン |
| JavaScript | ES6+ | アプリケーションロジック |
| [Three.js](https://threejs.org/) | r128 (CDN) | 3D可視化 |

### 開発ツール

- **GitHub Copilot** - AI ペアプログラミング
- **GitHub Coding Agent** - 自動コード生成
- **Visual Studio Code** - 推奨 IDE

## 📁 プロジェクト構造

```
📦 moon-simulator/
├── 📄 README.md                    # プロジェクト概要
├── 📄 LICENSE                      # MITライセンス
├── 📄 .gitignore                   # Git除外設定
├── 📁 .github/
│   └── 📄 copilot-instructions.md  # Copilot設定
├── 📁 src/                         # アプリケーションソース
│   ├── 📄 index.html               # メインHTML
│   ├── 📁 css/                     # スタイルシート
│   │   └── 📄 styles.css           # カスタムCSS
│   ├── 📁 js/                      # JavaScript
│   │   └── 📄 script.js            # メインスクリプト
│   └── 📁 assets/                  # 静的リソース
│       └── 📁 images/              # 画像ファイル
└── 📁 docs/                        # ドキュメント
    ├── 📄 README.md                # プロジェクト詳細
    ├── 📄 specification.md         # 技術仕様書
    ├── 📄 user-guide.md            # 使い方ガイド
    ├── 📄 implementation-notes.md  # 実装ノート
    └── 📄 deployment-guide.md      # デプロイメントガイド
```

## 🚀 クイックスタート

### 前提条件

- 📌 モダンな Web ブラウザ (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- 📌 WebGL対応（必須）
- 📌 インターネット接続（CDNからライブラリを読み込むため）

### 起動方法

#### 方法1: ファイルを直接開く（最も簡単）

```bash
# リポジトリをクローン
git clone https://github.com/tokawa-ms/moon-simulator.git
cd moon-simulator

# ブラウザで開く
open src/index.html        # macOS
xdg-open src/index.html    # Linux
start src/index.html       # Windows
```

#### 方法2: ローカルWebサーバーを使用（推奨）

```bash
# Python 3を使用
cd src
python3 -m http.server 8000
# ブラウザで http://localhost:8000 を開く

# またはNode.jsを使用
npx http-server src -p 8000
# ブラウザで http://localhost:8000 を開く
```

### 基本的な使い方

1. **メインビュー**（左側/上部）でマウスドラッグして視点を変更
2. **月の公転スライダー**で0〜29.5日の範囲で月の位置を調整
3. **地球の自転スライダー**で0〜24時の範囲で時刻を調整
4. **再生ボタン**で自動アニメーション開始
5. 各サブビューで異なる視点からの月の見え方を確認

詳しくは [使い方ガイド](docs/user-guide.md) をご覧ください。

## 📚 ドキュメント

- [📖 プロジェクト詳細README](docs/README.md) - 機能の詳細説明
- [📋 技術仕様書](docs/specification.md) - 技術仕様と実装詳細
- [👨‍🏫 使い方ガイド](docs/user-guide.md) - ユーザー向け操作説明
- [📝 実装ノート](docs/implementation-notes.md) - 実装の詳細記録
- [🚀 デプロイメントガイド](docs/deployment-guide.md) - 各種環境へのデプロイ方法

## 🎓 教育的価値

このシミュレーターは以下の学習目標をサポートします：

1. ✅ **天体の動き** - 月の公転、地球の自転の理解
2. ✅ **月の満ち欠けの原理** - 太陽光の反射による見え方の変化
3. ✅ **空間認識** - 3次元空間での天体配置の把握
4. ✅ **視点の転換** - 異なる視点からの観測体験
5. ✅ **周期性** - 自然現象の周期的な変化の理解

**対象学年**: 小学校高学年（理科）
**学習所要時間**: 15〜30分

## 🔍 主な機能詳細

### メインビュー（3D空間表示）

- 太陽・地球・月の3Dモデル表示
- マウスドラッグで視点回転
- マウスホイールでズーム
- 軌道線の表示

### サブビュー

1. **地球から見た月**: 地球上の観測者視点での月の満ち欠け
2. **月から見た地球**: 月面から見た地球の見え方
3. **日本から見た月**: 日本の観測者が見る月の詳細な形と名称

### タイムコントロール

- **月の公転**: 0〜29.5日（朔望月）
- **地球の自転**: 0〜24時間
- **自動再生**: 月の公転を自動アニメーション
- **リセット**: 初期状態に戻す

## 💡 使用例とサンプルプロンプト

### 基本的なアプリケーション作成

```
「ToDoリストアプリを作成してください。追加、削除、完了マークの機能を含めてください。」
```

### インタラクティブな機能追加

```
「現在の天気情報を表示するウィジェットを追加してください。API キーは設定画面で入力できるようにしてください。」
```

### UI/UX の改善

```
「Tailwind CSS を使用してダークモード対応のモダンなデザインに変更してください。」
```

## 📱 レスポンシブデザイン対応

このシミュレーターは以下の画面サイズに最適化されています：

- 📱 **モバイル**: 320px〜768px - 縦並びレイアウト
- 📊 **タブレット**: 768px〜1024px - 最適化されたレイアウト
- 💻 **デスクトップ**: 1024px 以上 - 横並びレイアウト

## 🌐 ブラウザ対応

| ブラウザ | バージョン | 対応状況 |
|---------|----------|---------|
| Chrome | 90+ | ✅ 完全対応 |
| Firefox | 88+ | ✅ 完全対応 |
| Safari | 14+ | ✅ 完全対応 |
| Edge | 90+ | ✅ 完全対応 |

**必須要件**: WebGL対応

## 🚀 デプロイ

### GitHub Pages（推奨）

1. リポジトリ設定で「Pages」を開く
2. ソースブランチとフォルダ（`/src`）を選択
3. 保存すると自動的にデプロイ

詳しくは [デプロイメントガイド](docs/deployment-guide.md) をご覧ください。

### その他のオプション

- Netlify
- Vercel  
- Firebase Hosting
- ローカルWebサーバー

## 🔍 デバッグ機能

開発者ツール（F12キー）でコンソールを開くと、詳細なログ情報が表示されます：

- 初期化プロセスの進行状況
- 天体オブジェクトの位置情報
- ユーザー操作のイベント
- エラー情報

## 🚧 今後の拡張可能性

- [ ] テクスチャマッピング（実際の天体画像の適用）
- [ ] 日食・月食シミュレーション
- [ ] 複数の観測地点対応
- [ ] 惑星の追加（太陽系全体のシミュレーション）
- [ ] VR対応
- [ ] 時刻による星座の表示

## 🔒 セキュリティとベストプラクティス

### 技術的ベストプラクティス

- ✅ セマンティックHTML5による構造化
- ✅ ES6+準拠のJavaScript
- ✅ レスポンシブデザイン
- ✅ 適切なエラーハンドリング
- ✅ 詳細なコンソールログ

### コード品質

- 📋 明確な関数分割とモジュール構造
- 📝 日本語による詳細なコメント
- 🧪 適切なエラーハンドリングの実装

## 🤝 コントリビューション

プロジェクトへの貢献を歓迎します！

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Request を作成

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

## 🆘 サポートとリソース

- 📖 **Three.js ドキュメント**: [https://threejs.org/docs/](https://threejs.org/docs/)
- 📖 **Tailwind CSS ドキュメント**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- 💬 **GitHub Discussions**: [Discussions](https://github.com/tokawa-ms/moon-simulator/discussions)
- 🐛 **Issue 報告**: [Issues](https://github.com/tokawa-ms/moon-simulator/issues)

## 📊 プロジェクト統計

![GitHub stars](https://img.shields.io/github/stars/tokawa-ms/moon-simulator?style=social)
![GitHub forks](https://img.shields.io/github/forks/tokawa-ms/moon-simulator?style=social)
![GitHub issues](https://img.shields.io/github/issues/tokawa-ms/moon-simulator)

---

<div align="center">
  <strong>🌙 月の満ち欠けを楽しく学ぼう！ ✨</strong><br>
  Made with ❤️ and GitHub Copilot
</div>
