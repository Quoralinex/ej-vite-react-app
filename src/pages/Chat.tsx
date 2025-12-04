import MainLayout from "@/layouts/MainLayout";
import ChatInterface from "@/components/ChatInterface";

const Chat = () => {
  return (
    <MainLayout>
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Assistant Chat
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with our AI assistants for career guidance and learning support. 
              Choose between Career Compass Pro for professional development or Einstein Learning for educational assistance.
            </p>
          </div>
          
          <ChatInterface />
        </div>
      </section>
    </MainLayout>
  );
};

export default Chat;