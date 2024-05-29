import { client } from "@/lib/client";
import { cache } from 'react'

interface FetchParams {
  params: {slug: string};
}


export const getAllData = cache(async () => {
  const bannerQuery = `*[_type == "banner"]`;
  const productQuery = `*[_type == "product"]`;

  const [bannerData, products] = await Promise.all([
    client.fetch(bannerQuery),
    client.fetch(productQuery),
  ]);
  return { bannerData, products };
});

export const getSortedProductsData = cache(async ({ params }: FetchParams ) => {
  const query = `*[_type == "product" && slug.current == '${params.slug}'][0]`;
  const productQuery = `*[_type == "product"]`;
  
  const [product] = await Promise.all([
    client.fetch(query)
  ]);

  const [products] = await Promise.all([
    client.fetch(productQuery)
  ]);
  return { product, products };
});