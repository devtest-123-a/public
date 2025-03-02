
import React, { useState } from 'react';
import { PhotoProvider } from '../context/PhotoContext';
import HeartBackground from '../components/HeartBackground';
import Header from '../components/Header';
import YearNavigation from '../components/YearNavigation';
import SpecialMemories from '../components/SpecialMemories';
import PhotoGallery from '../components/PhotoGallery';
import UploadPhoto from '../components/UploadPhoto';
import Footer from '../components/Footer';

const Index = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  return (
    <PhotoProvider>
      <div className="min-h-screen bg-romantic-gradient pb-20 relative">
        <HeartBackground />
        
        <div className="container mx-auto px-4">
          <Header />
          
          {/* Add the Upload Photo section at the top with nice styling */}
          <div className="mb-8 mt-4 glass-card p-6 animate-fade-in">
            <h2 className="text-2xl font-dancing text-romantic-600 mb-4 text-center">
              Thêm Khoảnh Khắc Đẹp
            </h2>
            <p className="text-romantic-500 text-center mb-4">
              Chia sẻ những kỷ niệm đáng nhớ của chúng mình
            </p>
            <div className="flex justify-center">
              <UploadPhoto />
            </div>
          </div>
          
          <YearNavigation 
            selectedYear={selectedYear} 
            setSelectedYear={setSelectedYear} 
          />
          
          <SpecialMemories />
          
          <PhotoGallery selectedYear={selectedYear} />
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 z-10">
          <Footer />
        </div>
      </div>
    </PhotoProvider>
  );
};

export default Index;
