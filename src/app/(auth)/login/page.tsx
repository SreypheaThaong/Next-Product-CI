"use client";
import { signInAction } from "@/action/signInAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Mail, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-200 via-cyan-300 to-cyan-400">
      {/* Glass Card */}
      <div className="bg-white/30 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-black text-center mb-6">
          Login
        </h2>
        <form
          action={async (formData: FormData) => {
            await signInAction(formData);
          }}
          className="space-y-6">
          {/* Email */}
          <div>
            <Label
              htmlFor="identifier"
              className="text-black flex gap-2 items-start mb-2 text-base">
              <Mail size={20} /> Email
            </Label>

            <Input
              name="identifier"
              type="input"
              placeholder="Please type your email"
              className="bg-white/20 py-2.5 px-4 rounded-lg w-full text-black placeholder-black/60"
            />
          </div>

          {/* Password */}
          <div>
            <Label
              htmlFor="password"
              className="text-black flex gap-2 items-start mb-2 text-base">
              <KeyRound size={20} /> Password
            </Label>

            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Please type your password"
                className="bg-white/20 py-2.5 px-4 rounded-lg w-full text-black placeholder-black/60 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/60">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            className="text-base cursor-pointer bg-cyan-600 hover:bg-cyan-700 text-white py-2.5 rounded-lg w-full font-bold">
            Login
          </Button>

          {/* Underline & Signup Link */}
          <div>
            <div className="border-b border-black/40"></div>
            <div className="capitalize text-right mt-2 font-normal text-black/90">
              create new account?{" "}
              <Link
                href={"/register"}
                className="hover:text-cyan-600 hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
