
export type Photo = {
  id: string;
  url: string;
  description: string;
  year: number;
  isSpecial: boolean;
  date?: Date;
};

export type PhotoContextType = {
  photos: Photo[];
  addPhoto: (photo: Omit<Photo, 'id'>) => void;
  deletePhoto: (id: string) => void;
  toggleSpecial: (id: string) => void;
  getPhotosByYear: (year: number) => Photo[];
  getSpecialPhotos: () => Photo[];
  getYears: () => number[];
};
