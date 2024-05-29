"use client"

import React, { useEffect, useState } from "react";
import { Product, ProductsResponse } from '../type';

import { getSortedProductsData } from '../../utils';

interface PageProps {
  product: Product;
  products: ProductsResponse;
}

const ProductDetails = ({
  params, 
}: {
  params: {slug: string};
}) => {

  const [productData, setProductData] = useState<Product | null>(null);
  const [productsData, setProductsData] =  useState<ProductsResponse>([]);

  useEffect(() => {
    async function fetchData() {
      const { product, products } = await getSortedProductsData({ params });
      setProductData(product);
      setProductsData(products);

      console.log(product);
      console.log(products);
      console.log(params.slug);
    }

    fetchData();
    
  }, []);

  if (!productData && !productsData) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src='' alt='' />
          </div>
        </div>
      </div>
    </div>
  )
}


export default ProductDetails;