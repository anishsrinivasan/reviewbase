export const Platforms = {
  Zomato: "Zomato",
  Swiggy: "Swiggy",
  Google: "Google",
} as const;

export type Platforms = (typeof Platforms)[keyof typeof Platforms];

export type StoreIds = Record<Platforms, string>;
export type StorePlatform = {
  platform: Platforms;
  value: string;
};

export type StoreType = {
  name: string;
};

export type Store = {
  name: string;
  description?: string;
  city: string;
  country: string;
  type: StoreType;
  headerImage?: string;
  logoImage?: string;
  storePlatform: StorePlatform[];
};
