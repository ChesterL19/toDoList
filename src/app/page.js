"use client";
import { useState } from "react";

const Home = ()=>{
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");

  return(
    <div className="min-h-screen w-full flex overflow-hidden text-black">

      {/*background*/}
      <div className="w-1/2 h-screen ">
        <img src="https://images.unsplash.com/photo-1604079681864-c6fbd7eb109c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        alt="login" className="w-full h-full object-fill" />
      </div>

      {/*Login */}
      <div className="flex flex-col justify-center items-center bg-white w-1/2 max-h-full gap-10 ">
        <h1 className="font-semibold text-3xl">Sign in Dashboard</h1>

        {/* username*/}
        <div className="flex flex-col w-72 gap-4 mt-4 ">
          <input 
          type="text"
          value={Text}
          placeholder="Username" onChange={(e)=>setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 shadow-sm focus-outline-none rounded-2xl hover:border-amber-400 bg-gray-200/80"
          />

          <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e)=> setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 shadow-sm focus-outline-none rounded-2xl hover:border-amber-400 bg-gray-200/80"/>
          
          <button 
          type="submit" 
          value={SubmitEvent} className="bg-amber-400 p-2 rounded-2xl  hover:bg-amber-500 mt-6">
            Sign In
          </button>
        
          <div className="flex items-center my-8 space-x-2">
            
            <hr className="w-full border-t-1 border-gray-400/50"/>
            <span className="text-xs text-gray-400">or</span>
            <hr className="w-full border-t-1 border-gray-400/50"/>
            
          </div>
          
          <button
          type="submit"
          value={SubmitEvent}
          className="bg-gray-100 p-2 rounded-2xl border border-gray-200 hover:bg-gray-300 text-small">
            Sign in with Google
          </button>

        </div>

      </div>
  </div>
  )

}

export default Home;