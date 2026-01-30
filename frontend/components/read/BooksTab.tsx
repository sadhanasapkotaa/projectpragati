import React, { useState } from 'react';
import Image from 'next/image';

interface Book {
  id: number;
  src: string;
  alt: string;
}

interface BookCategories {
  [key: string]: Book[];
}

const BooksTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'picture' | 'story' | 'text'>('picture');

  const tabs = [
    { id: 'picture', label: 'Picture Book' },
    { id: 'story', label: 'Story Book' },
    { id: 'text', label: 'Text Book' },
  ];

  const booksByCategory: BookCategories = {
    picture: [
      { id: 1, src: '/assets/img/play/Read1.png', alt: 'Picture Book 1' },
      { id: 2, src: '/assets/img/play/Read2.png', alt: 'Picture Book 2' },
    ],
    story: [
      { id: 3, src: '/assets/img/play/Read3.png', alt: 'Story Book 1' },
      { id: 4, src: '/assets/img/play/Read4.png', alt: 'Story Book 2' },
    ],
    text: [
      { id: 5, src: '/assets/img/play/Read5.png', alt: 'Text Book 1' },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'picture' | 'story' | 'text')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {booksByCategory[activeTab].map((book) => (
          <div key={book.id} className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={book.src}
              alt={book.alt}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksTab;