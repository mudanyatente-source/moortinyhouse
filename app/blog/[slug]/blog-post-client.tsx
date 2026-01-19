"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RevealAnimation } from "@/components/reveal-animation"
import { Calendar, Clock, ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  slug: string
  content: string
  featuredImage?: string
}

interface BlogPostClientProps {
  post: BlogPost
  allPosts: BlogPost[]
}

export default function BlogPostClient({ post, allPosts }: BlogPostClientProps) {
  // Find next and previous posts
  const currentIndex = allPosts.findIndex(p => p.slug === post.slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n')
    const elements: JSX.Element[] = []
    let listItems: string[] = []
    let inList = false

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc pl-6 mb-4 space-y-2">
            {listItems.map((item, i) => (
              <li key={i} className="text-muted-foreground">{item}</li>
            ))}
          </ul>
        )
        listItems = []
      }
      inList = false
    }

    lines.forEach((line, index) => {
      const trimmedLine = line.trim()
      
      if (trimmedLine === '') {
        flushList()
        return
      }

      // Headers
      if (trimmedLine.startsWith('## ')) {
        flushList()
        elements.push(
          <h2 key={index} className="text-2xl font-serif font-medium mt-8 mb-4">
            {trimmedLine.replace('## ', '')}
          </h2>
        )
        return
      }

      if (trimmedLine.startsWith('### ')) {
        flushList()
        elements.push(
          <h3 key={index} className="text-xl font-serif font-medium mt-6 mb-3">
            {trimmedLine.replace('### ', '')}
          </h3>
        )
        return
      }

      // Lists
      if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        inList = true
        let text = trimmedLine.replace(/^[-*]\s+/, '')
        // Handle bold text
        text = text.replace(/\*\*([^*]+)\*\*/g, '$1')
        listItems.push(text)
        return
      }

      // Numbered lists
      if (/^\d+\.\s/.test(trimmedLine)) {
        inList = true
        let text = trimmedLine.replace(/^\d+\.\s+/, '')
        text = text.replace(/\*\*([^*]+)\*\*/g, '$1')
        listItems.push(text)
        return
      }

      // Horizontal rule
      if (trimmedLine === '---') {
        flushList()
        elements.push(<hr key={index} className="my-8 border-border" />)
        return
      }

      // Italic text (links styled as italic)
      if (trimmedLine.startsWith('*') && trimmedLine.endsWith('*')) {
        flushList()
        const text = trimmedLine.slice(1, -1)
        // Parse links
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
        const parts = []
        let lastIndex = 0
        let match

        while ((match = linkRegex.exec(text)) !== null) {
          if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index))
          }
          parts.push(
            <Link key={match.index} href={match[2]} className="text-accent hover:underline">
              {match[1]}
            </Link>
          )
          lastIndex = match.index + match[0].length
        }
        if (lastIndex < text.length) {
          parts.push(text.slice(lastIndex))
        }

        elements.push(
          <p key={index} className="text-muted-foreground italic mb-4">
            {parts}
          </p>
        )
        return
      }

      // Regular paragraph
      flushList()
      elements.push(
        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
          {trimmedLine}
        </p>
      )
    })

    flushList()
    return elements
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-8">
        <div className="container mx-auto px-6">
          <RevealAnimation>
            <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-6">
              <ChevronLeft className="w-4 h-4" />
              Tüm Yazılar
            </Link>
          </RevealAnimation>
          <RevealAnimation delay={0.1}>
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                {post.category}
              </span>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-6 text-balance max-w-4xl">
              {post.title}
            </h1>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
              {post.excerpt}
            </p>
          </RevealAnimation>
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <section className="pb-8">
          <div className="container mx-auto px-6">
            <RevealAnimation delay={0.4}>
              <div className="aspect-[21/9] bg-muted rounded-2xl overflow-hidden relative">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
              </div>
            </RevealAnimation>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <RevealAnimation delay={0.5}>
            <article className="max-w-3xl mx-auto">
              {renderContent(post.content)}
            </article>
          </RevealAnimation>
        </div>
      </section>

      {/* Navigation */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <RevealAnimation delay={0.6}>
              <div className="border-t border-border pt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {prevPost ? (
                    <Link href={`/blog/${prevPost.slug}`} className="group">
                      <div className="bg-card rounded-xl border border-border p-6 hover:border-accent/50 transition-colors">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <ArrowLeft className="w-4 h-4" />
                          Önceki Yazı
                        </div>
                        <h3 className="font-medium group-hover:text-accent transition-colors line-clamp-2">
                          {prevPost.title}
                        </h3>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextPost && (
                    <Link href={`/blog/${nextPost.slug}`} className="group md:text-right">
                      <div className="bg-card rounded-xl border border-border p-6 hover:border-accent/50 transition-colors">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 md:justify-end">
                          Sonraki Yazı
                          <ArrowRight className="w-4 h-4" />
                        </div>
                        <h3 className="font-medium group-hover:text-accent transition-colors line-clamp-2">
                          {nextPost.title}
                        </h3>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <RevealAnimation delay={0.7}>
            <div className="max-w-3xl mx-auto text-center bg-card rounded-2xl border border-border p-12">
              <h3 className="text-2xl font-serif font-medium mb-4">Tiny House Hakkında Sorularınız mı Var?</h3>
              <p className="text-muted-foreground mb-6">
                Tiny house hakkında daha fazla bilgi almak, modelleri incelemek veya size özel bir teklif almak için bizimle iletişime geçin.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/models">
                  <Button variant="outline" className="rounded-full gap-2">
                    Modelleri İncele
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button className="rounded-full gap-2">
                    İletişime Geç
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </section>

      <Footer />
    </main>
  )
}
