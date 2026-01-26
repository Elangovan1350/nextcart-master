"use client";

import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Monday to Friday, 9AM - 6PM EST",
    },
    {
      icon: Mail,
      title: "Email",
      details: "support@nextcart.com",
      description: "We reply within 24 hours",
    },
    {
      icon: MapPin,
      title: "Address",
      details: "123 Commerce Street, New York",
      description: "Visit us at our headquarters",
    },
    {
      icon: Clock,
      title: "Live Chat",
      details: "Available 24/7",
      description: "Chat with our support team instantly",
    },
  ];

  const faqs = [
    {
      question: "How long does shipping take?",
      answer:
        "Most orders ship within 24 hours and arrive within 3-7 business days depending on your location.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day money-back guarantee. If you're not satisfied with your purchase, simply return it for a full refund.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes! We ship to over 50 countries worldwide. Shipping costs and delivery times vary by location.",
    },
    {
      question: "How secure is my payment information?",
      answer:
        "We use military-grade SSL encryption and PCI compliance to ensure your payment information is completely secure.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Absolutely! You'll receive a tracking number via email after your order ships. You can track it in real-time on our website.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and various other digital wallets.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      {/* <nav className="bg-slate-950 bg-opacity-80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-white hover:text-blue-400 transition"
          >
            NextCart
          </Link>
          <div className="hidden md:flex gap-8">
            <Link
              href="/"
              className="text-slate-300 hover:text-white transition"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-slate-300 hover:text-white transition"
            >
              About
            </Link>
            <Link href="/contact" className="text-blue-400 font-semibold">
              Contact
            </Link>
          </div>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-slate-300 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 md:py-20 lg:py-32">
        <div className="text-center space-y-3 sm:space-y-4 md:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Get in
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
              {" "}
              Touch
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <div
              key={index}
              className="bg-slate-800 bg-opacity-50 backdrop-blur border border-slate-700 rounded-2xl p-4 sm:p-6 lg:p-8 hover:border-blue-500 transition text-center"
            >
              <div className="flex justify-center mb-3 sm:mb-4">
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-500" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2">
                {info.title}
              </h3>
              <p className="text-blue-400 font-semibold text-xs sm:text-sm lg:text-base mb-2">
                {info.details}
              </p>
              <p className="text-slate-400 text-xs sm:text-sm">
                {info.description}
              </p>
            </div>
          );
        })}
      </section>

      {/* Contact Form & Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
                Send us a Message
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Fill out the form below and we'll get back to you shortly.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(async (data) => {
                console.log("Form submitted:", data);
                setSubmitted(true);
                // Send email logic can be added here
                axios.post("/api/contact", data);
              })}
              className="space-y-4 sm:space-y-6"
            >
              <div>
                <label className="block text-white font-semibold text-sm sm:text-base mb-2">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Your name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 border border-slate-600 rounded-lg text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white font-semibold text-sm sm:text-base mb-2">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="your@email.com"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 border border-slate-600 rounded-lg text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white font-semibold text-sm sm:text-base mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  {...register("subject", { required: true })}
                  required
                  placeholder="How can we help?"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 border border-slate-600 rounded-lg text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white font-semibold text-sm sm:text-base mb-2">
                  Message
                </label>
                <textarea
                  {...register("message", { required: true })}
                  placeholder="Tell us what's on your mind..."
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-700 border border-slate-600 rounded-lg text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition resize-none"
                />
                {errors.message && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition transform hover:scale-105"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                Send Message
              </button>

              {submitted && (
                <div className="p-3 sm:p-4 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg text-green-400 text-xs sm:text-sm">
                  ✓ Thank you! We've received your message and will get back to
                  you soon.
                </div>
              )}
            </form>
          </div>

          {/* Info Box */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 lg:p-10">
              <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-cyan-500 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">
                Why Contact Us?
              </h3>
              <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                <li className="flex gap-2 sm:gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span className="text-slate-300 text-xs sm:text-sm lg:text-base">
                    Get instant answers to your questions
                  </span>
                </li>
                <li className="flex gap-2 sm:gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span className="text-slate-300 text-xs sm:text-sm lg:text-base">
                    Report issues and get quick resolutions
                  </span>
                </li>
                <li className="flex gap-2 sm:gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span className="text-slate-300 text-xs sm:text-sm lg:text-base">
                    Share feedback and suggestions
                  </span>
                </li>
                <li className="flex gap-2 sm:gap-3">
                  <span className="text-blue-400 shrink-0">✓</span>
                  <span className="text-slate-300 text-xs sm:text-sm lg:text-base">
                    Get help with orders and returns
                  </span>
                </li>
                <li className="flex gap-2 sm:gap-3">
                  <span className="text-blue-400 hrink-0">✓</span>
                  <span className="text-slate-300 text-xs sm:text-sm lg:text-base">
                    Connect with our sales team
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-linear-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 sm:p-8 lg:p-10 text-white">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-4">
                Response Time
              </h3>
              <p className="text-xs sm:text-sm lg:text-base mb-2 sm:mb-4">
                We typically respond to all inquiries within 24 hours during
                business days.
              </p>
              <p className="text-xs sm:text-sm lg:text-base text-blue-100">
                For urgent matters, please call us directly at +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-400">
            Find answers to common questions
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-slate-800 bg-opacity-50 backdrop-blur border border-slate-700 rounded-2xl p-4 sm:p-6 hover:border-blue-500 transition cursor-pointer"
            >
              <summary className="flex justify-between items-center font-semibold text-sm sm:text-base text-white hover:text-blue-400 transition list-none">
                <span>{faq.question}</span>
                <span className="transition group-open:rotate-180 shrink-0 ml-2">
                  ▼
                </span>
              </summary>
              <p className="mt-3 sm:mt-4 text-slate-300 text-xs sm:text-sm">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
            Visit Our Office
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-400">
            Stop by our headquarters or meet with us virtually
          </p>
        </div>
        <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 h-64 sm:h-80 lg:h-96">
          <div className="w-full h-full bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center px-4">
            <div className="text-center">
              <MapPin className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-blue-500 mx-auto mb-3 sm:mb-4" />
              <p className="text-white text-base sm:text-lg">
                123 Commerce Street, New York, NY 10001
              </p>
              <p className="text-slate-400 text-xs sm:text-sm mt-2">
                Google Map integration available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="bg-linear-to-r from-blue-600 to-cyan-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Browse our help center for detailed guides and tutorials, or reach
            out to our support team directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <a
              href="#"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 md:py-4 bg-white text-blue-600 hover:bg-slate-100 rounded-lg font-bold text-sm sm:text-base transition transform hover:scale-105"
            >
              Help Center
            </a>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 md:py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 rounded-lg font-bold text-sm sm:text-base transition transform hover:scale-105"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
