"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section with Blue Glass */}
      <header className="relative py-24 flex justify-center items-center">
        {/* Glass Background */}
        <div className="absolute inset-0 bg-blue-600/40 backdrop-blur-md rounded-b-3xl"></div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome to My App
          </h1>
          <p className="text-xl text-white mb-8">
            Join us today and enjoy amazing features built with Next.js!
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => router.push("/register")}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold cursor-pointer hover:bg-gray-100 transition">
              Register
            </button>
            <button
              onClick={() => router.push("/login")}
              className="bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer hover:bg-blue-700 transition">
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto grid md:grid-cols-3 gap-10 text-center px-4">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-4">Fast</h2>
            <p>Next.js ensures blazing-fast performance for your web app.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-4">Secure</h2>
            <p>Implement secure login and registration with ease.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-4">Easy to Use</h2>
            <p>Simple, clean, and responsive design for all devices.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} My App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
