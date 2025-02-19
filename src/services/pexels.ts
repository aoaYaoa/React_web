import { pexelsKey, pexelsBaseUrl } from '@/config/apiKey';

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    tiny: string;
  };
}

export async function getRandomPhoto(query = 'nature,landscape'): Promise<PexelsPhoto> {
  const response = await fetch(`${pexelsBaseUrl}/search?query=${query}&per_page=1&page=${Math.floor(Math.random() * 100)}`, {
    headers: {
      'Authorization': pexelsKey
    }
  });
  
  const data = await response.json();
  return data.photos[0];
} 