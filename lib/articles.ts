import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const CONTENT_DIR = path.join(process.cwd(), 'content/articles')

export type Category = 'efect' | 'otodukuri' | 'syosinsya' | 'guitarist' | 'osusume'

export const CATEGORY_LABELS: Record<Category, string> = {
  efect: 'エフェクターレビュー',
  otodukuri: '音作り・理論',
  syosinsya: '初心者講座',
  guitarist: 'ギタリスト機材',
  osusume: 'おすすめCD',
}

export const CATEGORY_TAGS: Record<Category, string> = {
  efect: 'REVIEW',
  otodukuri: 'TECHNIQUE',
  syosinsya: 'BEGINNER',
  guitarist: 'GEAR',
  osusume: 'MUSIC',
}

export interface ArticleMeta {
  slug: string
  category: Category
  title: string
  date: string
  excerpt: string
}

export interface Article extends ArticleMeta {
  contentHtml: string
}

function extractExcerpt(content: string): string {
  const lines = content.split('\n').map(l => l.trim())
  for (const line of lines) {
    if (!line || line.startsWith('#') || line.startsWith('---')) continue
    const cleaned = line.replace(/[*_`[\]()]/g, '').trim()
    if (cleaned.length > 10) return cleaned.slice(0, 80) + (cleaned.length > 80 ? '…' : '')
  }
  return ''
}

export function getAllArticles(): ArticleMeta[] {
  const articles: ArticleMeta[] = []
  const cats = fs.readdirSync(CONTENT_DIR)

  for (const cat of cats) {
    const catDir = path.join(CONTENT_DIR, cat)
    if (!fs.statSync(catDir).isDirectory()) continue
    const files = fs.readdirSync(catDir).filter(f => f.endsWith('.md'))

    for (const file of files) {
      const filePath = path.join(catDir, file)
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(raw)
      articles.push({
        slug: data.slug as string,
        category: cat as Category,
        title: data.title as string,
        date: data.date as string,
        excerpt: extractExcerpt(content),
      })
    }
  }

  return articles.sort((a, b) => a.title.localeCompare(b.title, 'ja'))
}

export function getArticlesByCategory(category: Category): ArticleMeta[] {
  return getAllArticles().filter(a => a.category === category)
}

export async function getArticle(category: string, slug: string): Promise<Article | null> {
  const catDir = path.join(CONTENT_DIR, category)
  if (!fs.existsSync(catDir)) return null

  const files = fs.readdirSync(catDir)
  const file = files.find(f => {
    const raw = fs.readFileSync(path.join(catDir, f), 'utf-8')
    const { data } = matter(raw)
    return data.slug === slug
  })

  if (!file) return null

  const raw = fs.readFileSync(path.join(catDir, file), 'utf-8')
  const { data, content } = matter(raw)
  const processed = await remark().use(html).process(content)
  const contentHtml = processed.toString()

  return {
    slug: data.slug as string,
    category: data.category as Category,
    title: data.title as string,
    date: data.date as string,
    excerpt: extractExcerpt(content),
    contentHtml,
  }
}

export function getAllSlugs(): { category: string; slug: string }[] {
  const slugs: { category: string; slug: string }[] = []
  const cats = fs.readdirSync(CONTENT_DIR)

  for (const cat of cats) {
    const catDir = path.join(CONTENT_DIR, cat)
    if (!fs.statSync(catDir).isDirectory()) continue
    const files = fs.readdirSync(catDir).filter(f => f.endsWith('.md'))

    for (const file of files) {
      const raw = fs.readFileSync(path.join(catDir, file), 'utf-8')
      const { data } = matter(raw)
      slugs.push({ category: cat, slug: data.slug as string })
    }
  }

  return slugs
}
