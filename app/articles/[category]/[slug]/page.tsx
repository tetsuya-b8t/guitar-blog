/* Hallmark · component: ArticlePage · genre: white-magenta · design-system: globals.css
 * 白背景で読みやすさ確保。黒ヘッダーはトップと統一。
 */
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticle, getAllSlugs, CATEGORY_LABELS, CATEGORY_TAGS, type Category } from '@/lib/articles'

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
  return { title: `${article.title} | Guitar Mania` }
}

export default async function ArticlePage({ params }: Props) {
  const { category, slug } = await params
  const article = await getArticle(category, slug)
  if (!article) notFound()

  const catLabel = CATEGORY_LABELS[article.category as Category] ?? article.category
  const tag = CATEGORY_TAGS[article.category as Category]

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <header style={{ background: 'var(--color-header)' }}>
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-2 text-xs font-mono uppercase tracking-wider" style={{ color: '#555560' }}>
          <Link href="/" className="hover:text-white" style={{ transitionProperty: 'color', transitionDuration: '120ms' }}>
            Guitar<span style={{ color: 'var(--color-accent)' }}>·</span>Mania
          </Link>
          <span>/</span>
          <span>{catLabel}</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-10">
          <span
            className="inline-block mb-4 text-xs px-2 py-0.5 font-mono tracking-wider font-bold"
            style={{ color: 'var(--color-accent)', background: 'var(--color-tag-bg)', border: '1px solid var(--color-tag-border)' }}
          >
            {tag}
          </span>
          <h1 className="text-2xl font-bold leading-snug" style={{ color: 'var(--color-ink)' }}>
            {article.title}
          </h1>
          <div className="mt-5 w-10 h-0.5" style={{ background: 'var(--color-accent)' }} />
        </div>

        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        <div className="mt-16 pt-6" style={{ borderTop: '1px solid var(--color-rule)' }}>
          <Link
            href="/"
            className="text-xs font-mono uppercase tracking-wider"
            style={{ color: 'var(--color-ink-2)', transitionProperty: 'color', transitionDuration: '120ms' }}
          >
            ← 記事一覧
          </Link>
        </div>
      </main>

      <footer style={{ background: 'var(--color-header)', borderTop: '3px solid var(--color-accent)' }}>
        <div className="max-w-3xl mx-auto px-6 py-5">
          <p className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: '#f0f0f6' }}>
            Guitar<span style={{ color: 'var(--color-accent)' }}>·</span>Mania
          </p>
        </div>
      </footer>
    </div>
  )
}
