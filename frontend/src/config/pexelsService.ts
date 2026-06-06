// Pexels CDN - 不需要 API Key，直接用公開圖片 ID 隨機取用

const BASE = "https://images.pexels.com/photos";

export const pexelsCdnUrl = (id: number, width = 400): string =>
  `${BASE}/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

const PHOTO_IDS: Record<string, number[]> = {
  "男士服飾": [1043474, 3768166, 1598505, 1030946, 1192609, 2897883, 842811, 2379004],
  "女士服飾": [1536619, 2613260, 2285396, 2916440, 2529148, 3170438, 1021693, 2220316],
  "童裝":     [1620779, 35537, 1148998, 296301, 35537, 1148998],
  "手錶":     [2113994, 437037, 190819, 1697214, 277390],
  "手機":     [699122, 1092644, 2692890, 404280, 47261],
  "筆電":     [18105, 2582937, 7974572, 3861969, 1229861],
  "耳機":     [3394650, 1649771, 3587478, 577769],
  "相機":     [90946, 51383, 225157, 1264210],
  "遊戲":     [3945659, 442576, 3165335, 1174746],
  "平板":     [1334597, 106344, 2122364],
  "居家傢俱": [1350789, 584399, 271743, 2062431, 276724],
  "美妝":     [3321416, 2253879, 1366942, 3737586],
  "食品":     [1132047, 1640777, 1640769, 1640773],
  "運動":     [3822583, 2827392, 1552242, 209977],
  "書籍":     [256541, 159711, 1130980, 694740],
  "汽車":     [1164778, 112460, 1545743],
  "default":  [1043474, 1536619, 2113994, 699122, 1350789, 3822583, 256541],
};

/** 隨機取一張指定類別的 Pexels 圖片 URL */
export const randomPexelsUrl = (category: string = "default", width = 400): string => {
  const ids = PHOTO_IDS[category] ?? PHOTO_IDS["default"];
  const id = ids[Math.floor(Math.random() * ids.length)];
  return pexelsCdnUrl(id, width);
};

/** 隨機取 N 張（不重複）指定類別的 Pexels 圖片 URL */
export const randomPexelsUrls = (category: string = "default", count = 1, width = 400): string[] => {
  const ids = [...(PHOTO_IDS[category] ?? PHOTO_IDS["default"])];
  const picked: number[] = [];
  while (picked.length < Math.min(count, ids.length)) {
    const idx = Math.floor(Math.random() * ids.length);
    const [id] = ids.splice(idx, 1);
    picked.push(id);
  }
  return picked.map((id) => pexelsCdnUrl(id, width));
};
