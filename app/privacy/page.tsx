import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | Guitar Mania',
}

export default function PrivacyPage() {
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
        <h1 className="text-xl font-bold mb-8" style={{ color: 'var(--color-ink)' }}>プライバシーポリシー</h1>

        <h2>Amazonアソシエイトについて</h2>
        <p>
          当サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
        </p>
        <p>
          記事内のAmazonへのリンクを経由して商品を購入された場合、当サイトに紹介料が支払われることがあります。購入者様への価格変動は一切ありません。
        </p>

        <h2>アクセス解析について</h2>
        <p>
          当サイトでは、Google Analyticsを使用してアクセス状況を把握しています。Google AnalyticsはCookieを使用して匿名のデータを収集します。詳細はGoogleのプライバシーポリシーをご確認ください。
        </p>

        <h2>免責事項</h2>
        <p>
          当サイトに掲載している情報については、可能な限り正確な情報を掲載するよう努めています。ただし、掲載内容の正確性・最新性を保証するものではありません。当サイトの情報をもとに行動した結果について、当サイトは責任を負いかねます。
        </p>
        <p>
          商品の価格・仕様・在庫状況は変動することがあります。購入前に各販売サイトにて最新情報をご確認ください。
        </p>

        <h2>お問い合わせ</h2>
        <p>
          当サイトへのお問い合わせは <Link href="/contact">お問い合わせページ</Link> よりご連絡ください。
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
