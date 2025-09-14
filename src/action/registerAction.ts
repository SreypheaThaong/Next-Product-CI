"use server";
import { registerUser } from "@/services/auth-services/registerService";
import { redirect } from "next/navigation";

export const registerAction = async (formData: FormData) => {
  // Extract values from FormData
  const username = formData.get("username") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = (formData.get("role") as string) || "STUDENT";

  console.log("Register Action Data:", {
    username,
    firstName,
    lastName,
    email,
    password,
    role,
  });

  // Only wrap the registration service in try/catch
  try {
    await registerUser(username, firstName, lastName, email, password, role);
    console.log("Registration successful!");
  } catch (error) {
    console.error("Error during registration:", error);
    return; // Stop here if registration fails
  }

  // Redirect after successful registration
  // Note: do NOT wrap redirect() in try/catch, it's fine if it throws internally
  redirect("/login");
};
