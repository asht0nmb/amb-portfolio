import { createApi } from 'unsplash-js';
import { OrderBy } from 'unsplash-js/dist/types/request';

// Initialize the Unsplash API client
// Note: You'll need to add your access key to .env.local
const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || '',
});

export interface UnsplashPhoto {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
  };
  width: number;
  height: number;
  description: string | null;
  created_at: string;
  user: {
    username: string;
    name: string;
  };
  exif?: {
    make?: string;
    model?: string;
    exposure_time?: string;
    aperture?: string;
    focal_length?: string;
    iso?: number;
  };
}

export interface UserStats {
  downloads: {
    total: number;
    historical: {
      change: number;
      average: number;
      values: Array<{ date: string; value: number }>;
    };
  };
  views: {
    total: number;
    historical: {
      change: number;
      average: number;
      values: Array<{ date: string; value: number }>;
    };
  };
  likes: {
    total: number;
    historical: {
      change: number;
      average: number;
      values: Array<{ date: string; value: number }>;
    };
  };
}

// Get photos from a specific user's profile
export const getUserPhotos = async (username: string) => {
  try {
    const result = await unsplash.users.getPhotos({
      username,
      perPage: 30,
      orderBy: 'latest' as OrderBy
    });
    
    if (result.errors) {
      console.error('Error fetching user photos:', result.errors[0]);
      return [];
    }

    // Fetch EXIF data for each photo
    const photosWithExif = await Promise.all(
      (result.response?.results || []).map(async (photo) => {
        try {
          const photoDetails = await unsplash.photos.get({ photoId: photo.id });
          return {
            ...photo,
            exif: photoDetails.response?.exif || {}
          };
        } catch (error) {
          console.error('Error fetching photo details:', error);
          return photo;
        }
      })
    );
    
    return photosWithExif;
  } catch (error) {
    console.error('Error fetching user photos:', error);
    return [];
  }
};

// Get photos from a specific collection
export const getCollectionPhotos = async (collectionId: string) => {
  try {
    const result = await unsplash.collections.getPhotos({
      collectionId,
      perPage: 30,
      orientation: 'landscape'
    });

    if (result.errors) {
      console.error('Error fetching collection photos:', result.errors[0]);
      return [];
    }

    // Fetch EXIF data for each photo
    const photosWithExif = await Promise.all(
      (result.response?.results || []).map(async (photo) => {
        try {
          const photoDetails = await unsplash.photos.get({ photoId: photo.id });
          return {
            ...photo,
            exif: photoDetails.response?.exif || {}
          };
        } catch (error) {
          console.error('Error fetching photo details:', error);
          return photo;
        }
      })
    );

    return photosWithExif;
  } catch (error) {
    console.error('Error fetching collection photos:', error);
    return [];
  }
};

// Get user statistics (views, downloads, likes)
export const getUserStats = async (username: string): Promise<UserStats | null> => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/users/${username}/statistics?quantity=30`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    if (!response.ok) {
      console.error('Error fetching user stats:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data as UserStats;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return null;
  }
}; 