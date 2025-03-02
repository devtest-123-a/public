
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Photo, PhotoContextType } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Define sample photos
const samplePhotos: Photo[] = [
  {
    id: uuidv4(),
    url: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853",
    description: "Bữa tối lãng mạn bên bờ biển",
    year: 2023,
    isSpecial: true
  },
  {
    id: uuidv4(),
    url: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
    description: "Ngày đầu tiên chúng mình gặp nhau",
    year: 2023,
    isSpecial: false
  },
  {
    id: uuidv4(),
    url: "https://images.unsplash.com/photo-1488161628813-04466f872be2",
    description: "Chuyến du lịch Đà Lạt",
    year: 2022,
    isSpecial: false
  },
  {
    id: uuidv4(),
    url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e",
    description: "Lần đầu nấu ăn cùng nhau",
    year: 2022,
    isSpecial: true
  },
  {
    id: uuidv4(),
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2",
    description: "Kỷ niệm 1 năm yêu nhau",
    year: 2021,
    isSpecial: true
  }
];

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    // Load photos from localStorage or use sample photos
    const savedPhotos = localStorage.getItem('photos');
    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos));
    } else {
      setPhotos(samplePhotos);
    }
  }, []);

  useEffect(() => {
    // Save photos to localStorage whenever they change
    localStorage.setItem('photos', JSON.stringify(photos));
  }, [photos]);

  const addPhoto = (photo: Omit<Photo, 'id'>) => {
    const newPhoto = { ...photo, id: uuidv4() };
    setPhotos(prev => [...prev, newPhoto]);
  };

  const deletePhoto = (id: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== id));
  };

  const toggleSpecial = (id: string) => {
    setPhotos(prev => 
      prev.map(photo => 
        photo.id === id ? { ...photo, isSpecial: !photo.isSpecial } : photo
      )
    );
  };

  const getPhotosByYear = (year: number) => {
    return photos.filter(photo => photo.year === year);
  };

  const getSpecialPhotos = () => {
    return photos.filter(photo => photo.isSpecial);
  };

  const getYears = () => {
    const years = [...new Set(photos.map(photo => photo.year))];
    return years.sort((a, b) => b - a); // Sort descending (newest first)
  };

  return (
    <PhotoContext.Provider value={{ 
      photos, 
      addPhoto, 
      deletePhoto, 
      toggleSpecial, 
      getPhotosByYear, 
      getSpecialPhotos,
      getYears
    }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotoContext = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhotoContext must be used within a PhotoProvider');
  }
  return context;
};
