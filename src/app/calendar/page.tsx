"use client";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SectionTitle from "@/components/SectionTitle";

export default function CalendarPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background text-foreground font-sans">
        <Hero
          title="Calendar"
          description="This page embeds Google Calendar or a similar plugin for live updates."
          primaryButtonText="See lessons"
          primaryButtonHref="/lessons"
          secondaryButtonText="Contact us"
          secondaryButtonHref="/contact"
        />

        <section className="section-container">
          <div className="mt-8">
            {/* Google Calendar Embed - Client can replace this with their own calendar */}
            <div className="w-full rounded-lg overflow-hidden shadow-lg bg-white">
              <iframe
                title="Google Calendar"
                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FLondon&showPrint=0&src=bmlja2Jpbm1vcmVkYW5jaW5nQGdtYWlsLmNvbQ&src=ZW4tZ2IudWsjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039be5&color=%230b8043"
                style={{ border: 0 }}
                width="100%"
                height="600"
                frameBorder="0"
                scrolling="no"
                className="w-full"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
