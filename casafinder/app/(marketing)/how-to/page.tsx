import type { Metadata } from 'next'
import { createServiceClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'How-To Guides | CasaFinder — Costa Rica',
  description: 'Practical guides for buying, building, and living in Costa Rica. Solar installation, water catchment, expat buying guide, and more.',
}

export default async function HowToIndexPage() {
  const supabase = await createServiceClient()

  const { data: articles } = await supabase
    .from('articles')
    .select('id, slug, title, excerpt, category, reading_time_min, cover_image_url, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  const categories = [...new Set((articles ?? []).map(a => a.category).filter(Boolean))]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-800 to-teal-700 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">How-To Guides</h1>
          <p className="text-xl text-white/80">
            Practical guides for living, building, and investing in Costa Rica's Southern Pacific.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {(articles ?? []).length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            Guides coming soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(articles ?? []).map(article => (
              <a
                key={article.id}
                href={`/how-to/${article.slug}`}
                className="group block bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                {article.cover_image_url && (
                  <div className="aspect-video bg-gray-100">
                    <img
                      src={article.cover_image_url}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5">
                  {article.category && (
                    <span className="text-xs font-semibold text-[#0F5AE5] uppercase tracking-wide">
                      {article.category}
                    </span>
                  )}
                  <h2 className="text-lg font-bold text-gray-900 mt-1 mb-2 group-hover:text-[#0F5AE5] transition-colors">
                    {article.title}
                  </h2>
                  {article.excerpt && (
                    <p className="text-gray-600 text-sm line-clamp-3">{article.excerpt}</p>
                  )}
                  <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                    {article.published_at && (
                      <span>{new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    )}
                    {article.reading_time_min && (
                      <span>{article.reading_time_min} min read</span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
