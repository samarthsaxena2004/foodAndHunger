import React, { useState, useEffect } from "react";
import img1 from "../../assets/images/carasoul1.jpg";
import img2 from "../../assets/images/carasoul2.jpg";
import img3 from "../../assets/images/carasoul3.jpg";
import img4 from "../../assets/images/carasoul3.jpg";

const images = [img1, img2, img3, img4];

const Home = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className=" w-full overflow-hidden">
            {/* Carousel */}
            <div className="relative w-full h-[70vh]">
                {images.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt="Food Donation"
                        className={`absolute w-full h-full object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ))}

                {/* Overlay content */}
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">
                        Welcome to Food & Hunger
                    </h1>
                    <p className="text-lg mb-6">Let's save a life together</p>
                    <div className="flex gap-4">
                        <button className="bg-green-600 px-5 py-2 rounded-lg hover:bg-green-700">
                            Donors
                        </button>
                        <button className="bg-white text-green-700 px-5 py-2 rounded-lg hover:bg-gray-200">
                            Recipients
                        </button>
                    </div>
                </div>
            </div>

            {/* Sections */}
            <div className="recipients py-10 text-center">
                <h2 className="text-2xl font-semibold">Our Recipients</h2>
                
                <div className="card">
                <div className="right">
                    
                    <img src="" alt="" />
                </div>
                <div className="left">

                    <h1 className="title"></h1> 
                    <p className="definition"></p>
                </div>
                </div>


            </div>
            <div className="top_donors py-10 text-center">
                <h2 className="text-2xl font-semibold">Top Donors</h2>

            </div>
            <div className="volunteer py-10 text-center">
                <h2 className="text-2xl font-semibold">Volunteer With Us</h2>
            </div>
        </div>
    );
};

export default Home;
