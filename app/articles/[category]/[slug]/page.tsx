/* Hallmark · component: ArticlePage · genre: guitar-editorial · design-system: globals.css
 * 記事詳細。h2にアクセントバー、proseクラスでglobals.cssのスタイルを適用。
 */
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticle, getAllSlugs, CATEGORY_LABELS, type Category } from '@/lib/articles'

type Props = {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs()
}

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params
  const article = await getArticle(category, slug)
  if (!article) return {}
  return { title: `${article.title} | ギターマニア` }
}

export default async function ArticlePage({ params }: Props) {
  const { category, slug } = await params
  const article = await getArticle(category, slug)
  if (!article) notFound()

  const catLabel = CATEGORY_LABELS[article.category as Category] ?? article.category

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <header className="border-b" style={{ borderColor: 'var(--color-rule)' }}>
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-2 text-xs" style={{ color: 'var(--color-ink-2)' }}>
          <Link href="/" className="hover:underline" style={{ textDecorationColor: 'var(--color-accent)', textUnderlineOffset: '2px' }}>
            ギターマニア
          </Link>
          <span>/</span>
          <span>{catLabel}</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-xs px-2 py-0.5 rounded font-medium"
              style={{ background: 'var(--color-card)', color: 'var(--color-ink-2)', border: '1px solid var(--color-rule)' }}
            >
              {catLabel}
            </span>
          </div>
          <h1 className="text-2xl font-bold leading-snug" style={{ color: 'var(--color-ink)' }}>
            {article.title}
          </h1>
          <div className="h-0.5 w-12 mt-4" style={{ background: 'var(--color-accent)' }} />
        </div>

        <article
          className="prose text-sm"
          style={{ color: 'var(--color-ink)' }}
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        <div className="mt-14 pt-6 border-t" style={{ borderColor: 'var(--color-rule)' }}>
          <Link
            href="/"
            className="text-xs hover:underline"
            style={{ color: 'var(--color-ink-2)', textDecorationColor: 'var(--color-accent)', textUnderlineOffset: '2px' }}
          >
            ← 記事一覧に戻る
          </Link>
        </div>
      </main>
    </div>
  )
}
