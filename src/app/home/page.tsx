"use client";
import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-green-100 to-cyan-200">
      {/* Glass Card Container */}
      <div className="bg-white/20 backdrop-blur-lg border border-cyan/40 shadow-xl rounded-2xl w-full max-w-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Your App
        </h1>
        <p className="text-gray-700 mb-6">
          Please login or register to access your dashboard.
        </p>

        {/* Buttons for Login and Register */}
        <div className="flex justify-center gap-4">
          <Link href="/login">
            <button className="px-6 py-2.5 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="px-6 py-2.5 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition">
              Register
            </button>
          </Link>
        </div>

        {/* Optional welcome text */}
        <p className="mt-6 text-gray-600 text-sm">
          Enjoy the smooth glass UI experience!
        </p>
      </div>
    </div>
  );
}
