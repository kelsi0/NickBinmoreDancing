"use client";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LessonCard from "@/components/LessonCard";
import Navbar from "@/components/Navbar";
import SectionTitle from "@/components/SectionTitle";
import { useContentful } from "@/hooks/useContentful";
import type { CardContent, SectionContent } from "@/types/contentful";

export default function HomePage() {
  const { data, loading, error } = useContentful("page", "pageTitle", "Home", {
    include: 2,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading content.</div>;

  // @ts-expect-error
  const heroContent = data.items[0]?.fields.hero.fields;
  // @ts-expect-error
  const sectionContent = data.items[0]?.fields.sections;

  return (
    <>
      <Navbar />
      <main className="bg-background text-foreground font-sans">
        <Hero
          tagLine={heroContent.tagLine}
          title={heroContent.title}
          description={heroContent.subtitle}
          primaryButtonText={heroContent.primaryButtonText}
          primaryButtonHref={heroContent.primaryButtonHref}
          secondaryButtonText={heroContent.secondaryButtonText}
          secondaryButtonHref={heroContent.secondaryButtonHref}
        />

        {sectionContent?.map((section: SectionContent) => (
          <section
            key={section.fields.sectionTitle}
            className="section-container"
          >
            <SectionTitle title={section.fields.sectionTitle} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8">
              {section.fields.content?.map((card: CardContent) => (
                <LessonCard
                  key={card.sys.id}
                  title={card.fields.title}
                  description={card.fields.description}
                  badge={card.fields.tag}
                />
              ))}
            </div>
          </section>
        ))}

        <Footer />
      </main>
    </>
  );
}
