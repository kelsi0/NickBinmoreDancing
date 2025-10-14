"use client";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SectionTitle from "@/components/SectionTitle";
import {useContentful} from "@/hooks/useContentful";
import type {SectionContent} from "@/types/contentful";
import {renderText} from "@/lib/contentful-options";

export default function AboutPage() {
  const {data, loading, error} = useContentful("page", "pageTitle", "About", {
    include: 2,
  });

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
      <Navbar/>
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

        {sectionContent.map((section: SectionContent) => (
          <section
            key={section.fields.sectionTitle}
            className="section-container bg-light-bg"
          >
            <div>
              <SectionTitle title={section.fields.sectionTitle}/>
              {section.fields.richText && renderText(section.fields.richText)}
            </div>
          </section>
        ))}

        <section className="section-container bg-light-bg">
          <SectionTitle title="Where to find us" />
          <div className="grid grid-cols-2 gap-4 px-4 md:px-0 justify-items-center">
            <div className="w-full">
              <h4 className="text-base md:text-xl font-bold mb-2">Castle School of Dancing</h4>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2539.5682259865944!2d-3.534740807765556!3d50.46776451288582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486d0fda60977073%3A0x699a8e385cda2d73!2sCastle%20School%20of%20Dancing!5e0!3m2!1sen!2suk!4v1760343197657!5m2!1sen!2suk"
                loading="lazy"
                className="w-full h-28 md:h-64 rounded-lg shadow-md border"
                referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="w-full">
              <h4 className="text-base md:text-xl font-bold mb-2">Livermead House Hotel</h4>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.125363560545!2d-3.5466304231811407!3d50.45739018686382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486d101e6132f737%3A0x46a68447ae243943!2sLivermead%20House%20Hotel!5e0!3m2!1sen!2suk!4v1760344812711!5m2!1sen!2suk"
                loading="lazy"
                className="w-full h-28 md:h-64 rounded-lg shadow-md border"
                referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </section>

      </main>
      <Footer leftText={footerContent.leftText} rightText={footerContent.rightText} />
    </>
  );
}
