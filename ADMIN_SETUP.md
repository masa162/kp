# 管理画面セットアップガイド

## 概要

管理画面の認証情報は、セキュリティのため**Cloudflare Secrets**（環境変数）に保存されています。
コードベースには認証情報は含まれていないため、GitHubに安全に公開できます。

## 必要なシークレット

以下の3つのシークレットを設定する必要があります：

1. `JWT_SECRET` - JWT署名用のシークレットキー
2. `ADMIN_USER_ID` - 管理者のユーザーID
3. `ADMIN_PASSWORD_HASH` - 管理者パスワードのSHA-256ハッシュ

## セットアップ手順

### 1. JWT_SECRETの設定

ランダムな32バイトの文字列を生成して設定します。

**方法1: 自動生成**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))" | npx wrangler secret put JWT_SECRET
```

**方法2: 手動設定**（推奨値）
```bash
echo "6581bf987a4f178a31a7cb98534d66a244564502d8abecae1f3e9b1f4c294cb9" | npx wrangler secret put JWT_SECRET
```

### 2. 管理者ユーザーIDの設定

任意のユーザーIDを設定します（例: `admin`, `yourname`, など）

```bash
echo "your-user-id" | npx wrangler secret put ADMIN_USER_ID
```

**現在の設定値**（例）:
```bash
echo "mn" | npx wrangler secret put ADMIN_USER_ID
```

### 3. 管理者パスワードハッシュの設定

#### ステップ1: パスワードのハッシュを生成

```bash
node -e "const crypto = require('crypto'); const password = 'your-password'; const hash = crypto.createHash('sha256').update(password).digest('hex'); console.log('パスワード:', password); console.log('ハッシュ:', hash);"
```

例（パスワード: `your-secure-password`）:
```bash
node -e "const crypto = require('crypto'); const hash = crypto.createHash('sha256').update('your-secure-password').digest('hex'); console.log(hash);"
```

#### ステップ2: ハッシュをシークレットに設定

```bash
echo "生成されたハッシュ値" | npx wrangler secret put ADMIN_PASSWORD_HASH
```

**現在の設定値**（パスワード: `39`）:
```bash
echo "0b918943df0962bc7a1824c0555a389347b4febdc7cf9d1254406d80ce44e3f9" | npx wrangler secret put ADMIN_PASSWORD_HASH
```

## 設定の確認

シークレットが正しく設定されているか確認：

```bash
npx wrangler secret list
```

以下の3つが表示されればOK:
- JWT_SECRET
- ADMIN_USER_ID
- ADMIN_PASSWORD_HASH

## デプロイ

シークレット設定後、アプリケーションをデプロイします：

```bash
npm run deploy
```

## アクセス方法

デプロイ後、以下のURLから管理画面にアクセスできます：

```
https://kampo.belong2jazz.workers.dev/admin/login
```

設定したユーザーIDとパスワードでログインしてください。

## パスワード変更方法

パスワードを変更する場合：

1. 新しいパスワードのハッシュを生成：
```bash
node -e "const crypto = require('crypto'); const hash = crypto.createHash('sha256').update('new-password').digest('hex'); console.log(hash);"
```

2. ハッシュをシークレットに再設定：
```bash
echo "新しいハッシュ値" | npx wrangler secret put ADMIN_PASSWORD_HASH
```

3. 再デプロイは不要（Secretsは即座に反映されます）

## セキュリティのベストプラクティス

### ✅ 推奨事項

1. **強力なパスワードを使用**
   - 最低12文字以上
   - 英数字と記号を含む
   - 辞書にない単語

2. **定期的なパスワード変更**
   - 3-6ヶ月ごとに変更することを推奨

3. **JWT_SECRETのローテーション**
   - 年1回程度の更新を推奨
   - 変更後は全ユーザーが再ログイン必要

4. **シークレットの管理**
   - シークレットの値を決してGitHubにコミットしない
   - `.env`ファイルは`.gitignore`に追加済み

### ❌ 避けるべき事項

1. コードにパスワードをハードコードしない
2. シークレットをメール・チャットで共有しない
3. 簡単なパスワード（`123456`, `password`など）を使用しない

## トラブルシューティング

### ログインできない

1. **シークレットが設定されているか確認**
```bash
npx wrangler secret list
```

2. **ユーザーIDとパスワードが正しいか確認**
   - パスワードは大文字小文字を区別します
   - スペースなどの余分な文字が含まれていないか確認

3. **パスワードハッシュが正しいか確認**
```bash
# 現在のパスワードでハッシュを再生成して確認
node -e "const crypto = require('crypto'); const hash = crypto.createHash('sha256').update('your-password').digest('hex'); console.log(hash);"
```

### シークレットの削除

シークレットを削除する場合（注意: ログインできなくなります）:
```bash
npx wrangler secret delete ADMIN_PASSWORD_HASH
```

## 実装済み機能

- ✅ JWT認証システム（環境変数ベース）
- ✅ ログインページ
- ✅ ダッシュボード（統計表示）
- ✅ 章の管理（追加・編集・削除）
- ✅ 音声ファイルアップロード
- ✅ ログアウト機能

## 開発者向け情報

### ローカル開発

ローカルで開発する場合、`.dev.vars`ファイルにシークレットを設定：

```bash
# .dev.vars（このファイルはGitに含めない）
JWT_SECRET=6581bf987a4f178a31a7cb98534d66a244564502d8abecae1f3e9b1f4c294cb9
ADMIN_USER_ID=mn
ADMIN_PASSWORD_HASH=0b918943df0962bc7a1824c0555a389347b4febdc7cf9d1254406d80ce44e3f9
```

**注意**: `.dev.vars`は`.gitignore`に追加されているため、Gitにはコミットされません。

### コードの確認

認証情報がハードコードされていないことを確認：

```bash
# コードベースに認証情報がないことを確認
grep -r "ADMIN_CREDENTIALS" src/
# → 何も表示されなければOK
```

---

**重要**: このドキュメント自体もGitHubに公開されますが、実際のシークレット値は含まれていません。
各環境で個別に設定する必要があります。
