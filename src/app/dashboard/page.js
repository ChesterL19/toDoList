"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/nav-bar";
import SideBar from "../components/side-bar";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [task, setTask] = useState({});
  const [isPressed, setIsPressed] = useState(false);

  const [demoTasks, setDemoTasks] = useState([
    {
      id: 1,
      title: "Read a book",
      time: "8:00–9:00",
      completed: false,
    },
    {
      id: 2,
      title: "Workout",
      time: "10:00–11:30",
      completed: false,
    },
    {
      id: 3,
      title: "Workout",
      time: "10:00–11:30",
      completed: false,
    },
    {
      id: 4,
      title: "Study",
      time: "12:00–13:30",
      completed: false,
    },
  ]);

  const toggleTask = (id) => {
    setDemoTasks(
      demoTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
    <div className="flex w-full min-h-screen bg-stone-100 text-black">
      <div className="w-64 bg-white min-h-screen">
        <SideBar />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4">
          <NavBar />
        </div>

        <div className="flex-1 p-6">
          <div className="flex flex-col items-center gap-6">
            {/* Welcome Section */}
            <div className="flex flex-row flex-wrap w-72 gap-2 md:text-base">
              <h1 className="font-bold">Welcome back, {user.fullName}!</h1>
              <p className="text-xs text-gray-500">Today is {date}</p>
              <div>
                <select className="text-xs text-gray-800 bg-stone-200 rounded-lg p-2">
                  <option>Today</option>
                  <option>Yesterday</option>
                  <option>A Week ago</option>
                </select>
              </div>
            </div>

            {/* Tasks List */}
            <div className="w-full flex justify-center">
              <ol className="space-y-2">
                {demoTasks.map((task) => (
                  <li key={task.id} className="gap-2">
                    <div className="flex justify-between items-center w-80 bg-white px-5 rounded shadow-sm p-2 border border-gray-200">
                      <div className="flex flex-row gap-4">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                        />
                        <p className="text-xs font-light">{task.title}</p>
                      </div>
                      <p className="text-xs text-gray-300">{task.time}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
