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
    <main className="max-w-2xl mx-auto px-4 py-10">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:underline">トップ</Link>
        <span className="mx-2">/</span>
        <span>{catLabel}</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-6 leading-snug">
        {article.title}
      </h1>

      <article
        className="prose prose-sm max-w-none text-gray-800 leading-7"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      <div className="mt-12 pt-6 border-t border-gray-200">
        <Link href="/" className="text-blue-700 hover:underline text-sm">
          ← 記事一覧に戻る
        </Link>
      </div>
    </main>
  )
}
