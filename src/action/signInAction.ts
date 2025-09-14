"use server";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

type SignInResult = {
  success?: boolean;
  message?: string;
};

export const signInAction = async (formData: FormData): Promise<SignInResult> => {
  try {
    const identifier = formData.get("identifier")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    console.log("Starting sign-in action with Form Data:", { identifier, password });

    // Explicitly call signIn with credentials provider
    console.log("Calling signIn with credentials...");
    const result = await signIn("credentials", {
      identifier,
      password,
      redirect: false, // Manual redirect control
    });

    console.log("Sign-in result:", result);

    if (result?.error) {
      console.log("Sign-in failed due to:", result.error);
      return {
        success: false,
        message: result.error,
      };
    }

    console.log("Successful sign-in");
    redirect("/home");
    return { success: true }; // Unreachable due to redirect
  } catch (error) {
    console.error("Error during sign-in action:", error);
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
};