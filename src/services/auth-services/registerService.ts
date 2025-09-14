export const registerUser = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  
  role: string = "STUDENT" // Default role
) => {
  try {
    console.log("Register Service:", {
      username,
      firstName,
      lastName,
      email,
      password,
      role,
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/auths/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          email,
          password,
          role,
        }),
      }
    );

    const data = await response.json(); // parse JSON response
    console.log("Server Response:", data);

    if (!response.ok) {
      console.error("Register failed:", data);
      return { success: false, data };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Register Error:", error);
    return { success: false, error };
  }
};
