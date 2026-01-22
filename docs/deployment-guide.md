# デプロイメントガイド

## 概要

この月の満ち欠けシミュレーターは、静的HTMLアプリケーションとして様々な方法でデプロイできます。

## デプロイ方法

### 1. GitHub Pages（推奨）

最も簡単なデプロイ方法です。

#### 手順

1. GitHubリポジトリの設定を開く
2. 「Settings」→「Pages」に移動
3. 「Source」で「Deploy from a branch」を選択
4. 「Branch」で `main` または `copilot/implement-moon-phases-visualization` を選択
5. フォルダーで `/src` を選択
6. 「Save」をクリック

数分後、以下のようなURLでアクセス可能になります：
```
https://tokawa-ms.github.io/moon-simulator/
```

#### 注意点
- リポジトリがpublicである必要があります
- デプロイには数分かかる場合があります

### 2. ローカル環境での実行

開発やテスト用に、ローカルマシンで実行できます。

#### 方法1: ブラウザで直接開く

```bash
# ファイルエクスプローラーから src/index.html をダブルクリック
# または、コマンドラインから
open src/index.html        # macOS
xdg-open src/index.html    # Linux
start src/index.html       # Windows
```

**注意**: セキュリティ制限により、一部の機能が動作しない場合があります。

#### 方法2: ローカルWebサーバーを使用（推奨）

**Python 3を使用**:
```bash
cd src
python3 -m http.server 8000
# ブラウザで http://localhost:8000 を開く
```

**Node.jsを使用**:
```bash
# http-serverをインストール
npm install -g http-server

# 起動
cd src
http-server -p 8000
# ブラウザで http://localhost:8000 を開く
```

**VS Code Live Serverを使用**:
1. VS Codeで「Live Server」拡張機能をインストール
2. `src/index.html` を開く
3. 右クリック→「Open with Live Server」を選択

### 3. Netlify

無料で簡単にデプロイできるサービスです。

#### 手順

1. [Netlify](https://www.netlify.com/)にアクセス
2. GitHubアカウントでログイン
3. 「New site from Git」をクリック
4. リポジトリを選択
5. 設定:
   - Build command: （空欄）
   - Publish directory: `src`
6. 「Deploy site」をクリック

自動的にURLが生成されます（例: `https://moon-simulator-xyz.netlify.app`）

### 4. Vercel

もう一つの優れたホスティングサービスです。

#### 手順

1. [Vercel](https://vercel.com/)にアクセス
2. GitHubアカウントでログイン
3. 「New Project」をクリック
4. リポジトリをインポート
5. 設定:
   - Framework Preset: Other
   - Root Directory: `src`
6. 「Deploy」をクリック

### 5. その他のホスティングサービス

以下のサービスも利用可能です：

- **Firebase Hosting**: Googleのホスティングサービス
- **Surge.sh**: コマンドライン一発デプロイ
- **Cloudflare Pages**: 高速CDN付き
- **GitLab Pages**: GitLabを使用している場合

## カスタムドメインの設定

### GitHub Pagesの場合

1. GitHub Pages設定で「Custom domain」を入力
2. DNSプロバイダーでCNAMEレコードを設定:
   ```
   www.your-domain.com → tokawa-ms.github.io
   ```
3. 「Enforce HTTPS」を有効化

### Netlify/Vercelの場合

1. サイト設定でドメインを追加
2. 表示されるDNS設定をドメインプロバイダーに追加
3. SSL証明書が自動的に発行されます

## オフラインデプロイ

インターネット接続がない環境で使用する場合：

### 1. ライブラリのローカル化

```bash
# Three.jsをダウンロード
cd src
mkdir lib
cd lib
wget https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js

# Tailwind CSSをダウンロード（Standalone CLI版）
wget https://github.com/tailwindlabs/tailwindcss/releases/download/v3.4.0/tailwindcss-linux-x64 -O tailwindcss
chmod +x tailwindcss
```

### 2. HTMLの修正

`src/index.html` を編集:

```html
<!-- 変更前 -->
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

<!-- 変更後 -->
<link rel="stylesheet" href="css/tailwind.css">
<script src="lib/three.min.js"></script>
```

### 3. Tailwind CSSのビルド

```bash
cd src
./lib/tailwindcss -i css/styles.css -o css/tailwind.css
```

## 環境別の推奨デプロイ方法

| 用途 | 推奨方法 | 理由 |
|------|---------|------|
| 本番公開 | GitHub Pages | 無料、簡単、Git連携 |
| 開発・テスト | ローカルWebサーバー | 即座に確認可能 |
| プレゼン | Netlify/Vercel | カスタムURL、高速 |
| オフライン | ローカル化版 | ネット不要 |
| 学校内限定 | イントラネットサーバー | アクセス制御可能 |

## トラブルシューティング

### Three.jsが読み込まれない

**症状**: コンソールに「THREE is not defined」エラー

**解決策**:
1. インターネット接続を確認
2. ブラウザのキャッシュをクリア
3. 別のCDNを試す（unpkg.com等）
4. ローカルにライブラリをダウンロード

### Tailwind CSSが適用されない

**症状**: スタイルが崩れている

**解決策**:
1. インターネット接続を確認
2. ブラウザのDevToolsでネットワークエラーを確認
3. ローカルビルド版を使用

### CORS エラー

**症状**: 「CORS policy」エラー

**解決策**:
1. ローカルWebサーバーを使用（file://プロトコルを避ける）
2. ブラウザの設定でCORSを許可（開発時のみ）

### 3D表示されない

**症状**: キャンバスが黒いまま

**解決策**:
1. WebGLサポートを確認: https://get.webgl.org/
2. GPUドライバーを更新
3. ブラウザを最新版に更新
4. ハードウェアアクセラレーションを有効化

## パフォーマンス最適化

### 本番環境向け最適化

1. **ファイル圧縮**:
   ```bash
   # JSファイルの圧縮
   terser src/js/script.js -o src/js/script.min.js
   
   # HTMLで参照を変更
   <script src="js/script.min.js"></script>
   ```

2. **CDNの使用**:
   - Three.jsを最速のCDNから読み込む
   - gzip圧縮を有効化

3. **キャッシュ設定**:
   - 静的ファイルに長いキャッシュ期間を設定
   - Service Workerの導入（オフライン対応）

## セキュリティ

### HTTPS化

すべてのデプロイ方法で、HTTPSを使用することを推奨します：
- GitHub Pages: 自動的にHTTPS
- Netlify/Vercel: 自動的にHTTPS
- カスタムサーバー: Let's Encryptで無料SSL証明書

### CSP（Content Security Policy）

より厳格なセキュリティが必要な場合、CSPヘッダーを設定：

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdnjs.cloudflare.com; 
               style-src 'self' 'unsafe-inline';">
```

## モニタリング

### アクセス解析

Google Analytics等を追加する場合：

```html
<!-- head内に追加 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## まとめ

このアプリケーションは静的HTMLのため、様々な環境で簡単にデプロイできます。
教育現場での使用には、GitHub Pagesまたはイントラネットサーバーでのデプロイを推奨します。

---

**更新日**: 2026年1月22日
**対象バージョン**: 1.0.0
