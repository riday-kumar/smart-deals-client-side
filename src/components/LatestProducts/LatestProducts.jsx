import React, { use } from "react";
import ProductCard from "../ProductCard/ProductCard";

const LatestProducts = ({ latestProductPromise }) => {
  const products = use(latestProductPromise);

  return (
    <div>
      <h2 className="text-5xl text-center">
        Recent <span className="text-primary">Products</span>
      </h2>
      <div className="grid grid-cols-3 gap-5">
        {products.map((product, index) => (
          <ProductCard key={index} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
