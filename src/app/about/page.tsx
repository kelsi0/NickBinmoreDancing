"use client";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SectionTitle from "@/components/SectionTitle";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background text-foreground font-sans">
        <Hero
          title="About Castle School of Dancing"
          description="A welcoming studio teaching ballroom, latin and social dance."
          primaryButtonText="See lessons"
          primaryButtonHref="/lessons"
          secondaryButtonText="Contact us"
          secondaryButtonHref="/contact"
        />

        {/* Our Story Section */}
        <section className="container py-12 md:py-16">
          <SectionTitle title="Our Story" />
          <div className="mt-6 max-w-4xl">
            <p className="text-base md:text-lg leading-relaxed text-foreground">
              Founded by a qualified instructor with medal test experience,
              Castle School of Dancing blends traditional technique with modern
              teaching. We focus on fundamentals—posture, timing, and
              partnership—so you feel confident on any floor.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="container py-12 md:py-16 bg-muted/30">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Values</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <span className="text-lg md:text-xl font-semibold">
                  Inclusive & friendly—solo dancers welcome
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <span className="text-lg md:text-xl font-semibold">
                  Evidence-based instruction with clear goals
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <span className="text-lg md:text-xl font-semibold">
                  Progression pathways and feedback
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                <span className="text-lg md:text-xl font-semibold">
                  Community socials and practice spaces
                </span>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
