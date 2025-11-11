// 認証ライブラリ - JWT & パスワード検証

import { Context, Next } from 'hono'
import { getCookie } from 'hono/cookie'
import type { Bindings } from '../types/bindings'

// シンプルなハッシュ関数（本番環境ではより強力なアルゴリズムを使用すべき）
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// パスワード検証
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const hash = await hashPassword(password)
  return hash === storedHash
}

// JWTトークン生成（シンプル版 - 本番では jose ライブラリ推奨）
export async function generateToken(userId: string, secret: string): Promise<string> {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({
    sub: userId,
    role: 'admin',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24時間
  }))

  const data = `${header}.${payload}`
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
  const signatureArray = Array.from(new Uint8Array(signature))
  const signatureBase64 = btoa(String.fromCharCode(...signatureArray))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

  return `${data}.${signatureBase64}`
}

// JWTトークン検証
export async function verifyToken(token: string, secret: string): Promise<{ sub: string, role: string, exp: number } | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const [header, payload, signature] = parts
    const data = `${header}.${payload}`

    // 署名検証
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )

    const signatureBytes = Uint8Array.from(
      atob(signature.replace(/-/g, '+').replace(/_/g, '/')),
      c => c.charCodeAt(0)
    )

    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes,
      encoder.encode(data)
    )

    if (!valid) return null

    // ペイロード解析
    const payloadData = JSON.parse(atob(payload))

    // 有効期限チェック
    if (payloadData.exp < Math.floor(Date.now() / 1000)) {
      return null
    }

    return payloadData
  } catch (e) {
    return null
  }
}

// 認証ミドルウェア
export async function adminAuth(c: Context<{ Bindings: Bindings }>, next: Next) {
  const token = getCookie(c, 'admin_token')

  if (!token) {
    return c.redirect('/admin/login')
  }

  const payload = await verifyToken(token, c.env.JWT_SECRET)

  if (!payload || payload.role !== 'admin') {
    return c.redirect('/admin/login')
  }

  // ユーザー情報をコンテキストに保存
  c.set('adminUser', payload)

  await next()
}

// パスワード検証用のヘルパー関数
// 環境変数から認証情報を取得して使用します
// セットアップ方法は ADMIN_SETUP.md を参照してください
