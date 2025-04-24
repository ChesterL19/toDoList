"use client";

import Login from "./components/Login";
import { useState } from "react";

const Home = ()=>{


  return(
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden text-black">

      {/*background*/}
      <div className="hidden md:flex w-1/2 h-screen relative ">
        <img src="https://images.unsplash.com/photo-1604079681864-c6fbd7eb109c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        alt="login" className="w-full h-full object-fill" />
        
        <img src="/Allura.png" alt="illus" className="absolute bottom-48 right-44 w-80"/>
      </div>

      {/*Login */}
      <div className="flex md:w-1/2 h-full justify-center items-center bg-white">
        <Login />
      </div>
  </div>
  )

}

export default Home;