"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!storedUser) {
      router.push("/"); // not logged in, go to login
    } else {
      setUser(storedUser);
    }
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome back, {user.fullName}!</h1>
      <p>Email: {user.email}</p>
      <p>Username: {user.userName}</p>

      <button
        onClick={() => {
          localStorage.removeItem("currentUser");
          router.push("/");
        }}
        className="mt-4 text-red-500 underline"
      >
        Log out
      </button>
    </div>
  );
}
