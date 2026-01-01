"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle, User, Lock, LogIn } from "lucide-react";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const found = users.find(
      (user) => user.userName === userName && user.password === password,
    );

    if (found) {
      localStorage.setItem("currentUser", JSON.stringify(found));
      router.push("/dashboard");
    } else {
      alert("❌ Username or password is incorrect");
    }
  };

  // ... existing code ...
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Logo/Brand Section */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to your account to continue</p>
      </div>

      {/* Form Section */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="space-y-6"
      >
        {/* Username Field */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="username"
              type="text"
              value={userName}
              placeholder="Enter your username"
              onChange={(e) => setUserName(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white text-gray-900 hover:border-gray-400"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 
              focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white text-gray-900 hover:border-gray-400"
              required
            />
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-sky-600 hover:text-sky-800 transition-colors"
            >
              Forgot password?
            </a>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white 
          bg-sky-600 hover:from-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2  transition-all duration-200 transform 
          hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <LogIn className="h-5 w-5 text-emerald-200 group-hover:text-emerald-100 transition-colors" />
          </span>
          Sign in
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
        >
          <Image
            className="h-5 w-5 mr-2"
            src="/google.png"
            alt="Google logo"
            width={20}
            height={20}
          />
          Sign in with Google
        </button>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/create"
              className="font-medium text-sky-600 hover:text-sky-800 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
