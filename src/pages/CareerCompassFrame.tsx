import MainLayout from "@/layouts/MainLayout";
import ExternalFrame from "@/components/ExternalFrame";

const CareerCompassFrame = () => {
  return (
    <MainLayout>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <ExternalFrame 
            title="Career Compass Pro"
            description="AI career guidance assistant in an in-site frame view."
            url="https://chatgpt.com/g/g-689fa62cca108191a50965a258edef58-career-compass-pro"
          />
        </div>
      </section>
    </MainLayout>
  );
};

export default CareerCompassFrame;
