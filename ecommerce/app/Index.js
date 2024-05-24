import React from "react";
import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";
import { getAllData } from './utils';

const Home = ({products, bannerData}) => (
  <>
    <HeroBanner />
        <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations, there are more</p>
        </div>

        <div className="products-container">
        {products?.map((product) => product.name)}
        </div>
    <FooterBanner />
  </>
);

export const getServerSideProps = async () => {
  const query = `*[_type == "product"]`;
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

    console.log(bannerData)
    console.log(products)

  return {
    props: { products, bannerData }
  };
};

export default Home;