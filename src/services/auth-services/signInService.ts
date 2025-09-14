import { User } from "@/app/types/type";

export const signInService = async (user: User) => {
  const userPayload = {
    identifier: user.identifier.trim(),
    password: user.password.trim(),
  };
  console.log("SignIn Service Payload:", userPayload);
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/auths/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userPayload),
      }
    );

    // --- CRITICAL ADDITION ---
    // Check if the HTTP response status is OK (200-299 range)
    if (!req.ok) {
      // If the response is not OK (e.g., 401, 400, 500), it means authentication failed
      const errorResponse = await req
        .json()
        .catch(() => ({ message: "Unknown API error" }));
      console.error(
        `Authentication API responded with status ${req.status}:`,
        errorResponse.message || errorResponse
      );
      return null; // Return null to indicate authentication failure to NextAuth
    }

    // Only parse and return data if the request was successful
    const res = await req.json();

    // ensure res.data is a valid user object
    if (!res?.data) {
      // console.error("API returned success status but no user data found.", res);
      return null;
    }

    return res.data; // user object
  } catch (error) {
    return null; // Ensure null is returned on any service-level error
  }
};
