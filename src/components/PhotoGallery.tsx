
import React, { useState } from 'react';
import { usePhotoContext } from '../context/PhotoContext';
import PhotoCard from './PhotoCard';
import PhotoModal from './PhotoModal';
import { Photo } from '../types';

type PhotoGalleryProps = {
  selectedYear: number | null;
};

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ selectedYear }) => {
  const { photos, getYears } = usePhotoContext();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const years = selectedYear ? [selectedYear] : getYears();

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  // If there are no photos, show an empty state
  if (photos.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <p className="text-romantic-500">Chưa có kỷ niệm nào được lưu trữ.</p>
        <p className="text-romantic-400 mt-2">Hãy thêm kỷ niệm đầu tiên của bạn!</p>
      </div>
    );
  }

  // If a year is selected but there are no photos for that year
  if (selectedYear && !photos.some(photo => photo.year === selectedYear)) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <p className="text-romantic-500">Không có kỷ niệm nào trong năm {selectedYear}.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-24">
      {years.map((year, yearIndex) => {
        const yearPhotos = photos.filter(photo => photo.year === year);
        
        // Don't render empty year sections
        if (yearPhotos.length === 0) return null;
        
        return (
          <div 
            key={year} 
            className="mb-12 animate-slide-up" 
            style={{ animationDelay: `${0.2 + yearIndex * 0.1}s` }}
          >
            <h2 className="text-3xl font-dancing text-romantic-600 mb-4">
              {year}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {yearPhotos.map((photo, index) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  onClick={() => handlePhotoClick(photo)}
                />
              ))}
            </div>
          </div>
        );
      })}
      
      <PhotoModal photo={selectedPhoto} onClose={closeModal} />
    </div>
  );
};

export default PhotoGallery;
