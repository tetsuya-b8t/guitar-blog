import Link from 'next/link'
import { getAllArticles, CATEGORY_LABELS, type Category } from '@/lib/articles'

export default function Home() {
  const articles = getAllArticles()
  const byCategory = Object.entries(CATEGORY_LABELS) as [Category, string][]

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">ギターマニア</h1>
        <p className="mt-2 text-gray-500 text-sm">エフェクター・音作り・初心者向けギター情報</p>
      </header>

      {byCategory.map(([cat, label]) => {
        const catArticles = articles.filter(a => a.category === cat)
        if (catArticles.length === 0) return null
        return (
          <section key={cat} className="mb-10">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
              {label}
            </h2>
            <ul className="space-y-2">
              {catArticles.map(a => (
                <li key={a.slug}>
                  <Link
                    href={`/articles/${a.category}/${a.slug}`}
                    className="text-blue-700 hover:underline text-sm"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </main>
  )
}
