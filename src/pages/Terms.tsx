import MainLayout from '@/layouts/MainLayout';

const Terms = () => {
  const contactEmail = 'hello.equitable-journeys@quoralinex.com';

  return (
    <MainLayout>
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold">Terms of Service</h1>
            <p className="text-gray-600">
              The guidelines for using the Equitable Journeys website and tools responsibly.
            </p>
            <p className="text-xs text-gray-400">
              Last updated: [update this date when you change the terms]
            </p>
          </div>

          <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">1. About Equitable Journeys</h2>
              <p className="text-gray-700">
                Equitable Journeys is a not-for-profit project developed by Quoralinex to support access to education
                and career development. These Terms of Service (&quot;Terms&quot;) govern your use of this website and
                any related tools or content (the &quot;Service&quot;).
              </p>
              <p className="text-gray-700">
                By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, please do
                not use the Service.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">2. Using the Service</h2>
              <p className="text-gray-700">
                You agree to use the Service in a lawful, fair and reasonable way. In particular, you agree that you
                will not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Attempt to gain unauthorised access to the Service, its systems or other users&apos; data.</li>
                <li>Interfere with or disrupt the operation of the website or its infrastructure.</li>
                <li>Use the Service for fraudulent, harmful or unlawful purposes.</li>
                <li>
                  Copy, modify, or distribute content from the site without appropriate permission, except where the law
                  permits.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">3. Information only, not professional advice</h2>
              <p className="text-gray-700">
                The content on Equitable Journeys is provided for general information and educational purposes only. It
                does not constitute legal, financial, immigration, careers, or other professional advice. You should
                obtain advice from qualified professionals before making important decisions based on information found
                on or through the Service.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">4. Accounts and security</h2>
              <p className="text-gray-700">
                If the Service allows or requires you to create an account, you are responsible for safeguarding your
                login details and for all activity that occurs under your account. Please notify us promptly at{' '}
                <a className="text-primary font-medium" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>{' '}
                if you suspect unauthorised access.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">5. Intellectual property</h2>
              <p className="text-gray-700">
                Unless otherwise stated, we or our licensors own the intellectual property rights in the Service and its
                content, including text, graphics, logos, and code. You may use the website for your personal,
                non-commercial use. Any other use, including reproduction, distribution or modification, requires our
                prior written permission unless such use is permitted by law.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">6. Third-party links and services</h2>
              <p className="text-gray-700">
                The Service may contain links to third-party websites or services. We do not control and are not
                responsible for the content, policies, or practices of those third parties. Your use of third-party
                sites is at your own risk and subject to their own terms and policies.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">7. Availability and changes</h2>
              <p className="text-gray-700">
                We aim to keep the Service available and up to date, but we do not guarantee that it will always be
                available, secure, or error-free. We may change, suspend, or discontinue any part of the Service at any
                time, with or without notice.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">8. Liability</h2>
              <p className="text-gray-700">
                To the fullest extent permitted by applicable law, we exclude all implied warranties, conditions and
                representations regarding the Service. We are not liable for any indirect or consequential loss, loss
                of profits, business interruption, loss of data, or loss of opportunity arising out of or in connection
                with your use of the Service.
              </p>
              <p className="text-gray-700">
                Nothing in these Terms excludes or limits any liability that cannot be excluded or limited under
                applicable law, such as liability for fraud or for personal injury caused by negligence.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">9. Governing law</h2>
              <p className="text-gray-700">
                These Terms are governed by and construed in accordance with the laws of England and Wales, without
                prejudice to any mandatory consumer protection rights that apply in the country or state where you
                habitually reside.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">10. Contact</h2>
              <p className="text-gray-700">
                If you have questions about these Terms or how they apply, please contact us at{' '}
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

export default Terms;
