"use client";

import Link from "next/link";
import GoogleIcon from "@/public/google.svg";
import AppleIcon from "@/public/apple.svg";

export default function SignIn() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      console.error("Failed to sign in");
      return;
    } else {
      console.log("User signed in successfully");
      e.currentTarget.reset(); // Reset form after successful submission
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-medium">Get Started Now</h1>
      <h2>Enter your Credentials to access your account </h2>

      <form className="mt-12 flex flex-col gap-6 " onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            placeholder="Enter your name"
            type="text"
            id="name"
            className="bg-bgSecondary border-2 border-gray-600 p-1 focus:outline-none focus:border-link rounded-md ml-1"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email address</label>
          <input
            name="email"
            placeholder="Enter your email"
            type="email"
            id="email"
            className="bg-bgSecondary border-2 border-gray-600 p-1 focus:outline-none focus:border-link rounded-md ml-1"
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-end">
            <label htmlFor="password">Password</label>

            {/* this is a placeholder */}
            <Link
              href="/"
              className="text-link text-xs cursor-pointer focus:brightness-120 hover:brightness-120 hover:underline focus:underline"
            >
              forgot password
            </Link>
          </div>
          <input
            name="password"
            type="password"
            id="password"
            placeholder="Enter your password"
            className="bg-bgSecondary border-2 border-gray-600 p-1 focus:outline-none focus:border-link rounded-md ml-1"
          />
        </div>

        <div className="flex items-center">
          <label className="flex items-center cursor-pointer relative">
            <input
              type="checkbox"
              className="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-orange-400 checked:border-orange-400 focus:outline-non focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
              id="rememberMe"
            />
            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </label>

          <label htmlFor="rememberMe" className="ml-2">
            Remember me
          </label>
        </div>

        <button className="bg-accent text-bgSecondary p-2 rounded-md font-semibold cursor-pointer hover:brightness-120 transition-all duration-300">
          Sign in
        </button>

        <div className="flex items-center justify-center">
          <div className="bg-gray-600 h-0.5 w-full"></div>
          <span className="mx-1 text-sm">Or</span>
          <div className="bg-gray-600 h-0.5 w-full"></div>
        </div>

        {/* placeholder for other type of login */}

        <div className="flex items-center justify-between gap-4 ">
          <button className="login-option group">
            <GoogleIcon className="h-6 w-6 inline-block mr-2" />
            <span className="text-sm group-hover:text-accent transition-all duration-300">
              Sign in with Google
            </span>
          </button>

          <button className="login-option group">
            <AppleIcon className="h-6 w-6 inline-block mr-2" />
            <span className="text-sm group-hover:text-accent transition-all duration-300">
              Sign in with Apple
            </span>
          </button>
        </div>

        <div className="text-link cursor-pointer transition-all duration-300 w-full text-center">
          <span className="text-primary!">Have an account? </span>
          <Link href="/login" className="hover:underline focus:underline ">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}
