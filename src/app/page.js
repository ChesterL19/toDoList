"use client";

import Login from "./components/Login";
import { useState } from "react";

const Home = ()=>{


  return(
    <div className="min-h-screen w-full flex overflow-hidden text-black">

      {/*background*/}
      <div className="w-1/2 h-screen ">
        <img src="https://images.unsplash.com/photo-1604079681864-c6fbd7eb109c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        alt="login" className="w-full h-full object-fill" />
      </div>

      {/*Login */}
      <div className="flex flex-col justify-center items-center bg-white w-1/2 max-h-full gap-10 ">
        <Login />
      </div>
  </div>
  )

}

export default Home;