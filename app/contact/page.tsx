import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'お問い合わせ | Guitar Mania',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <header style={{ background: 'var(--color-header)' }}>
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-xl font-black uppercase tracking-wider" style={{ color: '#f0f0f6' }}>
              GUITAR<span style={{ color: 'var(--color-accent)' }}>·</span>MANIA
            </h1>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 prose">
        <h1 className="text-xl font-bold mb-8" style={{ color: 'var(--color-ink)' }}>お問い合わせ</h1>
        <p>
          当サイトへのお問い合わせは、下記フォームよりご連絡ください。記事の誤り、掲載情報に関するご意見・ご要望などお気軽にどうぞ。
        </p>
        <p>
          <a
            href="https://forms.gle/placeholder"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-accent)' }}
          >
            お問い合わせフォーム（Google Forms）
          </a>
        </p>
        <p className="text-sm" style={{ color: 'var(--color-ink-2)' }}>
          ※ 返信にお時間をいただく場合があります。
        </p>
      </main>

      <footer style={{ background: 'var(--color-header)', borderTop: '3px solid var(--color-accent)' }}>
        <div className="max-w-3xl mx-auto px-6 py-5 flex gap-6 items-center">
          <p className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: '#f0f0f6' }}>
            Guitar<span style={{ color: 'var(--color-accent)' }}>·</span>Mania
          </p>
          <Link href="/privacy" className="text-xs" style={{ color: '#555560' }}>プライバシーポリシー</Link>
          <Link href="/contact" className="text-xs" style={{ color: '#555560' }}>お問い合わせ</Link>
        </div>
      </footer>
    </div>
  )
}
