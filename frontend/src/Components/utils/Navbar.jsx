import React, { useState, useEffect } from "react";
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
    const getInitialTheme = () => {
        if (typeof window !== "undefined" && localStorage.getItem("theme")) {
            return localStorage.getItem("theme");
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    };

    const [theme, setTheme] = useState(getInitialTheme);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") root.classList.add("dark");
        else root.classList.remove("dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

    return (
        <nav className=" sticky top-0 z-50 flex items-center justify-between px-6 md:px-14 py-3 shadow-md  transition-all duration-300 navbar sticky">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <a href="/" className="flex items-center">
                    <img src={logo} alt="logo" className="h-[50px] w-[55px] rounded-full" />
                    <span className="font-semibold text-lg ml-2 ">Food & Hunger</span>
                </a>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-8 font-medium">
                {["Home", "About", "Donors", "Recipients", "Volunteers"].map((item) => (
                    <li key={item}>
                        <a
                            href={`/${item.toLowerCase()}`}
                            className="hover:text-green-600 transition-colors"
                        >
                            {item}
                        </a>
                    </li>
                ))}
            </ul>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                <button
                    aria-label="Toggle Theme"
                    onClick={toggleTheme}
                    className="rounded-full p-2 transition"
                >
                    {theme === "dark" ? (
                        <SunIcon className="w-6 h-6 text-yellow-400" />
                    ) : (
                        <MoonIcon className="w-6 h-6" />
                    )}
                </button>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle Menu"
                >
                    {menuOpen ? (
                        <XMarkIcon className="w-7 h-7 text-gray-800 " />
                    ) : (
                        <Bars3Icon className="w-7 h-7 text-gray-800 " />
                    )}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className=" absolute top-16 left-0 w-full flex flex-col items-center gap-5 py-6 shadow-md md:hidden transition-all">
                    {["Home", "About", "Donors", "Recipients", "Volunteers"].map((item) => (
                        <a
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            onClick={() => setMenuOpen(false)}
                            className="text-gray-800  hover:text-green-600"
                        >
                            {item}
                        </a>
                    ))}
                    <div className="flex flex-col gap-3 hidden">
                        <a href="/auth/join_us" className="px-5 py-2 bg-green-600 text-white rounded-lg">
                            Join Us
                        </a>
                        <a href="/auth/register" className="px-5 py-2 border rounded-lg ">
                            Register
                        </a>
                        <a href="/auth/login" className="px-5 py-2 border rounded-lg ">
                            Login
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
