"use client";

import Listing from "@/components/CommonListing/Listing";
import { productByCategory } from "@/servises/product";
import { useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";
export default function OtherAllProducts() {
  const [allProducts, setAllProducts] = useState({
    loading: true,
    data: [],
  });

  useEffect(() => {
    const getAllProducts = async () => {
      const res = await productByCategory("other");
      setAllProducts({
        loading: false,
        data: res.data,
      });
    };
    getAllProducts();
  }, []);

  if (allProducts.loading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#fff"}
          loading={allProducts.loading}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return <Listing data={allProducts.data} />;
}
