import MainLayout from '@/layouts/MainLayout';

const Cookies = () => {
  const contactEmail = 'hello.equitable-journeys@quoralinex.com';

  return (
    <MainLayout>
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold">Cookie Policy</h1>
            <p className="text-gray-600">
              How and why we use cookies and similar technologies on the Equitable Journeys website.
            </p>
            <p className="text-xs text-gray-400">
              Last updated: [update this date when you change the policy]
            </p>
          </div>

          <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">1. What are cookies?</h2>
              <p className="text-gray-700">
                Cookies are small text files that are stored on your device when you visit a website. They help the site
                recognise your device and remember certain information about your visit. Similar technologies, such as
                pixels or local storage, can serve the same purpose.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">2. How we use cookies</h2>
              <p className="text-gray-700">We use cookies and similar technologies for a few key reasons:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">Strictly necessary cookies</span> to provide core site functionality,
                  such as loading pages securely and remembering basic settings. These are required for the site to work
                  properly.
                </li>
                <li>
                  <span className="font-medium">Preference cookies</span> (where used) to remember choices such as your
                  preferred language or region.
                </li>
                <li>
                  <span className="font-medium">Analytics cookies</span> (where enabled) to help us understand how
                  people use the site so we can improve content and performance.
                </li>
                <li>
                  <span className="font-medium">Third-party cookies</span> (where used) that support features such as
                  embedded content or integrations from other services.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">3. Legal basis and consent</h2>
              <p className="text-gray-700">
                In the UK and European Economic Area, the use of non-essential cookies (such as analytics or marketing
                cookies) usually requires your consent under the ePrivacy rules. We rely on:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Consent for non-essential cookies where required by law.</li>
                <li>
                  Legitimate interests or equivalent legal bases for essential cookies that are necessary to provide the
                  Service.
                </li>
              </ul>
              <p className="text-gray-700">
                In other locations, we apply cookie practices that are broadly consistent with these principles, while
                also taking into account any local legal requirements.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">4. Managing your cookie preferences</h2>
              <p className="text-gray-700">You can control cookies in several ways:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  If we provide a cookie banner or settings panel, you can use it to enable or disable non-essential
                  cookies.
                </li>
                <li>
                  You can adjust your browser settings to block or delete cookies. The method varies by browser, so
                  please check your browser&apos;s help pages for details.
                </li>
                <li>
                  You can usually opt out of certain third-party analytics or marketing tools directly via their own
                  opt-out pages.
                </li>
              </ul>
              <p className="text-gray-700">
                Please note that blocking all cookies may affect how the website functions and some features may not
                work as intended.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">5. Third-party cookies</h2>
              <p className="text-gray-700">
                Some cookies on this site may be placed by third-party services, such as analytics providers or embedded
                content platforms. These third parties may use cookies independently of us and will have their own
                privacy and cookie notices, which we encourage you to review.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">6. Updates to this Cookie Policy</h2>
              <p className="text-gray-700">
                We may update this Cookie Policy from time to time, for example to reflect changes in the cookies we
                use, our services, or applicable law. When we do, we will update the &quot;Last updated&quot; date at
                the top of this page.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">7. Contact</h2>
              <p className="text-gray-700">
                If you have questions about how we use cookies or this Cookie Policy, please contact us at{' '}
                <a className="text-primary font-medium" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Cookies;
