"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import Footer from "@/components/Footer";

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

        <section className="container py-12 md:py-16">
          <SectionTitle title="Upcoming Highlights" />

          <div className="mt-8">
            {/* Google Calendar Embed - Client can replace this with their own calendar */}
            <div className="w-full rounded-lg overflow-hidden shadow-lg bg-white">
              <iframe
                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Europe%2FLondon&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0"
                style={{ border: 0 }}
                width="100%"
                height="600"
                frameBorder="0"
                scrolling="no"
                className="w-full"
              ></iframe>
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Note for client:</strong> To update this calendar, replace the iframe src URL with your own Google Calendar embed code.
                You can get this from Google Calendar by going to Settings → Your Calendar → Integrate Calendar → Customize and copy the iframe code.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

