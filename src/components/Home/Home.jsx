import React from "react";
import LatestProducts from "../LatestProducts/LatestProducts";

const latestProductPromise = fetch(
  "https://smart-deals-api-server-two.vercel.app/latest-products"
).then((res) => res.json());

const Home = () => {
  return (
    <div>
      <p>home</p>
      <LatestProducts
        latestProductPromise={latestProductPromise}
      ></LatestProducts>
    </div>
  );
};

export default Home;
