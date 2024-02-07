"use client";

import Listing from "@/components/CommonListing/Listing";
import { getAllAdminProducts } from "@/servises/product";
import { useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import axios from "axios";
export default function AllProducts() {
  const [allProducts, setAllProducts] = useState({
    loading: true,
    data: [],
  });

  useEffect(() => {
    const getAllProducts = async () => {
      axios
        .get("https://e-comerce-iota-five.vercel.app/api/admin/all-products")
        .then((res) => {
          setAllProducts({
            loading: false,
            data: res.data.data,
          });
        })
        .catch((err) => {
          console.log(err);
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
