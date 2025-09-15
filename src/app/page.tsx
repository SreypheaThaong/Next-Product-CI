"use client";

import { useRouter } from "next/navigation";
import { Zap, Shield, Smartphone } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const features = [
    {
      title: "Fast",
      desc: "Next.js ensures blazing-fast performance for your web app.",
      icon: <Zap className="w-12 h-12 text-blue-500 mb-4 mx-auto" />,
    },
    {
      title: "Secure",
      desc: "Implement secure login and registration with ease.",
      icon: <Shield className="w-12 h-12 text-green-500 mb-4 mx-auto" />,
    },
    {
      title: "Easy to Use",
      desc: "Simple, clean, and responsive design for all devices.",
      icon: <Smartphone className="w-12 h-12 text-purple-500 mb-4 mx-auto" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <header className="relative py-32 flex justify-center items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-indigo-500/30 backdrop-blur-lg rounded-b-3xl shadow-lg"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200 drop-shadow-lg">
            Welcome to My App
          </h1>
          <p className="text-xl md:text-2xl text-white mb-10 drop-shadow-md">
            Join us today and enjoy amazing features built with Next.js &
            Tailwind CSS
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <button
              onClick={() => router.push("/register")}
              className="px-8 py-3 rounded-xl bg-white/90 text-blue-700 font-bold shadow-lg hover:bg-white hover:scale-105 transition-transform duration-300 flex items-center gap-2">
              Register
            </button>
            <button
              onClick={() => router.push("/login")}
              className="px-8 py-3 rounded-xl bg-blue-700/90 text-white font-bold shadow-lg hover:bg-blue-600 hover:scale-105 transition-transform duration-300 flex items-center gap-2">
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto grid md:grid-cols-3 gap-10 px-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 hover:-translate-y-2 transform text-center">
              {feature.icon}
              <h2 className="text-2xl font-bold mb-2">{feature.title}</h2>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="container mx-auto text-center text-gray-300">
          &copy; {new Date().getFullYear()} My App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
