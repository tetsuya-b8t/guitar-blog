/* Hallmark · component: HomePage · genre: guitar-editorial · design-system: globals.css
 * カテゴリ別記事一覧。アクセントバーで区切り、ホバーはborder-colorのみトランジション。
 */
import Link from 'next/link'
import { getAllArticles, CATEGORY_LABELS, type Category } from '@/lib/articles'

export default function Home() {
  const articles = getAllArticles()
  const byCategory = Object.entries(CATEGORY_LABELS) as [Category, string][]

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <header className="border-b" style={{ borderColor: 'var(--color-rule)' }}>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="h-0.5 w-8 mb-4" style={{ background: 'var(--color-accent)' }} />
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--color-ink)' }}>
            ギターマニア
          </h1>
          <p className="mt-1.5 text-sm" style={{ color: 'var(--color-ink-2)' }}>
            エフェクター・音作り・初心者向けギター情報
          </p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        {byCategory.map(([cat, label]) => {
          const catArticles = articles.filter(a => a.category === cat)
          if (catArticles.length === 0) return null
          return (
            <section key={cat} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-4 w-0.5" style={{ background: 'var(--color-accent)' }} />
                <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-ink-2)' }}>
                  {label}
                </h2>
              </div>
              <ul className="space-y-0">
                {catArticles.map((a, i) => (
                  <li key={a.slug}>
                    <Link
                      href={`/articles/${a.category}/${a.slug}`}
                      className="group flex items-baseline gap-3 py-3 border-b"
                      style={{
                        borderColor: 'var(--color-rule)',
                        transitionProperty: 'border-color',
                        transitionDuration: '150ms',
                      }}
                    >
                      <span
                        className="text-xs tabular-nums w-5 shrink-0"
                        style={{ color: 'var(--color-ink-2)' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="text-sm leading-relaxed group-hover:underline"
                        style={{
                          color: 'var(--color-ink)',
                          textDecorationColor: 'var(--color-accent)',
                          textUnderlineOffset: '3px',
                        }}
                      >
                        {a.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </main>

      <footer className="border-t mt-auto" style={{ borderColor: 'var(--color-rule)' }}>
        <div className="max-w-2xl mx-auto px-4 py-6">
          <p className="text-xs" style={{ color: 'var(--color-ink-2)' }}>ギターマニア</p>
        </div>
      </footer>
    </div>
  )
}
