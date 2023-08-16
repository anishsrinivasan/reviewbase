import StoreView from "./view";
import { getStoreUsingId } from "@/services/store";
import type { Metadata } from "next";

export const revalidate = 60 * 5;

type Props = {
  params: { storeId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const storeId = params.storeId;

  const response = await getStoreUsingId(storeId);
  if (!response?.data || !storeId) {
    return {
      title: "Not Found - Reviewbase",
    };
  }

  const data = response.data;
  const images = data.headerImage ? [data.headerImage] : [];
  const description = data.description;

  return {
    title: data.name,
    description: description,
    openGraph: {
      images: images,
    },
  };
}

export default async function Page({ params }: Props) {
  const storeId = params.storeId;
  const response = await getStoreUsingId(storeId);

  if (!response?.data || !storeId) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center">
        <h1 className="text-[36px] font-bold animate-pulse">404</h1>
        <br />
        <p className="text-[18px]">Page you`re looking for is not found!</p>
      </div>
    );
  }

  return <StoreView store={response?.data} />;
}
