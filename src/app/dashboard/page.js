"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/nav-bar";
import SideBar from "../components/side-bar";
import { Check, Folder, Target, Flame } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [dailyQuote, setDailyQuote] = useState({
    text: "Loading...",
    author: "Loading...",
    date: null,
  });

  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const fetchDailyQuote = async () => {
      try {
        const today = new Date().toDateString();
        if (dailyQuote.date === today) {
          return;
        }
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        setDailyQuote({
          text: data.content,
          author: data.author,
          date: today,
        });
      } catch (error) {
        console.error("Error fetching quote:", error);
        setDailyQuote({
          text: "The way to get started is to quit talking and begin doing.",
          author: "Walt Disney",
        });
      }
    };

    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!storedUser) {
      router.push("/"); // not logged in, go to login
    } else {
      setUser(storedUser);
      fetchDailyQuote();
    }
  }, [router, dailyQuote.date]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex w-full min-h-screen bg-stone-100 text-black">
      <div className="w-64 bg-white h-screen sticky top-0 overflow-y-auto">
        <SideBar />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4">
          <NavBar />
        </div>

        <div className="flex-1 p-8 bg-gray-50 h-screen overflow-y-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className=" flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back,{" "}
                  {user.fullName.charAt(0).toUpperCase() +
                    user.fullName.slice(1)}
                  !
                </h1>
                <p className="text-gray-500">Today is {date}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-500">
                      Ready to be productive?
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Task Today Card */}
            <div className="bg-emerald-100/50 rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Check className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-sm text-emerald-600 font-medium">5</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                Tasks Today
              </h3>
              <p className="text-gray-600 text-sm">Ready to tackle</p>
            </div>

            {/* Completed Card */}
            <div className="bg-blue-100/50 rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Folder className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm text-blue-600 font-medium">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                Completed
              </h3>
              <p className="text-gray-600 text-sm">Great progress</p>
            </div>

            {/* Active Projects Card */}
            <div className="bg-purple-100/50 rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm text-purple-600 font-medium">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                Active Projects
              </h3>
              <p className="text-gray-600 text-sm">In progress</p>
            </div>

            {/* Day Streak Card */}
            <div className="bg-orange-100/50 rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Flame className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-sm text-orange-600 font-medium">7</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                Day Streak
              </h3>
              <p className="text-gray-600 text-sm">Keep it up!</p>
            </div>
          </div>

          {/* Heatmap and Quote Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Activity Heatmap - Left Side */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Activity Heatmap
                </h3>
                <span className="text-sm text-gray-600">Last 90 days</span>
              </div>

              <div className="grid grid-cols-13 gap-0.5 mb-4">
                {Array.from({ length: 91 }, (_, i) => {
                  const intensity = Math.floor(Math.random() * 5);
                  return (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-sm ${
                        intensity === 0
                          ? "bg-gray-200"
                          : intensity === 1
                            ? "bg-emerald-100"
                            : intensity === 2
                              ? "bg-emerald-200"
                              : intensity === 3
                                ? "bg-emerald-300"
                                : "bg-emerald-400"
                      }`}
                      title={`${intensity} completed tasks`}
                    ></div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Less</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`w-3 h-3 rounded-sm ${
                        level === 0
                          ? "bg-gray-200"
                          : level === 1
                            ? "bg-emerald-200"
                            : level === 2
                              ? "bg-emerald-300"
                              : level === 3
                                ? "bg-emerald-400"
                                : "bg-emerald-500"
                      }`}
                    ></div>
                  ))}
                </div>
                <span className="text-gray-500">More</span>
              </div>
            </div>

            {/* Daily Quote - Right Side */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-center">
              <div className="text-center">
                <blockquote className="text-lg italic text-gray-700 mb-3">
                  &quot;{dailyQuote.text}&quot;
                </blockquote>
                <cite className="text-sm text-gray-500">
                  — {dailyQuote.author}
                </cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
