"use client";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import CalendarEmbed from "@/components/CalendarEmbed";
import { useContentful } from "@/hooks/useContentful";

export default function CalendarPage() {
  const { data, loading, error } = useContentful("page", "pageTitle", "Calendar");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading content.</div>;

  // @ts-expect-error
  const heroContent = data.items[0]?.fields.hero.fields;
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
          primaryButtonText={heroContent.primaryButtonText}
          primaryButtonHref={heroContent.primaryButtonHref}
          secondaryButtonText={heroContent.secondaryButtonText}
          secondaryButtonHref={heroContent.secondaryButtonHref}
        />

        <section className="section-container">
          <div className="mt-8">
            <CalendarEmbed />
          </div>
        </section>
      </main>
      <Footer leftText={footerContent.leftText} rightText={footerContent.rightText} />
    </>
  );
}
