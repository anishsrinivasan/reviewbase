export const StorePlatforms = {
  Zomato: "Zomato",
  Swiggy: "Swiggy",
  Google: "Google",
} as const;

export type StorePlatforms =
  (typeof StorePlatforms)[keyof typeof StorePlatforms];

export type StoreIds = Record<StorePlatforms, string>;

export type Store = {
  name: string;
  description?: string;
  city: string;
  country: string;
  headerImage?: string;
  logoImage?: string;
  storeIds: StoreIds | {};
};
