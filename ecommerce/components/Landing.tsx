import React from 'react'
import { client } from "../lib/client";

const Landing = () => {
    interface getServerSideProps {
        query: [],
        bannerQuery: []
    }

    const query = `*[_type == "product"]`;
    const products = client.fetch(query);

    const bannerQuery = '*[_type == "banner"]';
    const bannerData = client.fetch(bannerQuery);

    console.log(bannerData)
    console.log(products)

    return {
        props: { products, bannerData }
    };
}

export default Landing;