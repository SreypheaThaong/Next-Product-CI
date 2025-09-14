"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // add Eye & EyeOff
import { registerAction } from "@/action/registerAction";

export default function RegisterComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("STUDENT"); // Default role

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-green-100 to-cyan-200">
      {/* Glass Card Container */}
      <div className="bg-white/20 backdrop-blur-lg border border-cyan/40 shadow-xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Create Your Account
        </h2>

        <form className="space-y-5" action={registerAction}>
          <div className="flex gap-4">
            {/* First Name */}
            <div>
              <Label
                htmlFor="firstName"
                className="text-gray-800 flex gap-2 items-center mb-2 text-base">
                <UserRound size={20} /> First Name
              </Label>
              <Input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Your First Name"
                className="bg-white/30 py-2.5 px-4 rounded-lg w-full text-gray-900 backdrop-blur-sm focus:ring-2 focus:ring-green-400"
              />
            </div>
            {/* Last Name */}
            <div>
              <Label
                htmlFor="lastName"
                className="text-gray-800 flex gap-2 items-center mb-2 text-base">
                <UserRound size={20} /> Last Name
              </Label>
              <Input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Your Last Name"
                className="bg-white/30 py-2.5 px-4 rounded-lg w-full text-gray-900 backdrop-blur-sm focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <Label
              htmlFor="username"
              className="text-gray-800 flex gap-2 items-center mb-2 text-base">
              <UserRound size={20} /> Username
            </Label>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              className="bg-white/30 py-2.5 px-4 rounded-lg w-full text-gray-900 backdrop-blur-sm focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Role Selection */}
          <div>
            <Label
              htmlFor="role"
              className="text-gray-800 flex gap-2 items-center mb-2 text-base">
              Role
            </Label>
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-white/30 py-2.5 px-4 rounded-lg w-full text-gray-900 backdrop-blur-sm focus:ring-2 focus:ring-blue-400">
              <option value="STUDENT">STUDENT</option>
              <option value="TEACHER">TEACHER</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <Label
              htmlFor="email"
              className="text-gray-800 flex gap-2 items-center mb-2 text-base">
              <Mail size={20} /> Email
            </Label>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="bg-white/30 py-2.5 px-4 rounded-lg w-full text-gray-900 backdrop-blur-sm focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Password */}
          <div>
            <Label
              htmlFor="password"
              className="text-gray-800 flex gap-2 items-center mb-2 text-base">
              <KeyRound size={20} /> Password
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="bg-white/30 py-2.5 px-4 rounded-lg w-full text-gray-900 
                 backdrop-blur-sm focus:ring-2 focus:ring-green-400 pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800 cursor-pointer">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Sign Up Button */}
          <Button
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2.5 rounded-lg font-semibold"
            type="submit">
            Sign Up
          </Button>

          {/* Already have an account */}
          <div className="text-center text-sm text-gray-800">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-600 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
