import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between items-center sticky top-0 gap-4 bg-white z-20 h-[70px] shadow-md border-b-2 rounded-md px-4">
      <div>
        <Link href="/" className="font-sans font-bold text-xl">
          ApiWrite
        </Link>
      </div>
      <div className="flex flex-row justify-end items-center gap-10">
        <Link href="/" className="font-sans font-bold text-xl">
          Dashboard
        </Link>
        <Link href="/create-new-api" className="font-sans font-bold text-xl">
          Create New API
        </Link>
        <Link href="/my-apis" className="font-sans font-bold text-xl">
          My APIs
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
