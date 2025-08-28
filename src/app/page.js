"use client";

import Login from "./components/Login";
import { useState } from "react";

const Home = () => {
  return (
    <div className="h-screen w-full flex flex-col  overflow-hidden text-black">
      {/*Login */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <Login />
      </div>
    </div>
  );
};

export default Home;
