import MainLayout from '@/layouts/MainLayout';

const Privacy = () => {
  const contactEmail = 'hello.equitable-journeys@quoralinex.com';

  return (
    <MainLayout>
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            <p className="text-gray-600">
              How we handle your data and keep your information safe when you use Equitable Journeys.
            </p>
            <p className="text-xs text-gray-400">
              Last updated: 06/12/2025
            </p>
          </div>

          <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">1. Who we are</h2>
              <p className="text-gray-700">
                Equitable Journeys is a not-for-profit initiative developed by Quoralinex to help people find accessible
                learning and career pathways. For the purposes of UK GDPR, EU GDPR and similar data protection laws, we
                are the data controller for the personal data we collect through this website.
              </p>
              <p className="text-gray-700">
                You can contact us about privacy at{' '}
                <a className="text-primary font-medium" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
                .
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">2. What data we collect</h2>
              <p className="text-gray-700">
                The information we collect depends on how you interact with the site. It may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">Contact details,</span> such as your name and email address when you
                  contact us or subscribe for updates.
                </li>
                <li>
                  <span className="font-medium">Usage data,</span> such as pages visited, links clicked, and basic
                  device information collected via cookies and similar technologies.
                </li>
                <li>
                  <span className="font-medium">Learning and career information,</span> such as your goals and interests
                  when you choose to share them through forms, questionnaires, or tools on the site.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">3. How we use your data</h2>
              <p className="text-gray-700">We use your personal data to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide and improve the website and any tools or resources we offer.</li>
                <li>Respond to your enquiries and communicate with you about the service.</li>
                <li>Understand how people use the site so we can make it more useful and accessible.</li>
                <li>Comply with legal or regulatory obligations where required.</li>
              </ul>
              <p className="text-gray-700">
                Where UK or EU data protection law applies, we rely on different legal bases including: performance of a
                contract (where we provide services you request), our legitimate interests in running and improving
                Equitable Journeys, your consent (for example, for certain cookies), and compliance with legal
                obligations.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">4. Cookies and analytics</h2>
              <p className="text-gray-700">
                We use cookies and similar technologies to keep the site secure and reliable, remember certain
                preferences, and, where enabled, to understand how the site is used. Essential cookies are used to make
                the site function and do not usually require consent. Non-essential cookies, such as analytics or
                marketing cookies, are only used with your consent where the law requires it.
              </p>
              <p className="text-gray-700">
                For more detail about the types of cookies we use and how to manage them, please read our{' '}
                <a className="text-primary font-medium" href="/cookies">
                  Cookie Policy
                </a>
                .
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">5. When we share your data</h2>
              <p className="text-gray-700">
                We do not sell your personal data. We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Trusted service providers who host our website, send emails, provide analytics, or support our
                  systems, under appropriate contracts and safeguards.
                </li>
                <li>
                  Professional advisers such as legal or accounting support, where necessary for our activities.
                </li>
                <li>
                  Public authorities where we are legally required to do so, or where it is necessary to protect our
                  rights or the rights of others.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">6. International transfers</h2>
              <p className="text-gray-700">
                Some of our service providers may be located outside the UK or European Economic Area. Where this
                results in an international transfer of your personal data, we use appropriate safeguards such as
                adequacy decisions or standard contractual clauses, as required by applicable law.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">7. How long we keep your data</h2>
              <p className="text-gray-700">
                We retain personal data only for as long as necessary to fulfil the purposes described in this policy,
                including any legal, accounting, or reporting requirements. Retention periods may vary depending on the
                type of data and the context in which it was provided.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">8. Your rights</h2>
              <p className="text-gray-700">
                Depending on where you live, you may have rights over your personal data. Under UK and EU data
                protection law, these include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>The right to access a copy of your personal data.</li>
                <li>The right to correct inaccurate or incomplete data.</li>
                <li>The right to request deletion of your data in certain circumstances.</li>
                <li>The right to restrict or object to processing in certain circumstances.</li>
                <li>The right to data portability in certain circumstances.</li>
                <li>The right to withdraw consent where we rely on consent.</li>
              </ul>
              <p className="text-gray-700">
                If you are a resident of California or another US state with specific privacy laws, you may have
                additional rights such as the right to know what categories of personal information we collect, the
                right to request deletion, and the right not to be discriminated against for exercising your privacy
                rights.
              </p>
              <p className="text-gray-700">
                To exercise any of these rights, contact us at{' '}
                <a className="text-primary font-medium" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
                .
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">9. Children&apos;s data</h2>
              <p className="text-gray-700">
                Equitable Journeys is designed for adults and older learners. We do not knowingly collect personal data
                from children under 13 (or a higher age where local law provides). If you believe a child has provided
                us with personal information, please contact us so we can delete it.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">10. Changes to this policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time to reflect changes in our services, technology, or
                applicable law. When we do, we will update the &quot;Last updated&quot; date at the top of this page.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Privacy;
