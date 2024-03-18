import Link from "next/link";
import React, { useRef } from 'react';
import { NavbarName, logo, navLinks } from "@/config";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";

export default function Navbar() {
    const [theme, setTheme] = useState(null);
    const menuRef = useRef(null);

    const toggle = (ref) => {
        if (ref.current.style.display === 'block') { ref.current.style.display = 'none'; }
        else { ref.current.style.display = 'block'; }
    };



    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) { setTheme('dark'); }
        else { setTheme('light'); }
    }, [])


    useEffect(() => {
        if (theme === "dark") { document.documentElement.classList.add("dark"); }
        else { document.documentElement.classList.remove("dark"); }
    }, [theme]);


    const handleThemeSwitch = () => { setTheme(theme === "dark" ? "light" : "dark"); };


    return (

        <nav className="md:pb-3 md:pt-3 bg-[#edf2f7] dark:bg-[black] dark:text-[whitesmoke]" >
            <div className="container mx-auto md:flex items-center justify-center md:justify-between max-w-[1200px]">
                <div className="flex items-center md:space-x-4 justify-between">
                    <div className="flex items-center">
                        {logo}
                        <span className=" text-lg font-bold tracking-wider text-[21px] md:text-[24px]"><Link href="/">{NavbarName}</Link></span>

                    </div>
                    <div className="flex gap-5 items-center">
                        <li className="cursor-pointer block md:hidden" onClick={handleThemeSwitch}>{theme === "dark" ? <BsFillSunFill size={26} /> : <FaMoon size={26} />}</li>
                        <span onClick={() => toggle(menuRef)} className="md:hidden text-[22px] font-extrabold mr-4">☰</span>
                    </div>
                </div>

                <div className="md:pb-0  md:mt-0  md:bg-transparent ">
                    <ul id="menu" ref={menuRef} className="md:flex md:space-x-10 md:pb-0 pb-4 items-center font-bold  text-center leading-[3] hidden">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <Link href={link.href} className="hover:text-[#a5a5f3] hover:underline">{link.text}</Link>
                            </li>
                        ))}
                        <li className="cursor-pointer hidden md:block hover:scale-110 transition-transform" onClick={handleThemeSwitch}>{theme === "dark" ? <BsFillSunFill size={26} /> : <FaMoon size={26} />}</li>
                    </ul>
                </div>
            </div>
        </nav>


    );
}
