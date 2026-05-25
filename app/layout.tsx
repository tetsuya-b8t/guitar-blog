import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Guitar Mania',
  description: 'エフェクター・音作り・初心者向けギター情報',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
