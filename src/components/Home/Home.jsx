import React from "react";
import LatestProducts from "../LatestProducts/LatestProducts";

const latestProductPromise = fetch(
  "http://localhost:5000/latest-products"
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
