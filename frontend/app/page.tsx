"use client";
import Image from "next/image";
import PublicHeader from "../components/shared/publicHeader";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-white">
      <PublicHeader />  

      {/* Hero Section */}
      <main className="my-7 p-16 mx-auto flex justify-between items-start bg-[#FDF9F2] w-[80%] rounded-3xl">
        <div className="max-w-[50%] pr-10">
          <h1 className="text-5xl font-semibold text-gray-700 mb-6 leading-tight">
            Interactive Games & Videos For Learning!
          </h1>
          <p className="text-gray-600 mb-10 text-lg leading-relaxed">
            Pragati is an interactive Children's Learning Application that assists 
            children to learn and grow! It is designed for the children between 
            ages 3 to 12.
          </p>
          <button 
            onClick={() => router.push('/register')}
            className="bg-[#8A2BE2] text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-colors"
          >
            START NOW
          </button>
        </div>
        
        {/* Grid of Character Icons */}
        <div className="grid grid-cols-3 gap-5 w-[500px]">
          <div className="aspect-square bg-[#7B3FE4] p-6 rounded-3xl flex items-center justify-center">
            <Image 
              src="../assets/svg/Container1_Icon1.svg" 
              alt="Astronaut" 
              width={120} 
              height={120}
              className="w-full h-full"
            />
          </div>
          <div className="aspect-square bg-[#FFB6C1] p-6 rounded-3xl flex items-center justify-center">
            <Image 
              src="../assets/svg/Container1_Icon2.svg" 
              alt="Bird" 
              width={120} 
              height={120}
              className="w-full h-full"
            />
          </div>
          <div className="aspect-square bg-[#FFD700] p-6 rounded-3xl flex items-center justify-center">
            <Image 
              src="../assets/svg/Container1_Icon3.svg" 
              alt="Monkey" 
              width={120} 
              height={120}
              className="w-full h-full"
            />
          </div>
          <div className="aspect-square bg-[#FFD700] p-6 rounded-3xl flex items-center justify-center">
            <Image 
              src="../assets/svg/Container1_Icon4.svg" 
              alt="Panda" 
              width={120} 
              height={120}
              className="w-full h-full"
            />
          </div>
          <div className="aspect-square bg-[#90EE90] p-6 rounded-3xl flex items-center justify-center">
            <Image 
              src="../assets/svg/Container1_Icon5.svg" 
              alt="Player" 
              width={120} 
              height={120}
              className="w-full h-full"
            />
          </div>
          <div className="aspect-square bg-[#FFA500] p-6 rounded-3xl flex items-center justify-center">
            <Image 
              src="../assets/svg/Container1_Icon6.svg" 
              alt="Seal" 
              width={120} 
              height={120}
              className="w-full h-full"
            />
          </div>
          <div className="col-span-3 bg-[#00BFFF] p-6 rounded-3xl flex justify-center items-center">
            <Image 
              src="../assets/svg/Container1_Icon7.svg" 
              alt="Rocket" 
              width={200} 
              height={120}
              className="w-auto h-24"
            />
          </div>
        </div>

        
      </main>

      
    </div>
  );
}
