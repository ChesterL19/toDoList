"use client";

import Link from "next/link";
import { useState } from "react";

function Task({}){

}

const SideBar = () =>{
    const [isPressed, setIsPressed] = useState(false);
    
    return(
        <div className="flex flex-col sticky top-0 bg-white px-5 p-2 ml-2 w-72 min-h-screen rounded text-black text-center">
            <ol>
                <li className="m-2">
                    <div className="flex  items-center w-80">
                        <input type="checkbox"
                        onClick={()=>(setIsPressed(!isPressed))}/>
                        <p className="text-xs font-light">📖 Daily</p>
                    </div>
                </li>

                <li className="m-2">
                    <div className="flex  items-center w-80">
                        <input type="checkbox"
                        onClick={()=>(setIsPressed(!isPressed))}/>
                        <p className="text-xs font-light">📖 School</p>
                    </div>
                </li>

                <li className="m-2">
                    <div className="flex  items-center w-80 ">
                        <input type="checkbox"
                        onClick={()=>(setIsPressed(!isPressed))}/>
                        <p className="text-xs font-light">💪 Gym</p>
                    </div>
                </li>
            </ol>
        </div>
    )

}

export default SideBar;     