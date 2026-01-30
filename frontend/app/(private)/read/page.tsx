"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import BooksTab from '@/components/read/BooksTab';

const ReadPage = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      image: "/assets/img/read/PictureBook1.png",
      title: "Importance Of Friendship!"
    },
    {
      id: 2,
      image: "/assets/img/read/PictureBook2.png",
      title: "The Boy Who Cried Wolf"
    },
    {
      id: 3,
      image: "/assets/img/read/PictureBook3.png",
      title: "The Lion and the Mouse"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-[900px] mx-auto">
        <div className="flex items-start gap-8">
          {/* Left side - Text Content */}
          <div className="flex flex-col flex-1">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Do you want to Continue Reading?
            </h2>
            <p className="text-gray-600 mb-6">
              We have noted the book that you were reading a while ago... You can continue reading this book!
            </p>
            <button className="w-fit border-2 border-[#1a73e8] text-[#1a73e8] py-2 px-6 rounded-full font-medium hover:bg-[#1a73e8]/5 transition-colors">
              CHOOSE OTHER BOOK
            </button>
          </div>

          {/* Right side - Book Preview */}
          <div className="w-[400px]">
            <div className="relative bg-[#1a73e8] rounded-xl p-6 aspect-square">
              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors z-10"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition-colors z-10"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Book Content */}
              <div className="flex flex-col items-center h-full justify-center">
                <div className="relative w-full h-[200px] mb-4">
                  {slides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-contain"
                        priority={index === currentSlide}
                      />
                    </div>
                  ))}
                </div>
                <h3 className="text-white text-xl text-center mb-4">
                  {slides[currentSlide].title}
                </h3>
                <button className="w-fit bg-white/90 text-[#1a73e8] py-2 px-8 rounded-full font-medium hover:bg-white transition-colors text-sm uppercase">
                  Continue Reading
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BooksTab />
    </div>
  );
};

export default ReadPage;