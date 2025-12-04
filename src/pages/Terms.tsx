import MainLayout from '@/layouts/MainLayout';

const Terms = () => {
  return (
    <MainLayout>
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold">Terms of Service</h1>
            <p className="text-gray-600">
              The guidelines for using the Equitable Journeys website and tools responsibly.
            </p>
          </div>

          <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Using our site</h2>
              <p className="text-gray-700">
                Our tools provide general guidance and should be paired with advice from qualified professionals when making
                career or education decisions. You agree not to misuse or attempt to disrupt the platform.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Content and accuracy</h2>
              <p className="text-gray-700">
                We work to keep information current, but qualifications and pathway guidance can change. Always verify critical
                details with official providers before applying or enrolling.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Liability</h2>
              <p className="text-gray-700">
                Equitable Journeys is not responsible for decisions you make based on our suggestions. The service is provided on
                an "as-is" basis without warranties.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Contact</h2>
              <p className="text-gray-700">
                If you have questions about these terms, reach out at <a className="text-primary font-medium" href="mailto:support@equitablejourneys.com">support@equitablejourneys.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Terms;
