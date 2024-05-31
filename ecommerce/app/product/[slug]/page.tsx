"use client";

import React, { useEffect, useState } from "react";
import { Products, ProductsResponse } from "../type";
import {
  AiOutlineMinus,
  AiOutlineStar,
  AiFillStar,
  AiOutlinePlus,
} from "react-icons/ai";

import { getSortedProductsData } from "../../utils";
import { urlFor } from "@/lib/client";
import { Product } from '../../../components';

interface PageProps {
  productss: Products;
  products: ProductsResponse;
}

const ProductDetails = ({ params }: { params: { slug: string } }) => {
  const [productData, setProductData] = useState<Products | null>(null);
  const [productsData, setProductsData] = useState<ProductsResponse>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const { product, products } = await getSortedProductsData({ params });
      setProductData(product);
      setProductsData(products);

      console.log(product);
      // console.log(products);
      // console.log(params.slug);
    }

    fetchData();
  }, [params.slug]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  if (!productsData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          {/* Main product detail image */}
          <div className="image-container">
            {productData.image && productData.image[0] ? (
              <img
                src={urlFor(productData.image[index]).url()}
                alt={productData.name}
              />
            ) : (
              <div>No Image Available</div>
            )}
          </div>
            {/* Small Images */}
          <div className="small-images-container">
            {productData.image?.map((item, i) => (
              <img
                key={item._key} 
                src={urlFor(item).url()}
                alt={`Product image ${i + 1}`}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1 className="font-bold text-2xl">{productData.name}</h1>
          <div className="reviews">
            <div className="flex ">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p className="pt-2">(20)</p>
          </div>
          <h4 className="font-semibold text-lg">Details: </h4>
          <p className="text-gray-500 text-lg">{productData.details}</p>
          <p className="price">${productData.price}</p>
          <div className="quantity flex">
            <h3 className="font-semibold text-lg">Quantity:</h3>
            <p className="quantity-desc flex items-center justify-center text-lg py-3 px-1.5">
              <span className="minus border-r border-gray-500 text-lg py-3 px-1.5">
                <AiOutlineMinus />
              </span>
              <span className="num">0</span>
              <span className="plus text-lg p-0 border-gray-500">
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button 
              type="button"
              className="add-to-cart"
              onClick=""
            >Add to Cart</button>
            <button 
              type="button"
              className="buy-now"
              onClick=""
            >Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2 className="font-semibold">You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {productsData?.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
