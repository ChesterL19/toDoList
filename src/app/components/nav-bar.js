"use client";

import Link from "next/link";

const NavBar = () => {

    return(
        <div className="text-black w-full flex flex-row gap-2 justify-end">
            <Link href="/dashboard">
            <h3 className="font-bold text-sm">Home</h3>
            </Link>
            <h3 className="font-bold text-sm">Account</h3>
        </div>
    )

}

export default NavBar;