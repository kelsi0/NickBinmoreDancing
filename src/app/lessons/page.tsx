"use client";

import DetailedCard from "@/components/DetailedCard";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LessonCard from "@/components/LessonCard";
import Navbar from "@/components/Navbar";
import SectionTitle from "@/components/SectionTitle";
import { useContentful } from "@/hooks/useContentful";
import type {
  CardContent,
  SectionContent,
} from "@/types/contentful";
import { renderText } from "@/lib/contentful-options";
import { useEffect } from "react";

export default function LessonsPage() {
  const { data, loading, error } = useContentful(
    "page",
    "pageTitle",
    "Lessons",
    {
      include: 2,
    },
  );

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [loading, data]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading content.</div>;

  // @ts-expect-error
  const heroContent = data.items[0]?.fields.hero.fields;
  // @ts-expect-error
  const sectionContent = data.items[0]?.fields?.sections;
  // @ts-expect-error
  const footerContent = data.items[0]?.fields.footer.fields;

  return (
    <>
      <Navbar />
      <main className="bg-background text-foreground font-sans">
        <Hero
          tagLine={heroContent.tagLine}
          title={heroContent.title}
          description={heroContent.subtitle}
          primaryButtonText={heroContent.primaryButtonText ?? null}
          primaryButtonHref={heroContent.primaryButtonHref ?? null}
          secondaryButtonText={heroContent.secondaryButtonText ?? null}
          secondaryButtonHref={heroContent.secondaryButtonHref ?? null}
        />

        {sectionContent.map((section: SectionContent) => (
          <section
            key={section.fields.sectionTitle}
            className="section-container bg-light-bg"
          >
            <div>
              <SectionTitle title={section.fields.sectionTitle} />
              {section.fields.richText && renderText(section.fields.richText)}
              {section.fields.content && (
                <div>
                  {section.fields.content.some(
                    (card: CardContent) =>
                      card.sys.contentType.sys.id === "lessonCard",
                  ) && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                      {section.fields.content
                        .filter(
                          (card: CardContent) =>
                            card.sys.contentType.sys.id === "lessonCard",
                        )
                        .map((card: CardContent) => (
                          <LessonCard
                            key={card.sys.id}
                            title={card.fields.title}
                            description={card.fields.description}
                            badge={card.fields.tag}
                            href={card.fields.link}
                          />
                        ))}
                    </div>
                  )}
                  {section.fields.content
                    .filter(
                      (card: CardContent) =>
                        card.sys.contentType.sys.id === "detailedCard",
                    )
                    .map((card: CardContent) => (
                      <DetailedCard
                        key={card.sys.id}
                        title={card.fields.title}
                        subtitle={card.fields.subtitle}
                        body={card.fields.body}
                        buttonText={card.fields.buttonText ?? null}
                        buttonHref={card.fields.buttonHref ?? null}
                        id={card.fields.id ?? undefined}
                      />
                    ))}
                </div>
              )}
            </div>
          </section>
        ))}
        <Footer leftText={footerContent.leftText} rightText={footerContent.rightText} />
      </main>
    </>
  );
}
