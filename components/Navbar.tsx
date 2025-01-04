import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const navItems = [
    {
      name: "dashboard",
      label: "Dashboard",
      icon: "/icons/3dicons-cube-front-color.png",
      href: "/",
    },
    {
      name: "create-new-api",
      label: "Create New API",
      icon: "/icons/3dicons-pencil-front-color.png",
      href: "/create-new-api",
    },
    {
      name: "settings",
      label: "Settings",
      icon: "/icons/3dicons-setting-front-color.png",
      href: "/settings",
    },
  ];
  return (
    <nav className="w-[100px] md:w-[250px] lg:[w-250px] xl:[w-300px] hidden md:flex flex-col h-screen overflow-auto p-3 remove-scrollbar">
      <div>
        <Link href="/" className="font-sans font-extrabold text-4xl">
          apiwrite
        </Link>
      </div>
      <ul className="flex flex-col justify-start items-start gap-10 mt-4">
        {navItems.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className="font-sans font-bold text-xl lg:w-full"
          >
            <li className="flex flex-row items-center gap-4 text-slate-800">
              <Image
                src={item.icon}
                width={40}
                height={40}
                alt={item.name}
                className="filter rounded-full"
              />
              <p className="hidden md:block">{item.label}</p>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
