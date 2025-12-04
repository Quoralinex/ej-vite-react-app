import MainLayout from '@/layouts/MainLayout';

const Privacy = () => {
  return (
    <MainLayout>
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            <p className="text-gray-600">
              How we handle your data and keep your information safe when you use Equitable Journeys.
            </p>
          </div>

          <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">What we collect</h2>
              <p className="text-gray-700">
                We collect only the details needed to provide guidance, such as the answers you submit in our pathway and
                qualification tools, as well as contact information you choose to share with us when requesting follow-ups.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">How we use your information</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Deliver personalized recommendations based on your education and career interests.</li>
                <li>Improve our tools by understanding how visitors interact with key pages.</li>
                <li>Respond to enquiries sent through our contact and newsletter channels.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Your choices</h2>
              <p className="text-gray-700">
                You can request access to, or deletion of, the personal details you have shared with us. We keep data only for as
                long as it is actively needed to deliver our services and comply with legal requirements.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Contact us</h2>
              <p className="text-gray-700">
                Questions about privacy? Reach us at <a className="text-primary font-medium" href="mailto:privacy@equitablejourneys.com">privacy@equitablejourneys.com</a> and we will respond promptly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Privacy;
