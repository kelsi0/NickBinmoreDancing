"use client";

import {useSearchParams} from "next/navigation";
import {Suspense, useEffect, useState} from "react";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SectionTitle from "@/components/SectionTitle";
import {useContentful} from "@/hooks/useContentful";

function ContactForm() {
  const searchParams = useSearchParams();
  const lessonQuery = searchParams.get("lesson");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Pre-fill message if lesson query parameter exists
  useEffect(() => {
    if (lessonQuery) {
      setFormData((prev) => ({
        ...prev,
        message: `Hi, I'm interested in learning more about ${lessonQuery}. `,
      }));
    }
  }, [lessonQuery]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({type: null, message: ""});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({type: null, message: ""});

    // Simulate form submission - replace with actual API call
    try {
      // In a real application, you would send this to an API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus({
        type: "success",
        message: "Thank you for your message! We'll get back to you soon.",
      });

      // Reset form
      setFormData({name: "", email: "", phone: "", message: ""});
    } catch (_error) {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="Your name"
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email <span className="text-primary">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="your.email@example.com"
        />
      </div>

      {/* Phone Field (Optional) */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone Number{" "}
          <span className="text-muted-foreground text-xs">(optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          placeholder="Your phone number"
        />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-vertical"
          placeholder="Tell us about your interest in dancing lessons..."
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </div>

      {/* Status Message */}
      {submitStatus.type && (
        <div
          className={`p-4 rounded-lg ${
            submitStatus.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {submitStatus.message}
        </div>
      )}
    </form>
  );
}

export default function ContactPage() {
  const {data, loading, error} = useContentful("page", "pageTitle", "Contact");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading content.</div>;

  // @ts-expect-error
  const heroContent = data.items[0]?.fields.hero.fields;
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

        <section className="section-container">
          <SectionTitle title="Get in Touch"/>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <Suspense
                fallback={<div className="text-center py-8">Loading form...</div>}
              >
                <ContactForm/>
              </Suspense>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-muted uppercase tracking-wide mb-2">
                    Phone
                  </h4>
                  <a
                    href="tel:07791386903"
                    className="text-lg hover:text-primary transition-colors"
                  >
                    Nick: 07791386903
                  </a>
                  <a
                    href="tel:07512059673"
                    className="text-lg hover:text-primary transition-colors px-2"
                  >
                    Amanda: 07512059673
                  </a>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-muted uppercase tracking-wide mb-2">
                    Email
                  </h4>
                  <a
                    href="mailto:nickbinmoredancing@gmail.com"
                    className="text-lg hover:text-primary transition-colors"
                  >
                    nickbinmoredancing@gmail.com
                  </a>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-muted uppercase tracking-wide mb-2">
                    Address
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <address className="text-lg not-italic leading-relaxed">
                      Castle School of Dancing
                      <br />
                      5 Castle Rd
                      <br/>
                      Torquay, UK
                      <br/>
                      TQ1 3BB
                    </address>
                    <address className="text-lg not-italic leading-relaxed">
                      Livermead House Hotel
                      <br/>
                      Torbay Rd
                      <br/>
                      Torquay, UK
                      <br/>
                      TQ2 6QJ
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer leftText={footerContent.leftText} rightText={footerContent.rightText} />
    </>
  );
}
