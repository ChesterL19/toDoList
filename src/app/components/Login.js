"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () =>{
    const [userName, setUserName] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();
    
    const handleLogin = () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const found = users.find(
            (user) => user.userName === userName && user.password === password
        );

        if (found){
            localStorage.setItem("currentUser", JSON.stringify(found));
            router.push("/dashboard");
        }else{
            alert("❌ Username or password is incorrect");
        }
    }    
    
    return(
        <div>
          <h1 className="font-semibold text-3xl mb-16">Log in Dashboard</h1>

{/* username*/}
          <div className="flex flex-col w-72 gap-4 mt-4 ">
            <input 
            type="text"
            value={userName}
            placeholder="Username" onChange={(e)=>setUserName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 shadow-sm focus-outline-none rounded-2xl hover:border-amber-400 bg-gray-100/80"
            />

            <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e)=> setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 shadow-sm focus-outline-none rounded-2xl hover:border-amber-400 bg-gray-100/80"/>
                
           <button 
            onClick={handleLogin}
            className="bg-amber-400 p-2 rounded-2xl  hover:bg-amber-500 mt-6">
                Log In
            </button>

            <p className="text-sm  mt-3  text-center">Need an account? <Link href="/create" className="text-blue-500 underline hover:text-blue-700">Sign in</Link></p>

            <div className="flex items-center my-8 space-x-2">
              <hr className="w-full border-t-1 border-gray-400/50"/>
              <span className="text-xs text-gray-400">or</span>
              <hr className="w-full border-t-1 border-gray-400/50"/>
                
            </div>
            
            <button
            onClick={handleLogin}
            className=" p-2 rounded-2xl border border-gray-300 hover:bg-gray-300 text-small">
              Log in with Google
            </button>



          </div>
        </div>
    )

}

export default Login; 