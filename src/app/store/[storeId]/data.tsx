import { Store } from "@/entities/store";

export const SAMPLE_STORE: Store = {
  id: "1",
  name: "McDonald's",
  description: "",
  address: "",
  city: "Chennai",
  country: "India",
  headerImage:
    "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  logoImage:
    "https://w7.pngwing.com/pngs/13/397/png-transparent-mcdonald-039-s-hd-logo.png",
  storePlatform: [
    {
      platform: "Google",
      value: "ChIJsRNJlyZkUjoRJU4N0URv40Q",
    },
    {
      platform: "Zomato",
      value: "65343",
    },
  ],
  type: {
    name: "Restaurant",
  },
};
