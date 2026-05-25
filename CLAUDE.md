@AGENTS.md

# guitar-blog 開発コンテキスト

## 役割
ギターアフィリエイトブログ。2011年に運営していたfc2サイトの記事資産を移植した。

## 技術スタック
- Next.js（App Router）+ TypeScript + Tailwind CSS
- Markdown記事（content/articles/カテゴリ/スラッグ.md）
- gray-matter + remark でHTMLに変換

## ディレクトリ構成
```
content/articles/
  efect/        エフェクターレビュー（16本）
  otodukuri/    音作り・理論（10本）
  syosinsya/    初心者講座（14本）
  guitarist/    ギタリスト機材（4本）
  osusume/      おすすめCD（2本）
lib/articles.ts  記事読み込み関数
app/page.tsx     トップ（カテゴリ別一覧）
app/articles/[category]/[slug]/page.tsx  記事詳細
```

## 記事を書くとき
必ず `/Users/ooyagitetsuya/Desktop/life-production/wiki/04_戦略前提/文体ガイド.md` を参照すること。
Frontmatter形式：
```
---
title: "記事タイトル"
category: "efect"
slug: "記事-スラッグ"
date: "2011-01-01"
---
```

## 収益化（未実装・次フェーズ）
- Amazon Associates：エフェクターレビュー記事の商品リンク
- サウンドハウス：機材・初心者講座記事
- イシバシ楽器：ギタリスト機材記事
