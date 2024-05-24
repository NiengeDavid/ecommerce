import { client } from "@/lib/client";
import { cache } from 'react'

const bannerQuery = `*[_type == "banner"]`;
const productQuery = `*[_type == "product"]`;

export const getAllData = cache(async () => {
  const [bannerData, products] = await Promise.all([
    client.fetch(bannerQuery),
    client.fetch(productQuery),
  ]);
  return { bannerData, products };
});