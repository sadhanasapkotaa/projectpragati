"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PublicHeader = () => {
  return (
    <header className="fixed w-full top-0 bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/dashboard">
              <Image
                src="/assets/svg/PragatiHeaderLogo.svg"
                alt="Pragati Logo"
                width={130}
                height={40}
                priority
              />
            </Link>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/read" className="relative group">
              <div className="p-2 rounded-lg group-hover:bg-gray-100 transition-colors">
                <Image
                  src="/assets/svg/ReadColorIcon.svg"
                  alt="Read"
                  width={36}
                  height={36}
                />
              </div>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                             opacity-0 group-hover:opacity-100 transition-opacity
                             text-sm text-gray-600 whitespace-nowrap">
                Read
              </span>
            </Link>

            <Link href="/watch" className="relative group">
              <div className="p-2 rounded-lg group-hover:bg-gray-100 transition-colors">
                <Image
                  src="/assets/svg/WatchColorIcon.svg"
                  alt="Watch"
                  width={36}
                  height={36}
                />
              </div>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                             opacity-0 group-hover:opacity-100 transition-opacity
                             text-sm text-gray-600 whitespace-nowrap">
                Watch
              </span>
            </Link>

            <Link href="/play" className="relative group">
              <div className="p-2 rounded-lg group-hover:bg-gray-100 transition-colors">
                <Image
                  src="/assets/svg/PlayColorIcon.svg"
                  alt="Play"
                  width={36}
                  height={36}
                />
              </div>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                             opacity-0 group-hover:opacity-100 transition-opacity
                             text-sm text-gray-600 whitespace-nowrap">
                Play
              </span>
            </Link>

            <Link href="/listen" className="relative group">
              <div className="p-2 rounded-lg group-hover:bg-gray-100 transition-colors">
                <Image
                  src="/assets/svg/ListenColorIcon.svg"
                  alt="Listen"
                  width={36}
                  height={36}
                />
              </div>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                             opacity-0 group-hover:opacity-100 transition-opacity
                             text-sm text-gray-600 whitespace-nowrap">
                Listen
              </span>
            </Link>

            {/* Profile Icon */}
            <Link href="/profile" className="relative group">
              <div className="p-2 rounded-lg group-hover:bg-gray-100 transition-colors">
                <Image
                  src="/assets/svg/ProfileColorIcon.svg"
                  alt="Profile"
                  width={36}
                  height={36}
                />
              </div>
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                             opacity-0 group-hover:opacity-100 transition-opacity
                             text-sm text-gray-600 whitespace-nowrap">
                Profile
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
