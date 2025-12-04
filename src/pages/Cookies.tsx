import MainLayout from '@/layouts/MainLayout';

const Cookies = () => {
  return (
    <MainLayout>
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold">Cookie Policy</h1>
            <p className="text-gray-600">Learn how we use cookies and similar technologies on this site.</p>
          </div>

          <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Essential cookies</h2>
              <p className="text-gray-700">
                These cookies keep core features running, such as remembering your progress when you move between pages. They do
                not store personal information.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Analytics</h2>
              <p className="text-gray-700">
                We may use privacy-friendly analytics to understand which pages are most helpful. Data is aggregated and used
                only to improve the experience.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Managing preferences</h2>
              <p className="text-gray-700">
                You can disable non-essential cookies in your browser settings at any time. Opting out of analytics will not
                affect your ability to use the site.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Cookies;
