
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const HeartBackground: React.FC = () => {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; size: number; animation: string; opacity: number }>>([]);

  useEffect(() => {
    // Create initial hearts
    const initialHearts = Array.from({ length: 12 }, (_, index) => ({
      id: index,
      x: Math.random() * 100, // Random horizontal position (0-100%)
      size: Math.random() * 14 + 6, // Random size between 6px and 20px
      animation: `heart-float-${Math.floor(Math.random() * 5) + 1}`,
      opacity: Math.random() * 0.25 + 0.05, // Less opacity between 0.05 and 0.3
    }));
    
    setHearts(initialHearts);
    
    // Add new hearts less frequently to reduce visual distraction
    const interval = setInterval(() => {
      setHearts(prev => {
        // Remove some old hearts to prevent too many elements
        if (prev.length > 20) {
          return [
            ...prev.slice(10),
            {
              id: Date.now(),
              x: Math.random() * 100,
              size: Math.random() * 14 + 6,
              animation: `heart-float-${Math.floor(Math.random() * 5) + 1}`,
              opacity: Math.random() * 0.25 + 0.05,
            }
          ];
        }
        
        return [
          ...prev,
          {
            id: Date.now(),
            x: Math.random() * 100,
            size: Math.random() * 14 + 6,
            animation: `heart-float-${Math.floor(Math.random() * 5) + 1}`,
            opacity: Math.random() * 0.25 + 0.05,
          }
        ];
      });
    }, 4000); // Add a new heart every 4 seconds instead of 2 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="heart-bg">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className={`absolute animate-${heart.animation}`}
          style={{
            left: `${heart.x}%`,
            bottom: '-20px',
            opacity: heart.opacity,
            transition: 'transform 0.5s ease-in-out', // Add gentle sideways movement
            transform: `translateX(${Math.sin(Date.now() / 3000 + heart.id) * 15}px)`, // Gentle side-to-side movement
          }}
        >
          <Heart 
            size={heart.size} 
            className="text-romantic-300 fill-romantic-100" 
          />
        </div>
      ))}
    </div>
  );
};

export default HeartBackground;
