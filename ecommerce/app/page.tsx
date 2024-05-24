"use client"

import React from "react";
import { Product, FooterBanner, HeroBanner } from "../components";
import { getAllData } from './utils';
import { useEffect, useState } from 'react';

function Home() {
  const [bannerData, setBannerData] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { bannerData, products } = await getAllData();
      setBannerData(bannerData);
      setProducts(products);

      console.log(bannerData);
      console.log(products);
    }
    fetchData();
  }, []);

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations, there are more</p>
      </div>

      <div className="products-container">
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </>
  )
  
};

export default Home;