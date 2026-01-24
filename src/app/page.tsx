import Hero from "@/component/homepage/hero";
import Features from "@/component/homepage/features";
import Cat from "@/component/homepage/cat";
import Testimonials from "@/component/homepage/testimonials";
import Featuredproducts from "@/component/homepage/featuredproducts";

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <Hero />
      {/* Features Section */}
      <Features />
      {/* Featured Products */}
      <Featuredproducts />
      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <Cat />
    </div>
  );
};

export default Home;
