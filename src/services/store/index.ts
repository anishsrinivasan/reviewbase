import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
import { Store } from "@/entities/store";

export const revalidate = 60 * 5; // revalidate the data at every 5 minutes

export const getStoreUsingId = async (id: string) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { error, data } = await supabase
    .from("store")
    .select(
      `id, name, description, address, city, country, headerImage, logoImage, 
      storePlatform(platform, value), 
      customField(name, placeholder, type, promptText, isRequired, label, pattern),
      type:storeType(name)
      `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("getStoreUsingIdError", error);
    return { error, data: null };
  }

  if (data) {
    return { error, data: data as Store };
  }
};
