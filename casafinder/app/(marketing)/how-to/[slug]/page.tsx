import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { articleStructuredData } from '@/lib/seo/structured-data'
import type { Article } from '@/lib/supabase/types'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('articles')
    .select('title, excerpt, cover_image_url')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  const typedData = data as Pick<Article, 'title' | 'excerpt' | 'cover_image_url'> | null

  if (!typedData) return {}

  return {
    title: `${typedData.title} | CasaFinder`,
    description: typedData.excerpt ?? undefined,
    openGraph: {
      title: typedData.title,
      description: typedData.excerpt ?? undefined,
      images: typedData.cover_image_url ? [typedData.cover_image_url] : [],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: articleRaw } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  const article = articleRaw as Article | null

  if (!article) notFound()

  const structuredData = articleStructuredData(article)

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      {article.cover_image_url && (
        <div className="w-full h-72 md:h-96 bg-gray-100 relative">
          <img
            src={article.cover_image_url}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex gap-2">
          <a href="/" className="hover:text-gray-700">Home</a>
          <span>›</span>
          <a href="/how-to" className="hover:text-gray-700">How-To Guides</a>
          <span>›</span>
          <span className="text-gray-900 line-clamp-1">{article.title}</span>
        </nav>

        {/* Meta */}
        {article.category && (
          <span className="text-xs font-semibold text-[#0F5AE5] uppercase tracking-wide">{article.category}</span>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">{article.title}</h1>

        <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-100">
          {article.published_at && (
            <span>{new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          )}
          {article.reading_time_min && <span>{article.reading_time_min} min read</span>}
        </div>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">{article.excerpt}</p>
        )}

        {/* Body */}
        {article.body_html ? (
          <div
            className="prose prose-lg prose-green max-w-none"
            dangerouslySetInnerHTML={{ __html: article.body_html }}
          />
        ) : article.body ? (
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {article.body}
          </div>
        ) : null}

        {/* CTA */}
        <div className="mt-12 p-6 bg-[#EAF2FF] rounded-xl border border-[#E5E7EB] text-center">
          <p className="font-semibold text-gray-900 mb-2">Looking for property in Costa Rica?</p>
          <p className="text-gray-600 text-sm mb-4">Browse verified listings in Ojochal and the Southern Pacific zone.</p>
          <a
            href="/search"
            className="inline-block px-6 py-2.5 bg-[#0F5AE5] hover:bg-[#0B4CC4] text-white font-semibold rounded-lg transition-colors"
          >
            Browse Listings
          </a>
        </div>
      </div>
    </main>
  )
}
