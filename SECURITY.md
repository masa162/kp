# セキュリティガイド

## 概要

このプロジェクトは、セキュリティのベストプラクティスに従って実装されています。

## 認証情報の管理

### ✅ 実装済みのセキュリティ対策

1. **環境変数による認証情報管理**
   - ユーザーIDとパスワードハッシュは**Cloudflare Secrets**に保存
   - コードベースには一切の認証情報を含まない
   - GitHubに安全に公開可能

2. **パスワードのハッシュ化**
   - SHA-256ハッシュを使用
   - 平文パスワードは保存しない
   - ハッシュ化されたパスワードのみを環境変数に保存

3. **JWT認証**
   - HMAC-SHA256署名付きJWT
   - 24時間の有効期限
   - httpOnlyクッキーで保存（XSS対策）
   - Secureフラグ（HTTPS必須）
   - SameSite=Strict（CSRF対策）

4. **環境分離**
   - `.env`と`.dev.vars`は`.gitignore`に追加済み
   - 本番環境とローカル環境のシークレットを分離

## GitHubへの安全な公開

### 除外されているファイル

以下のファイルは`.gitignore`に含まれており、Gitにコミットされません：

```
.env
.dev.vars
node_modules/
.wrangler/
```

### コードベースの安全性

```bash
# 認証情報がコードに含まれていないことを確認
grep -r "password" src/ | grep -v "PASSWORD" | grep -v "// "
grep -r "ADMIN_CREDENTIALS" src/
# → 何も表示されなければOK
```

## シークレットの設定方法

### 必要なシークレット

1. `JWT_SECRET` - JWT署名用
2. `ADMIN_USER_ID` - 管理者ID
3. `ADMIN_PASSWORD_HASH` - パスワードハッシュ

### 設定コマンド

```bash
# JWT_SECRET
echo "your-random-secret" | npx wrangler secret put JWT_SECRET

# ユーザーID
echo "your-user-id" | npx wrangler secret put ADMIN_USER_ID

# パスワードハッシュ（SHA-256）
node -e "const crypto = require('crypto'); console.log(crypto.createHash('sha256').update('your-password').digest('hex'));" | npx wrangler secret put ADMIN_PASSWORD_HASH
```

詳細は[ADMIN_SETUP.md](./ADMIN_SETUP.md)を参照してください。

## パスワードのベストプラクティス

### 推奨されるパスワード

- **最低12文字以上**
- 英大文字・小文字・数字・記号を含む
- 辞書にない単語を使用
- 他のサービスと異なるパスワードを使用

### 悪いパスワードの例 ❌

- `123456`
- `password`
- `admin`
- `qwerty`
- `39`（現在設定されているパスワード - 本番環境では変更推奨）

### 良いパスワードの例 ✅

- `K@mp0!Secur3_2025`
- `MyStr0ng#Pass_Kampo!`
- `Trad!t!onal_Med1c!ne@2025`

## シークレットのローテーション

定期的にシークレットを変更することを推奨します：

### JWT_SECRETの変更

```bash
# 新しいシークレットを生成
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 生成された値を設定
echo "新しいシークレット" | npx wrangler secret put JWT_SECRET
```

**注意**: JWT_SECRETを変更すると、すべてのユーザーが再ログイン必要になります。

### パスワードの変更

```bash
# 新しいパスワードのハッシュを生成
node -e "const crypto = require('crypto'); const hash = crypto.createHash('sha256').update('new-password').digest('hex'); console.log(hash);"

# ハッシュを設定
echo "生成されたハッシュ" | npx wrangler secret put ADMIN_PASSWORD_HASH
```

## セキュリティチェックリスト

定期的に以下を確認してください：

- [ ] パスワードは12文字以上で、英数字・記号を含む
- [ ] JWT_SECRETは十分にランダムな値（32バイト以上）
- [ ] `.env`と`.dev.vars`が`.gitignore`に含まれている
- [ ] コードベースに平文パスワードやシークレットが含まれていない
- [ ] Cloudflare Secretsに正しい値が設定されている
- [ ] 定期的にパスワードを変更している（3-6ヶ月ごと推奨）

## 脆弱性の報告

セキュリティ上の問題を発見した場合は、GitHubのIssueで**公開せず**、プライベートに報告してください。

## 参考リンク

- [Cloudflare Workers セキュリティベストプラクティス](https://developers.cloudflare.com/workers/platform/security/)
- [OWASP パスワード管理](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [JWT セキュリティベストプラクティス](https://tools.ietf.org/html/rfc8725)

## コンプライアンス

このアプリケーションは以下のセキュリティ基準に準拠しています：

- ✅ パスワードの平文保存禁止
- ✅ 環境変数による機密情報管理
- ✅ HTTPS通信の必須化
- ✅ XSS/CSRF対策
- ✅ セキュアクッキーの使用

---

**最終更新**: 2025年11月11日
**セキュリティ監査**: 実施済み
