"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Create = () =>{
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const isFormValid = fullName && email && userName && password;
    const handleCreate = () => {
        const newUser = {
            fullName,
            email,
            userName,
            password,
        };



        let users = JSON.parse(localStorage.getItem("users")) || [];

        const alreadyExists = users.find(
            (u) => u.email === email || u.userName === userName
        );
        

        if (alreadyExists){
            alert("Email or username already in use .");
            return;
        }

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Account Created!");
        router.push("/");

        
    }

    return(

        <div>
            <div className="min-h-screen w-full flex overflow-hidden text-black">

                {/*background*/}
                <div className="w-1/2 h-screen ">
                    <img src="https://images.unsplash.com/photo-1604079681864-c6fbd7eb109c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="login" className="w-full h-full object-fill" />
                </div>

                {/*Login */}
                <div className="flex flex-col justify-center items-center bg-white w-1/2 max-h-full gap-10 ">

                    <div className="flex flex-col w-72 gap-4 mt-4 ">

                        <h1 className="font-bold text-2xl mb-4 text-center">Create Account</h1>

                        <input 
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 shadow-sm focus-outline-none rounded-2xl hover:border-amber-400 bg-gray-100/80"
                        />

                        <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 shadow-sm focus-outline-none rounded-2xl hover:border-amber-400 bg-gray-100/80"
                        />
                        
                        <input
                        type="username"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 shadow-sm focus-outline-none rounded-2xl hover:border-amber-400 bg-gray-100/80"
                        />

                        <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 shadow-sm focus-outline-none rounded-2xl hover:border-amber-400 bg-gray-100/80"
                        />

                        <button
                        onClick={handleCreate}
                        className={` text-white px-4 py-2 rounded-2xl  mt-4 w-full ${isFormValid ? "bg-amber-500 text-white hover-amber-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
                           Create Account 
                        </button>

                        
                    
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Create;