
import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState("/");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLinkClick = (path) => {
        setActiveLink(path);
        setMenuOpen(false);
    };

    const navItems = ["Donors", "Recipients", "Volunteers"];

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-500 navbar bg-white text-gray-800 ${scrolled ? "shadow-2xl py-2" : "shadow-md py-3"
            }`}
        >
            <div className="flex items-center justify-between px-6 md:px-14 relative">
                {/* Animated underline decoration */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700"></div>

                {/* Logo */}
                <div className="flex items-center gap-3 group">
                    <Link to="/" className="flex items-center relative" onClick={() => handleLinkClick("/")}>
                        {/* Glow effect behind logo */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>

                        {/* Logo placeholder - replace with actual logo */}
                        <div className="relative h-[50px] w-[55px] rounded-full overflow-hidden ring-2 ring-green-500/20 group-hover:ring-green-500/60 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 flex items-center justify-center">
                                <span className="text-3xl">🍲</span>
                            </div>
                        </div>

                        <span className="font-semibold text-lg ml-2 relative">
                            Food & Hunger
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-500"></span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center gap-2 font-medium">
                    <li>
                        <Link
                            to="/"
                            onClick={() => handleLinkClick("/")}
                            className={`relative px-5 py-2.5 rounded-xl hover:text-green-600 transition-all duration-300 group overflow-hidden ${activeLink === "/" ? "text-green-600" : ""
                                }`}
                        >
                            <span className="absolute inset-0 bg-green-50 dark:bg-green-900/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></span>
                            <span className="relative z-10">Home</span>
                            <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full transition-all duration-300 ${activeLink === "/" ? "opacity-100 scale-100" : "opacity-0 scale-0"
                                }`}></span>
                        </Link>
                        <Link
                            to="/about"
                            onClick={() => handleLinkClick("about")}
                            className={`relative px-5 py-2.5 rounded-xl hover:text-green-600 transition-all duration-300 group overflow-hidden ${activeLink === "about" ? "text-green-600" : ""
                                }`}
                        >
                            <span className="absolute inset-0 bg-green-50 dark:bg-green-900/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></span>
                            <span className="relative z-10">About</span>
                            <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full transition-all duration-300 ${activeLink === "about" ? "opacity-100 scale-100" : "opacity-0 scale-0"
                                }`}></span>
                        </Link>
                    </li>
                    {navItems.map((item) => {
                        const path = `/${item.toLowerCase()}`;
                        return (
                            <li key={item}>
                                <Link
                                    to={`${path}/dashboard`}
                                    onClick={() => handleLinkClick(path)}
                                    className={`relative px-5 py-2.5 rounded-xl hover:text-green-600 transition-all duration-300 group overflow-hidden ${activeLink === path ? "text-green-600" : ""
                                        }`}
                                >
                                    <span className="absolute inset-0 bg-green-50 dark:bg-green-900/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></span>
                                    <span className="relative z-10">{item}</span>
                                    <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full transition-all duration-300 ${activeLink === path ? "opacity-100 scale-100" : "opacity-0 scale-0"
                                        }`}></span>
                                </Link>
                            </li>

                        );
                    })}
                </ul>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg relative group transition-all duration-300 hover:scale-110"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <span className="absolute inset-0 rounded-lg bg-gray-100 dark:bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {menuOpen ? (
                            <XMarkIcon className="w-7 h-7 text-gray-800 relative z-10 transform rotate-0 group-hover:rotate-90 transition-transform duration-300" />
                        ) : (
                            <Bars3Icon className="w-7 h-7 text-gray-800 relative z-10" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="absolute top-full left-0 w-full flex flex-col items-center gap-3 py-6 shadow-md backdrop-blur-sm">
                    {/* Decorative gradient line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>

                    <Link
                        to="/"
                        onClick={() => handleLinkClick("/")}
                        className={`relative hover:text-green-600 transition-all duration-300 px-8 py-2.5 rounded-xl group overflow-hidden w-5/6 text-center ${activeLink === "/" ? "text-green-600" : ""
                            }`}
                        style={{ animationDelay: '0ms' }}
                    >
                        <span className="absolute inset-0 bg-green-50 dark:bg-green-900/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-xl origin-left"></span>
                        <span className="relative z-10">Home</span>
                    </Link>

                    {navItems.map((item, index) => {
                        const path = `/${item.toLowerCase()}`;
                        return (
                            <Link
                                key={item}
                                to={path}
                                onClick={() => handleLinkClick(path)}
                                className={`relative text-gray-800 hover:text-green-600 transition-all duration-300 px-8 py-2.5 rounded-xl group overflow-hidden w-5/6 text-center ${activeLink === path ? "text-green-600" : ""
                                    }`}
                                style={{
                                    animation: menuOpen ? `slideInRight 0.4s ease-out ${(index + 1) * 80}ms forwards` : 'none',
                                    opacity: menuOpen ? 1 : 0
                                }}
                            >
                                <span className="absolute inset-0 bg-green-50 dark:bg-green-900/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-xl origin-left"></span>
                                <span className="relative z-10">{item}</span>
                            </Link>
                        );
                    })}

                    <div className="flex flex-col gap-3 hidden">
                        <Link to="/auth/join_us" className="px-5 py-2 bg-green-600 text-white rounded-lg">
                            Join Us
                        </Link>
                        <Link to="/auth/register" className="px-5 py-2 border rounded-lg ">
                            Register
                        </Link>
                        <Link to="/auth/login" className="px-5 py-2 border rounded-lg ">
                            Login
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                /* Smooth scale animation for hover effects */
                @keyframes pulse-subtle {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.05);
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;