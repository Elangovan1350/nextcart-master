import { Heart, Target, Award, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "We put our customers at the heart of everything we do. Your satisfaction is our success.",
    },
    {
      icon: Target,
      title: "Quality Driven",
      description:
        "We carefully curate products to ensure the highest quality standards for our platform.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description:
        "We constantly innovate to provide you with the best shopping experience possible.",
    },
    {
      icon: Zap,
      title: "Speed & Efficiency",
      description:
        "Fast shipping, quick support, and seamless transactions are our commitment to you.",
    },
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      avatar: "👨‍💼",
      bio: "10+ years in e-commerce industry",
    },
    {
      name: "Maria Garcia",
      role: "Head of Operations",
      avatar: "👩‍💼",
      bio: "Supply chain expert with global experience",
    },
    {
      name: "David Chen",
      role: "CTO",
      avatar: "👨‍💻",
      bio: "Full-stack developer, tech enthusiast",
    },
    {
      name: "Sarah Williams",
      role: "Customer Success Lead",
      avatar: "👩‍🎓",
      bio: "Dedicated to making customers happy",
    },
  ];

  const milestones = [
    { year: "2020", milestone: "NextCart Founded" },
    { year: "2021", milestone: "100K+ Products Listed" },
    { year: "2022", milestone: "1M+ Happy Customers" },
    { year: "2023", milestone: "Expanded to 50+ Countries" },
    { year: "2024", milestone: "10M+ Monthly Users" },
    { year: "2026", milestone: "Global Market Leader" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 md:py-20 lg:py-32">
        <div className="text-center space-y-3 sm:space-y-4 md:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            About
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
              {" "}
              NextCart
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto">
            We're building the future of e-commerce with a simple mission: make
            shopping faster, easier, and more enjoyable for everyone.
          </p>
        </div>
      </section>
      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Our Story
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-300">
              NextCart was born from a simple idea: everyone deserves access to
              quality products at great prices, with excellent customer service.
            </p>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-300">
              Founded in 2020, we started as a small team of passionate
              entrepreneurs with a vision to revolutionize online shopping.
              Today, we've grown to serve millions of customers worldwide.
            </p>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-300">
              Our commitment to innovation, quality, and customer satisfaction
              has made us one of the fastest-growing e-commerce platforms in the
              world.
            </p>
          </div>
          <div className="bg-linear-to-br from-blue-500 to-cyan-500 rounded-2xl p-1">
            <div className="bg-slate-800 rounded-xl p-6 sm:p-8 lg:p-12 flex items-center justify-center">
              <div className="text-6xl sm:text-8xl lg:text-9xl">📈</div>
            </div>
          </div>
        </div>
      </section>
      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 lg:p-10 hover:border-blue-500 transition">
            <Target className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-500 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-4">
              Our Mission
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-300">
              To provide a seamless, secure, and enjoyable shopping experience
              for customers worldwide while supporting small businesses and
              entrepreneurs to reach global markets.
            </p>
          </div>
          <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 lg:p-10 hover:border-cyan-500 transition">
            <Award className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-cyan-500 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-4">
              Our Vision
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-300">
              To be the world's most trusted and customer-centric e-commerce
              platform, setting new standards for online retail and creating
              lasting value for all stakeholders.
            </p>
          </div>
        </div>
      </section>
      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
            Our Core Values
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400">
            These principles guide every decision we make
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-slate-800 bg-opacity-50 backdrop-blur border border-slate-700 rounded-2xl p-4 sm:p-6 lg:p-8 hover:border-blue-500 transition"
              >
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-500 mb-2 sm:mb-4" />
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
            Our Journey
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400">
            From startup to industry leader
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-8">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="relative bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 lg:p-8 hover:border-blue-500 transition"
            >
              <div className="absolute -top-3 -left-3 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                {index + 1}
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400 mb-2">
                {milestone.year}
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-slate-300">
                {milestone.milestone}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
            Meet Our Team
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400">
            Talented individuals passionate about e-commerce
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-slate-800 bg-opacity-50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500 transition transform hover:scale-105"
            >
              <div className="bg-linear-to-br from-blue-500 to-cyan-500 h-32 sm:h-40 flex items-center justify-center text-4xl sm:text-6xl">
                {member.avatar}
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-xs sm:text-sm text-blue-400 font-semibold mb-2 sm:mb-3">
                  {member.role}
                </p>
                <p className="text-slate-400 text-xs sm:text-sm">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="bg-linear-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-6 sm:mb-8">
            Why Choose NextCart?
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex gap-3 sm:gap-4">
                <div className="text-xl sm:text-2xl shrink-0">✅</div>
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base mb-0.5 sm:mb-1">
                    Trusted by Millions
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Over 10 million monthly active users trust us with their
                    shopping needs
                  </p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <div className="text-xl sm:text-2xl shrink-0">✅</div>
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base mb-0.5 sm:mb-1">
                    Best Prices Guaranteed
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    We compete on price to ensure you always get the best deal
                  </p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <div className="text-xl sm:text-2xl shrink-0">✅</div>
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base mb-0.5 sm:mb-1">
                    Fast Shipping
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Most orders ship within 24 hours to your doorstep
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex gap-3 sm:gap-4">
                <div className="text-xl sm:text-2xl shrink-0">✅</div>
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base mb-0.5 sm:mb-1">
                    Secure Shopping
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Military-grade encryption protects your personal and payment
                    information
                  </p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <div className="text-xl sm:text-2xl shrink-0">✅</div>
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base mb-0.5 sm:mb-1">
                    24/7 Support
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Our dedicated team is always ready to help you anytime
                  </p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4">
                <div className="text-xl sm:text-2xl shrink-0">✅</div>
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base mb-0.5 sm:mb-1">
                    30-Day Guarantee
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Not satisfied? Return it within 30 days, no questions asked
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="bg-linear-to-r from-blue-600 to-cyan-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Join Our Community
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Be part of a global community of millions of satisfied customers.
            Start shopping with NextCart today!
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-4 sm:px-8 py-2.5 sm:py-4 bg-white text-blue-600 hover:bg-slate-100 rounded-lg font-bold text-sm sm:text-base transition transform hover:scale-105"
          >
            Get Started Now →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
