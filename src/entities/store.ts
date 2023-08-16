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

export type CustomField = {
  name: string;
  placeholder: string;
  type: string;
  promptText: string;
  isRequired: boolean;
  label?: string;
  pattern?: string;
};

export type Store = {
  id: string;
  name: string;
  description?: string;
  address?: string;
  city?: string;
  country?: string;
  type: StoreType;
  headerImage?: string;
  logoImage?: string;
  storePlatform: StorePlatform[];
  customField?: CustomField[];
};
