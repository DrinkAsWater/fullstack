const PEXELS_API_KEY = process.env.REACT_APP_PEXELS_API_KEY || "";
const PEXELS_BASE = "https://api.pexels.com/v1";

export interface PexelsPhoto {
  id: number;
  src: {
    medium: string;
    large: string;
    original: string;
  };
  photographer: string;
  alt: string;
}

export const searchPexelsPhotos = async (
  query: string,
  perPage = 10
): Promise<PexelsPhoto[]> => {
  if (!PEXELS_API_KEY) {
    console.warn("REACT_APP_PEXELS_API_KEY not set");
    return [];
  }
  const res = await fetch(
    `${PEXELS_BASE}/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=portrait`,
    { headers: { Authorization: PEXELS_API_KEY } }
  );
  if (!res.ok) throw new Error(`Pexels API error: ${res.status}`);
  const data = await res.json();
  return data.photos as PexelsPhoto[];
};

export const getRandomPexelsPhoto = async (query: string): Promise<string> => {
  const photos = await searchPexelsPhotos(query, 15);
  if (!photos.length) return "";
  const random = photos[Math.floor(Math.random() * photos.length)];
  return random.src.medium;
};

// Curated Pexels CDN URLs by category (no API key needed)
export const pexelsCdnUrl = (photoId: number, width = 400): string =>
  `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

export const CATEGORY_PHOTOS: Record<string, number> = {
  "男士T恤": 1043474,
  "男士外套": 1598505,
  "男士襯衫": 3768166,
  "男士長褲": 1030946,
  "女士洋裝": 1536619,
  "女士裙": 2613260,
  "女士上衣": 2529148,
  "女士民族服": 2285396,
  "童裝": 1620779,
  "手錶": 2113994,
  "手機": 699122,
  "筆電": 18105,
  "運動": 3822583,
  "居家": 1350789,
  "美妝": 3321416,
};
