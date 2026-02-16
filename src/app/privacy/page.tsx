  import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="font-sans">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary-light text-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-black/90 max-w-3xl mx-auto">
              Your privacy and data protection are important to us
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-container bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="prose prose-lg max-w-none">
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Last updated: 16th February 2026
                </p>

                <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg">
                  <p className="text-base text-gray-800 leading-relaxed">
                    At Castle School of Dancing, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information when you interact with us.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mt-8">1. Information We Collect</h2>
                <p className="text-gray-700 leading-relaxed">
                  We collect the following personal information from our students and customers:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>First and last names</li>
                  <li>Email addresses</li>
                  <li>Phone numbers</li>
                  <li>Dietary requirements (if provided for events)</li>
                  <li>Contents of your PAR-Q form</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8">2. Purpose of Collecting Data</h2>
                <p className="text-gray-700 leading-relaxed">
                  The information we collect is used solely for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Notifying you about upcoming events, socials, and classes</li>
                  <li>School administration, such as scheduling classes and managing attendance</li>
                  <li>Organizing and managing events that you have signed up for</li>
                  <li>Catering and event planning purposes, including passing on dietary requirements to third-party service providers (e.g., caterers) when necessary</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8">3. How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed">
                  Your information will only be used for internal purposes to ensure smooth communication and event management. In the case of dietary requirements, this information may be shared with third-party service providers (such as caterers) to ensure your needs are met during events. We do not share, sell, or distribute your personal information to any third parties for any other purpose without your consent, unless required by law.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8">4. Data Retention</h2>
                <p className="text-gray-700 leading-relaxed">
                  We will only retain your personal information for up to 3 years, after which it will be securely deleted, unless you request otherwise or we are required to keep it for legal reasons.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8">5. Data Security</h2>
                <p className="text-gray-700 leading-relaxed">
                  We are committed to keeping your information secure. We have implemented suitable physical, electronic, and managerial procedures to safeguard and protect the data we collect.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8">6. Your Rights</h2>
                <p className="text-gray-700 leading-relaxed">
                  You have the right to request access to the information we hold about you, to correct any inaccuracies, or to ask for it to be deleted at any time.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8">7. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions or concerns regarding this policy, please contact us at:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-4">
                  <p className="text-gray-700"><strong>Castle School of Dancing</strong></p>
                  <p className="text-gray-700 mt-2">Email: <a href="mailto:nickbinmore@aol.com" className="text-primary hover:text-primary-light underline">nickbinmore@aol.com</a> or <a href="mailto:amandasheridanuk@mail.com" className="text-primary hover:text-primary-light underline">amandasheridanuk@mail.com</a></p>
                  <p className="text-gray-700">Phone: <a href="tel:07791386903" className="text-primary hover:text-primary-light underline">07791 386 903</a></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer
        leftText="© 2025 Nick Binmore Dancing"
        rightText="IDTA Qualified Instructor"
      />
    </>
  );
}
