/* Hallmark · component: HomePage · genre: white-magenta · design-system: globals.css
 * 白背景×マゼンタ。黒ヘッダーでブランド感を維持しつつ本文は白で可読性確保。
 */
import Link from 'next/link'
import { getAllArticles, CATEGORY_LABELS, CATEGORY_TAGS, type Category } from '@/lib/articles'

export default function Home() {
  const articles = getAllArticles()
  const byCategory = Object.entries(CATEGORY_LABELS) as [Category, string][]

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <header style={{ background: 'var(--color-header)' }}>
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black uppercase tracking-wider" style={{ color: '#f0f0f6' }}>
              GUITAR<span style={{ color: 'var(--color-accent)' }}>·</span>MANIA
            </h1>
            <p className="text-xs mt-0.5 uppercase tracking-widest" style={{ color: '#555560' }}>
              エフェクター · 音作り · 初心者向けギター情報
            </p>
          </div>
          <nav className="hidden sm:flex gap-6">
            {(['efect', 'otodukuri', 'syosinsya'] as Category[]).map(cat => (
              <span key={cat} className="text-xs uppercase tracking-wider" style={{ color: '#555560' }}>
                {cat === 'efect' ? 'Review' : cat === 'otodukuri' ? 'Technique' : 'Beginner'}
              </span>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        {byCategory.map(([cat, label]) => {
          const catArticles = articles.filter(a => a.category === cat)
          if (catArticles.length === 0) return null
          const tag = CATEGORY_TAGS[cat]
          return (
            <section key={cat} className="mb-14">
              <div className="flex items-center gap-3 pb-4 mb-0" style={{ borderBottom: '2px solid var(--color-rule-strong)' }}>
                <div className="w-5 h-0.5" style={{ background: 'var(--color-accent)' }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-ink)' }}>
                  {label}
                </span>
                <span className="ml-auto text-xs font-mono" style={{ color: '#ccc' }}>
                  {catArticles.length} articles
                </span>
              </div>
              <ul>
                {catArticles.map((a, i) => (
                  <li key={a.slug} style={{ borderBottom: '1px solid var(--color-rule)' }}>
                    <Link href={`/articles/${a.category}/${a.urlSlug}`} className="group block py-4 grid grid-cols-[28px_1fr] gap-3">
                      <span className="text-xs font-mono pt-0.5" style={{ color: '#ccc' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="text-sm font-bold leading-snug group-hover:underline"
                          style={{ color: 'var(--color-ink)', textDecorationColor: 'var(--color-accent)', textUnderlineOffset: '3px' }}>
                          {a.title}
                        </p>
                        {a.excerpt && (
                          <p className="text-sm mt-1.5 leading-relaxed" style={{ color: 'var(--color-ink-2)' }}>
                            {a.excerpt}
                          </p>
                        )}
                        <span
                          className="inline-block mt-2 text-xs px-2 py-0.5 font-mono tracking-wider font-bold"
                          style={{ color: 'var(--color-accent)', background: 'var(--color-tag-bg)', border: '1px solid var(--color-tag-border)' }}
                        >
                          {tag}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
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
