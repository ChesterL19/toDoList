"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // ✅ Get the saved users from localStorage (if any)
    const storedUsers = localStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    // ✅ Try to find a matching user
    const found = users.find(
      (user) => user.userName === userName && user.password === password
    );

    if (found) {
      // ✅ Save current user info so other pages can use it
      localStorage.setItem("currentUser", JSON.stringify(found));
      alert("✅ Login successful!");
      router.push("/dashboard"); // ✅ make sure this route exists
    } else {
      alert("❌ Username or password is incorrect");
    }
  };

  return (
    <div>
      <h1 className="font-semibold text-3xl mb-16">Log in Dashboard</h1>

      <div className="flex flex-col w-72 gap-4 mt-4">
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 shadow-sm focus-outline-none rounded-2xl hover:border-amber-400 bg-gray-100/80"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 shadow-sm focus-outline-none rounded-2xl hover:border-amber-400 bg-gray-100/80"
        />

        <button
          onClick={handleLogin}
          className="bg-amber-400 p-2 rounded-2xl hover:bg-amber-500 mt-6 text-white"
        >
          Log In
        </button>

        <p className="text-sm mt-3 text-center">
          Need an account?{" "}
          <Link
            href="/create"
            className="text-blue-500 underline hover:text-blue-700"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
