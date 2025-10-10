"use client";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LessonCard from "@/components/LessonCard";
import Navbar from "@/components/Navbar";
import SectionTitle from "@/components/SectionTitle";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="bg-background text-foreground font-sans">
        <Hero
          title="Ballroom, Latin & Social Dance Lessons"
          description="Friendly, structured teaching in a modern studio. Singles and couples welcome—absolute beginners to advanced."
          primaryButtonText="See lessons"
          primaryButtonHref="/lessons"
          secondaryButtonText="Contact us"
          secondaryButtonHref="/contact"
        />

        <section className="container py-12 md:py-16">
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
