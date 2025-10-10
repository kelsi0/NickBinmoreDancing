"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import LessonCard from "@/components/LessonCard";
import Footer from "@/components/Footer";

export default function LessonsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background text-foreground font-sans">
        <Hero
          title="Lessons & Pricing"
          description="Clear paths for every level. Choose a course or book private coaching."
          primaryButtonText="Book now"
          primaryButtonHref="/contact"
          secondaryButtonText="Contact us"
          secondaryButtonHref="/contact"
        />

        {/* Group Courses Section */}
        <section className="container py-12 md:py-16">
          <SectionTitle title="Group Courses" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8">
            <LessonCard
              title="Absolute Beginners"
              description="Start with posture, hold, and core figures."
              badge="£80 pp"
              href="/lessons#absolute-beginners"
            />
            <LessonCard
              title="Improvers"
              description="Build confidence and add new variations."
              badge="£90 pp"
              href="/lessons#improvers"
            />
            <LessonCard
              title="Technique Workshop"
              description="Monthly focus on footwork, frame, and musicality."
              badge="£20"
              href="/lessons#technique-workshop"
            />
          </div>
        </section>

        {/* Private Lessons Section */}
        <section className="container py-12 md:py-16">
          <SectionTitle title="Private Lessons" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8">
            <LessonCard
              title="One-to-One Coaching"
              description="Personalised attention to accelerate your progress and refine technique for exams or competitions."
              href="/lessons#one-to-one-coaching"
            />
            <LessonCard
              title="Wedding First Dance"
              description="Bespoke choreography and coaching to create a memorable moment for your special day."
              badge="Bespoke"
              href="/lessons#wedding-first-dance"
            />
          </div>
        </section>

        {/* Detailed Lesson Information */}
        <section className="container py-12 md:py-16 bg-muted/30">
          <SectionTitle title="Lesson Details" />

          {/* Absolute Beginners Detail */}
          <div id="absolute-beginners" className="scroll-mt-24 mt-12 max-w-4xl bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Absolute Beginners</h3>
            <p className="text-lg text-primary font-semibold mb-4">£80 per person</p>
            <div className="space-y-4 text-[0.9375rem] leading-relaxed">
              <p>
                Perfect for those with no prior dance experience. This comprehensive 6-week course introduces you to the fundamentals of ballroom and Latin dancing in a supportive, friendly environment.
              </p>
              <div>
                <h4 className="font-semibold text-lg mb-2">What You'll Learn:</h4>
                <ul className="list-disc list-inside space-y-2 text-muted ml-4">
                  <li>Proper posture and hold</li>
                  <li>Basic timing and rhythm</li>
                  <li>Core figures in Waltz, Cha Cha, and Jive</li>
                  <li>Leading and following techniques</li>
                  <li>Basic floorcraft and etiquette</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Course Details:</h4>
                <ul className="list-disc list-inside space-y-2 text-muted ml-4">
                  <li>Duration: 6 weeks (90 minutes per session)</li>
                  <li>No partner required - we rotate partners during class</li>
                  <li>Maximum class size: 16 participants</li>
                  <li>All ages welcome (16+)</li>
                </ul>
              </div>
              <div className="pt-4">
                <a href="/contact?lesson=Absolute Beginners" className="btn btn-primary">
                  Book this course
                </a>
              </div>
            </div>
          </div>

          {/* Improvers Detail */}
          <div id="improvers" className="scroll-mt-24 mt-12 max-w-4xl bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Improvers</h3>
            <p className="text-lg text-primary font-semibold mb-4">£90 per person</p>
            <div className="space-y-4 text-[0.9375rem] leading-relaxed">
              <p>
                For dancers who have completed a beginner course or have some social dancing experience. Build on your foundation and expand your repertoire with more complex figures and styling.
              </p>
              <div>
                <h4 className="font-semibold text-lg mb-2">What You'll Learn:</h4>
                <ul className="list-disc list-inside space-y-2 text-muted ml-4">
                  <li>Advanced figures and variations</li>
                  <li>Styling and performance techniques</li>
                  <li>Improved musicality and expression</li>
                  <li>Connection and partnership skills</li>
                  <li>Introduction to additional dance styles (Quickstep, Rumba)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Prerequisites:</h4>
                <p className="text-muted ml-4">Completion of beginner course or equivalent experience. Comfortable with basic figures in at least 2-3 dances.</p>
              </div>
              <div className="pt-4">
                <a href="/contact?lesson=Improvers" className="btn btn-primary">
                  Book this course
                </a>
              </div>
            </div>
          </div>

          {/* Technique Workshop Detail */}
          <div id="technique-workshop" className="scroll-mt-24 mt-12 max-w-4xl bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Technique Workshop</h3>
            <p className="text-lg text-primary font-semibold mb-4">£20 per session</p>
            <div className="space-y-4 text-[0.9375rem] leading-relaxed">
              <p>
                Monthly intensive workshops focusing on specific technical aspects of dance. Perfect for dancers of all levels looking to refine their skills and deepen their understanding.
              </p>
              <div>
                <h4 className="font-semibold text-lg mb-2">Workshop Topics Include:</h4>
                <ul className="list-disc list-inside space-y-2 text-muted ml-4">
                  <li>Footwork fundamentals</li>
                  <li>Frame and connection</li>
                  <li>Musicality and timing</li>
                  <li>Balance and body flight</li>
                  <li>Dance-specific techniques (rotation, Cuban motion, etc.)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Format:</h4>
                <ul className="list-disc list-inside space-y-2 text-muted ml-4">
                  <li>2-hour intensive session</li>
                  <li>Held monthly on Saturdays</li>
                  <li>Different topic each month</li>
                  <li>Suitable for all levels (content adapted to participants)</li>
                </ul>
              </div>
              <div className="pt-4">
                <a href="/contact?lesson=Technique Workshop" className="btn btn-primary">
                  Register interest
                </a>
              </div>
            </div>
          </div>

          {/* One-to-One Coaching Detail */}
          <div id="one-to-one-coaching" className="scroll-mt-24 mt-12 max-w-4xl bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">One-to-One Coaching</h3>
            <p className="text-lg text-primary font-semibold mb-4">Pricing on request</p>
            <div className="space-y-4 text-[0.9375rem] leading-relaxed">
              <p>
                Receive personalised attention and accelerated progress with private coaching sessions tailored to your specific goals and needs.
              </p>
              <div>
                <h4 className="font-semibold text-lg mb-2">Ideal For:</h4>
                <ul className="list-disc list-inside space-y-2 text-muted ml-4">
                  <li>Preparing for medal tests or examinations</li>
                  <li>Competition preparation</li>
                  <li>Addressing specific technical challenges</li>
                  <li>Accelerated learning for busy schedules</li>
                  <li>Building confidence before joining group classes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">What's Included:</h4>
                <ul className="list-disc list-inside space-y-2 text-muted ml-4">
                  <li>Fully customised lesson plans</li>
                  <li>Video recording available (upon request)</li>
                  <li>Progress tracking and goal setting</li>
                  <li>Flexible scheduling</li>
                  <li>Can accommodate couples or solo dancers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Session Options:</h4>
                <p className="text-muted ml-4">Available in 45-minute or 60-minute sessions. Packages available for multiple lessons.</p>
              </div>
              <div className="pt-4">
                <a href="/contact?lesson=One-to-One Coaching" className="btn btn-primary">
                  Enquire now
                </a>
              </div>
            </div>
          </div>

          {/* Wedding First Dance Detail */}
          <div id="wedding-first-dance" className="scroll-mt-24 mt-12 max-w-4xl bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Wedding First Dance</h3>
            <p className="text-lg text-primary font-semibold mb-4">Bespoke packages available</p>
            <div className="space-y-4 text-[0.9375rem] leading-relaxed">
              <p>
                Make your first dance truly memorable with personalised choreography and coaching designed around your chosen song and comfort level.
              </p>
              <div>
                <h4 className="font-semibold text-lg mb-2">Our Approach:</h4>
                <ul className="list-disc list-inside space-y-2 text-muted ml-4">
                  <li>Custom choreography to suit your song and style</li>
                  <li>Adapted to your experience level (from simple to spectacular)</li>
                  <li>Focus on looking natural and feeling comfortable</li>
                  <li>Options for simple elegance or show-stopping routines</li>
                  <li>Rehearsal coordination for wedding party dances</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Package Includes:</h4>
                <ul className="list-disc list-inside space-y-2 text-muted ml-4">
                  <li>Initial consultation to discuss your vision</li>
                  <li>Song analysis and choreography design</li>
                  <li>4-8 private lessons (depending on package)</li>
                  <li>Practice notes and video recordings</li>
                  <li>Final polish session close to your wedding date</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Timing:</h4>
                <p className="text-muted ml-4">We recommend starting 2-3 months before your wedding day for best results. Rush packages available for shorter timelines.</p>
              </div>
              <div className="pt-4">
                <a href="/contact?lesson=Wedding First Dance" className="btn btn-primary">
                  Get a quote
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Course Details Section */}
        <section className="container py-12 md:py-16 bg-light-bg">
          <div className="max-w-3xl">
            <h2 className="text-h2 mb-6">General Information</h2>
            <div className="space-y-6 text-[0.9375rem] leading-relaxed">
              <div>
                <h3 className="font-semibold text-[1.125rem] mb-2">Duration & Schedule</h3>
                <p className="text-muted">
                  Most courses run for 6 weeks with weekly 90-minute sessions. Check the calendar for specific dates and times.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[1.125rem] mb-2">What to Bring</h3>
                <p className="text-muted">
                  Comfortable clothing and dance shoes (or smooth-soled shoes). No partner required for group courses.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[1.125rem] mb-2">Booking & Payment</h3>
                <p className="text-muted">
                  Secure your place online or contact us for more information. Full payment required at booking.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
