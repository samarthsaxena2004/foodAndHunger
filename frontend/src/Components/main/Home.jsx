// /*  */import React, { useState, useEffect } from "react";
import { ArrowRight, Users, Heart, HandHeart, TrendingUp, Award, Clock, Sparkles, Star, Zap } from "lucide-react";
import DonorFoodListing from "../donor/DonorFoodListingForm";
import DonorFoodList from "../donor/DonorFoodList";
import RecipientListing from "../recipient/RecipientListing";
import { useEffect, useState } from "react";


const images = [
    banner1,
    banner2,
    banner3,
    banner4,
];

const Home = () => {
    const [index, setIndex] = useState(0);
    const [isVisible, setIsVisible] = useState({});
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.1 }
        );
        document.querySelectorAll('[id^="section-"]').forEach((el) => {
            observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const recipients = [
        {
            icon: <Users className="w-12 h-12 text-green-600" />,
            title: "Orphanages",
            definition: "Supporting children in need with nutritious meals and creating brighter futures for orphaned children across communities.",
            color: "green"
        },
        {
            icon: <Heart className="w-12 h-12 text-red-500" />,
            title: "Old Age Homes",
            definition: "Ensuring our elderly receive proper nutrition and care, honoring those who have given so much to society.",
            color: "red"
        },
        {
            icon: <HandHeart className="w-12 h-12 text-blue-600" />,
            title: "Homeless Shelters",
            definition: "Providing warm meals to those without homes, offering dignity and hope through every plate served.",
            color: "blue"
        }
    ];

    const topDonors = [
        { name: "Sarah Johnson", donated: "5,230 meals", avatar: "SJ", rank: 1 },
        { name: "Michael Chen", donated: "4,890 meals", avatar: "MC", rank: 2 },
        { name: "Emma Williams", donated: "4,156 meals", avatar: "EW", rank: 3 },
        { name: "David Brown", donated: "3,942 meals", avatar: "DB", rank: 4 }
    ];

    const stats = [
        { number: "50K+", label: "Meals Donated", icon: <TrendingUp className="w-6 h-6" /> },
        { number: "1,200+", label: "Active Donors", icon: <Users className="w-6 h-6" /> },
        { number: "300+", label: "Volunteers", icon: <HandHeart className="w-6 h-6" /> },
        { number: "24/7", label: "Support", icon: <Clock className="w-6 h-6" /> }
    ];

    return (
        <div className="w-full overflow-hidden">
            {/* Hero Carousel */}
            <div className="relative w-full h-[100vh] overflow-hidden">
                {images.map((img, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 transition-all duration-1000 ${i === index ? " scale-100" : "opacity-0 scale-110"
                            }`}
                    >
                        <img
                            src={img}
                            alt="Food Donation"
                            className="w-full h-full object-cover"
                        />
                        {/* Animated overlay pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-white rounded-full animate-ping-slow"></div>
                            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 border-2 border-white rounded-full animate-ping-slower"></div>
                        </div>
                    </div>
                ))}
                {/* Dynamic gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
                {/* Content with advanced animations */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                    <div className="space-y-6 max-w-4xl relative">
                        <h1 className="text-4xl md:text-6xl font-bold mb-2 leading-tight animate-slide-down">
                            Welcome to{" "}
                            <span className="inline-block bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 bg-clip-text text-transparent animate-gradient bg-300">
                                Food & Hunger
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-6 font-light animate-slide-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>

                            FoodAndHunger connects restaurants, shops, and households with nearby NGOs to donate surplus food using a smart, location-based platform.
                            It reduces food waste while ensuring fresh meals reach people in need quickly and safely.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                            <button className="cursor-pointer relative overflow-hidden px-8 py-3 rounded-xl font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 group">
                                <div className="absolute inset-0 bg-green-600 transition-transform duration-300 group-hover:scale-110"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <span className="relative flex items-center gap-2">
                                    Become a Donor
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                                </span>
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                            </button>
                            <button className="cursor-pointer relative overflow-hidden px-8 py-3 rounded-xl font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 group border-2 border-white/30 backdrop-blur-sm">
                                <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></div>
                                <span className="relative flex items-center gap-2">
                                    Become a Recipiet
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Enhanced Carousel Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`h-2 rounded-full transition-all duration-500 relative overflow-hidden ${i === index ? "w-12 bg-white shadow-lg shadow-white/50" : "w-2 bg-white/50 hover:bg-white/80 hover:w-4"
                                }`}
                        >
                            {i === index && (
                                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 animate-shimmer"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Section with counter animations */}
            <div className="py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => (
                            <div
                                key={idx}
                                className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center group relative overflow-hidden"
                                style={{
                                    animation: `pop-in 0.6s ease-out ${idx * 0.1}s forwards`,
                                    opacity: 0,
                                    transform: 'scale(0.8)'
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative">
                                    <div className="flex justify-center mb-3 text-green-600 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                                        {stat.icon}
                                    </div>
                                    <div className="text-3xl font-bold mb-1 animate-number">
                                        {stat.number}
                                    </div>
                                    <div className="text-sm opacity-70">
                                        {stat.label}
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/10 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-700"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recipients Section */}
            <div
                id="section-recipients"
                className={`py-20 px-4 transition-all duration-1000 ${isVisible["section-recipients"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                    }`}
            >

                <DonorFoodList />
                <RecipientListing />

                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 relative">
                        <div className="inline-block relative">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
                                Our Recipients
                                <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-emerald-400 opacity-20 blur-2xl animate-pulse-slow"></div>
                            </h2>
                        </div>
                        <div className="flex items-center justify-center gap-2 mt-4">
                            <div className="w-12 h-1 bg-gradient-to-r from-transparent to-green-500 rounded-full animate-expand-right"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                            <div className="w-12 h-1 bg-gradient-to-l from-transparent to-emerald-500 rounded-full animate-expand-left"></div>
                        </div>
                        <p className="mt-4 text-lg opacity-80">
                            Making a difference in lives that need it most
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {recipients.map((recipient, idx) => (
                            <div
                                key={idx}
                                className="group rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 border border-opacity-10 relative overflow-hidden"
                                style={{
                                    animation: isVisible["section-recipients"] ? `slide-up 0.8s ease-out ${idx * 0.2}s forwards` : 'none',
                                    opacity: isVisible["section-recipients"] ? 1 : 0
                                }}
                            >
                                {/* Animated background gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-emerald-500/0 to-green-500/0 group-hover:from-green-500/5 group-hover:via-emerald-500/5 group-hover:to-green-500/5 transition-all duration-700"></div>

                                {/* Floating orbs */}
                                <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-green-400/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                                <div className="relative z-10">
                                    <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 flex justify-center">
                                        <div className="p-4 rounded-2xl shadow-md relative">
                                            {recipient.icon}
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-center group-hover:scale-105 transition-transform duration-300">
                                        {recipient.title}
                                    </h3>
                                    <p className="leading-relaxed text-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                        {recipient.definition}
                                    </p>
                                    <div className="mt-6 pt-6 border-t border-opacity-10">
                                        <button className="w-full py-2 text-green-600 font-semibold hover:text-green-700 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                                            <span className="relative">
                                                Learn More
                                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 group-hover/btn:w-full transition-all duration-300"></span>
                                            </span>
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Donors Section */}
            <div
                id="section-donors"
                className={`py-20 px-4 transition-all duration-1000 ${isVisible["section-donors"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                    }`}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 relative">
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6 border-2 border-yellow-400/30 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 group-hover:from-yellow-400/20 group-hover:to-orange-400/20 transition-all duration-500"></div>
                            <Award className="w-5 h-5 text-yellow-600 animate-bounce-slow relative z-10" />
                            <span className="text-yellow-800 font-semibold relative z-10">
                                Hall of Fame
                            </span>
                        </div>
                        <div className="inline-block relative">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                Top Donors
                                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-20 blur-2xl animate-pulse-slow"></div>
                            </h2>
                        </div>
                        <div className="flex items-center justify-center gap-2 mt-4">
                            <div className="w-12 h-1 bg-gradient-to-r from-transparent to-yellow-500 rounded-full animate-expand-right"></div>
                            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                            <div className="w-12 h-1 bg-gradient-to-l from-transparent to-orange-500 rounded-full animate-expand-left"></div>
                        </div>
                        <p className="mt-4 text-lg opacity-80">
                            Celebrating our generous heroes
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {topDonors.map((donor, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 text-center relative overflow-hidden group"
                                style={{
                                    animation: isVisible["section-donors"] ? `pop-in 0.6s ease-out ${idx * 0.15}s forwards` : 'none',
                                    opacity: isVisible["section-donors"] ? 1 : 0
                                }}
                            >
                                {/* Rank badge with animation */}
                                {donor.rank <= 3 && (
                                    <div className={`absolute top-0 right-0 px-4 py-2 text-xs font-bold rounded-bl-2xl shadow-lg transform group-hover:scale-110 transition-all duration-300 ${donor.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                                        donor.rank === 2 ? 'bg-gray-300 text-gray-800' :
                                            'bg-orange-400 text-orange-900'
                                        }`}>
                                        <span className="flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-current animate-spin-slow" />
                                            #{donor.rank}
                                        </span>
                                    </div>
                                )}

                                {/* Animated gradient background */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5"></div>
                                </div>
                                <div className="relative z-10">
                                    <div className="relative inline-block mb-4">
                                        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-lg transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 ${idx === 0 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                                            idx === 1 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                                                idx === 2 ? 'bg-gradient-to-br from-pink-500 to-pink-600' :
                                                    'bg-gradient-to-br from-orange-500 to-orange-600'
                                            }`}>
                                            {donor.avatar}
                                            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 animate-ping-slow"></div>
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-2 shadow-lg transform group-hover:scale-125 transition-transform duration-300">
                                            <Heart className="w-4 h-4 text-white fill-white animate-heartbeat" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                                        {donor.name}
                                    </h3>
                                    <p className="text-green-600 font-semibold mb-4">{donor.donated}</p>
                                    <div className="pt-4 border-t border-opacity-10">
                                        <div className="text-xs opacity-70">
                                            Donated this year
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Volunteer Section */}
            <div
                id="section-volunteer"
                className={`py-20 px-4 transition-all duration-1000 ${isVisible["section-volunteer"]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                    }`}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden group">
                        {/* Animated background layers */}
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/50 to-green-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                        {/* Decorative animated elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 animate-pulse-slower"></div>
                        <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-white/20 rounded-full animate-ping-slow"></div>

                        {/* Floating icons */}
                        <div className="absolute top-10 left-10 animate-float">
                            <Heart className="w-8 h-8 text-white/30" />
                        </div>
                        <div className="absolute bottom-10 right-20 animate-float-delayed">
                            <Users className="w-10 h-10 text-white/30" />
                        </div>
                        <div className="absolute top-20 right-10 animate-float-slower">
                            <HandHeart className="w-9 h-9 text-white/30" />
                        </div>

                        <div className="relative z-10 text-center text-white">
                            <div className="inline-block mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                <HandHeart className="w-16 h-16 mx-auto animate-bounce-slow" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
                                Volunteer With Us
                            </h2>
                            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                                Join our mission to end hunger. Your time and effort can change lives.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
                                <button className="relative overflow-hidden px-8 py-4 rounded-xl font-bold shadow-lg transform transition-all duration-300 hover:scale-110 group/btn">
                                    <div className="absolute inset-0 bg-white"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative text-green-600 flex items-center justify-center gap-2">
                                        Join as Volunteer
                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                                    </span>
                                    <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-green-400/30 to-transparent skew-x-12"></div>
                                </button>
                                <button className="relative overflow-hidden border-2 border-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-110 hover:bg-white hover:text-green-600 group/btn2">
                                    <span className="relative flex items-center justify-center gap-2">
                                        Learn More
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slide-down {
                    from {
                        opacity: 0;
                        transform: translateY(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes pop-in {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(5deg);
                    }
                }

                @keyframes float-delayed {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-15px) rotate(-5deg);
                    }
                }

                @keyframes float-slower {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-25px) rotate(3deg);
                    }
                }

                @keyframes gradient {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }

                @keyframes ping-slow {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.1);
                        opacity: 0.5;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                @keyframes ping-slower {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.15);
                        opacity: 0.3;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                @keyframes pulse-slow {
                    0%, 100% {
                        opacity: 0.3;
                    }
                    50% {
                        opacity: 0.6;
                    }
                }

                @keyframes pulse-slower {
                    0%, 100% {
                        opacity: 0.2;
                    }
                    50% {
                        opacity: 0.5;
                    }
                    100% {
                        opacity: 0.2;
                    }
                }

                @keyframes animate-expand-right {
                    from {
                        width: 0;
                    }
                    to {
                        width: 3rem; /* Tailwind w-12 is 3rem */
                    }
                }

                @keyframes animate-expand-left {
                    from {
                        width: 0;
                    }
                    to {
                        width: 3rem; /* Tailwind w-12 is 3rem */
                    }
                }

                @keyframes heartbeat {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                }

                @keyframes bounce-slow {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }

                .animate-slide-down {
                    animation: slide-down 0.8s ease-out forwards;
                }
                .animate-slide-up {
                    animation: slide-up 0.8s ease-out forwards;
                }
                .animate-pop-in {
                    animation: pop-in 0.6s ease-out forwards;
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: float-delayed 7s ease-in-out infinite 0.5s;
                }
                .animate-float-slower {
                    animation: float-slower 8s ease-in-out infinite 1s;
                }
                .animate-gradient {
                    background-size: 300% 300%;
                    animation: gradient 4s ease infinite;
                }
                .animate-shimmer {
                    animation: shimmer 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
                .animate-ping-slow {
                    animation: ping-slow 3s ease-in-out infinite;
                }
                .animate-ping-slower {
                    animation: ping-slower 4s ease-in-out infinite;
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
                .animate-pulse-slower {
                    animation: pulse-slower 5s ease-in-out infinite;
                }
                .animate-expand-right {
                    animation: animate-expand-right 1s ease-out forwards;
                }
                .animate-expand-left {
                    animation: animate-expand-left 1s ease-out forwards;
                }
                .animate-heartbeat {
                    animation: heartbeat 1.5s ease-in-out infinite;
                }
                .animate-bounce-slow {
                    animation: bounce-slow 2s infinite;
                }
                .bg-300 {
                    background-size: 300%;
                }
            `}</style>
        </div>
    );
};

export default Home;