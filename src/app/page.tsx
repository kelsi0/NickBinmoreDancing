"use client";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LessonCard from "@/components/LessonCard";
import Navbar from "@/components/Navbar";
import SectionTitle from "@/components/SectionTitle";
import { useContentful } from "@/hooks/useContentful";

export default function HomePage() {
  const { data, loading, error } = useContentful("page", "pageTitle", "Home");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading content.</div>;

  // @ts-ignore
  const heroContent = data.items[0]?.fields.hero.fields;

  console.log(heroContent);

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
          <SectionTitle title="Popular lessons" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8">
            <LessonCard
              title="Beginner Course"
              description="Six-week course covering Waltz, Cha Cha, and Jive basics. No partner required."
              badge="New"
            />
            <LessonCard
              title="Wedding First Dance"
              description="Personalised choreography and coaching to make your moment unforgettable."
              badge="Bespoke"
            />
            <LessonCard
              title="Private Coaching"
              description="One-to-one sessions to accelerate progress and polish technique for exams or socials."
            />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
