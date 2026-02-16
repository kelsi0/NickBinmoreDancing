import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Public Liability Insurance | Nick Binmore Dancing',
  description: 'View our public liability insurance certificate',
};

export default function InsurancePage() {
  return (
    <>
      <Navbar />
      <main className="font-sans">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary-light text-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Public Liability Insurance
            </h1>
            <p className="text-lg md:text-xl text-black/90 max-w-3xl mx-auto">
              View our comprehensive public liability insurance certificate
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-container bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 text-lg leading-relaxed">
                Castle School of Dancing maintains comprehensive public liability insurance
                to ensure the safety and protection of all participants in our dance classes
                and events. Our insurance provides peace of mind for both our students and venue partners.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Insurance Certificate</h2>

              <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                <iframe
                  src="/public-liability-certificate.pdf"
                  className="w-full h-[600px] md:h-[800px]"
                  title="Public Liability Insurance Certificate"
                />
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/public-liability-certificate.pdf"
                  download
                  className="btn btn-primary text-center"
                >
                  📄 Download Certificate
                </a>
                <a
                  href="/public-liability-certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-gray-600 hover:bg-gray-700 text-white text-center"
                >
                  🔍 View Full Screen
                </a>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed">
                For any questions about our insurance coverage or to request additional documentation,
                please{' '}
                <a href="/contact" className="text-primary font-semibold hover:text-primary-light underline">
                  contact us
                </a>.
              </p>
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
