import MainLayout from "@/layouts/MainLayout";
import ExternalFrame from "@/components/ExternalFrame";

const EinsteinLearningFrame = () => {
  return (
    <MainLayout>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <ExternalFrame 
            title="Einstein Learning"
            description="AI-powered learning assistant in an in-site frame view."
            url="https://chatgpt.com/g/g-68aa3c62374c819182b283f2ba1fbfe6-einstein-learning"
          />
        </div>
      </section>
    </MainLayout>
  );
};

export default EinsteinLearningFrame;
