"use client";
import React from 'react';
import Image from 'next/image';

interface PlanProps {
  title: string;
  price: number;
  description: string;
  buttonText: string;
  isPopular?: boolean;
}

const PricingCard: React.FC<PlanProps> = ({ title, price, description, buttonText, isPopular }) => (  <div className={`bg-white rounded-3xl p-8 shadow-sm w-[300px] relative z-10 ${isPopular ? 'border border-[#7474F7]' : ''}`}>
    {isPopular && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7474F7] text-white px-4 py-1 rounded-full text-sm">
        Most Popular
      </span>
    )}
    <h3 className="text-lg text-[#7474F7] font-medium mb-4 text-center">{title}</h3>
    <div className="flex items-center justify-center mb-4">
      <span className="text-lg font-medium bg-[#7474F7] text-white px-4 py-1 rounded-full">Rs. {price}</span>
    </div>
    <p className="text-[#6B6B6B] text-sm mb-6 min-h-[80px]">{description}</p>
    {title === "Yearly Plan" && (
      <p className="text-[#7474F7] text-sm font-medium mb-4">FLAT 10% OFF</p>
    )}
    <button 
      className={`w-full py-2 rounded-xl text-sm font-medium text-[#7474F7] bg-white border border-[#7474F7] hover:bg-[#7474F7] hover:text-white transition-colors`}
    >
      {buttonText}
    </button>
  </div>
);

const Page = () => {  const plans = [
    {
      title: "Starter Plan",
      price: 0,
      description: "This plan includes all learning features but doesn't have features like themes, avatars, etc.",
      buttonText: "SUBSCRIBE",
    },
    {
      title: "Monthly Plan",
      price: 25,
      description: "This plan includes the complete subscription of all the features of this app for an entire month.",
      buttonText: "SUBSCRIBE",
      isPopular: true,
    },
    {
      title: "Yearly Plan",
      price: 270,
      description: "This plan includes the complete subscription of all features for an entire year.",
      buttonText: "SUBSCRIBE",
    },
  ];
  return (    <div className="min-h-screen relative overflow-hidden bg-white">
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-12">
            <div className="flex items-center justify-start mb-8">
              <Image
                src="/assets/svg/PragatiHeaderLogo.svg"
                alt="Pragati Logo"
                width={250}
                height={200}
                priority
              />
            </div>
          </div>
          
          <div className="relative mx-auto max-w-6xl">
            <div className="bg-[#E6F4FF] rounded-[40px] pb-32 pt-12 px-8 mb-8">
              <h1 className="text-[#2D2D2D] text-4xl font-medium mb-16 text-center">Our Subscription Plans:</h1>
              
              <div className="flex flex-wrap justify-center gap-8 relative z-10">
                {plans.map((plan, index) => (
                  <PricingCard key={index} {...plan} />
                ))}
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-[#7474F7] rounded-t-[40px] rounded-b-[40px] z-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;