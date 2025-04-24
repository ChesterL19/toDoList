"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/nav-bar";
import SideBar from "../components/side-bar";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [task,setTask] = useState({});
  const [isPressed, setIsPressed] = useState(false);
  

  const date = new Date().toLocaleDateString("en-US",{
      weekday: "long",
      year:"numeric",
      month:"long",
      day:"numeric"
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
    <div className="flex  flex-col  w-full min-h-screen bg-stone-100">
      <div className="p-4">
        <NavBar />
      </div>
      <div className="flex flex-row">
        <div>
          <SideBar />
        </div>

        <div className=" md:flex flex-col w-full justify-center items-center h-80 ml-5 mt-9 p-6 text-black gap-24">
          
          <div className="flex flex-row flex-wrap w-72 gap-2 md:text-base">
            <h1 className=" font-bold ">Welcome back, {user.fullName}!</h1>
            <p className="text-xs text-gray-500">Today is {date}</p>
            
            <div>
              <select className="text-xs text-gray-800 bg-stone-200 rounded-lg p-2">
                <option>Today</option>
                <option>Yesterday</option>
                <option>A Week ago</option>
              </select>

            </div>  
          </div>
  
          <div className="w-full flex justify-center">
            <ol className="space-y-2">
              <li className="gap-2">
                <div className="flex justify-between items-center w-80 bg-white px-5 rounded shadow-2xs p-2">
                  <div className="flex flex-row gap-4">
                    <input type="checkbox"
                    onClick={()=>(setIsPressed(!isPressed))}/>
                    <p className="text-xs font-light">📓 Read a book</p>
                  </div>
                  <p className="text-xs text-gray-300">8:00–9:00</p>
                </div>
              </li>

              <li className="gap-2">
                <div className="flex justify-between items-center w-80 bg-white px-5 rounded shadow-2xs p-2">
                  <div className="flex flex-row gap-4">
                    <input type="checkbox"
                    onClick={()=>(setIsPressed(!isPressed))}/>
                    <p className="text-xs font-light">💪 Workout</p>
                  </div>
                  <p className="text-xs text-gray-300">10:00–11:30</p>
                </div>
              </li>

              <li className="gap-2">
                <div className="flex justify-between items-center w-80 bg-white px-5 rounded shadow-2xs p-2">
                  <div className="flex flex-row gap-4">
                    <input type="checkbox"
                    onClick={()=>(setIsPressed(!isPressed))}/>
                    <p className="text-xs font-light">💪 Workout</p>
                  </div>
                  <p className="text-xs text-gray-300">10:00–11:30</p>
                </div>
              </li>

              <li className="gap-2">
                <div className="flex justify-between items-center w-80 bg-white px-5 rounded shadow-2xs p-2">
                  <div className="flex flex-row gap-4">
                    <input type="checkbox"
                    onClick={()=>(setIsPressed(!isPressed))}/>
                    <p className="text-xs font-light">📖 Study</p>
                  </div>
                  <p className="text-xs text-gray-300">120:00–13:30</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
