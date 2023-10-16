"use client";

import Listing from "@/components/CommonListing/Listing";
import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/servises/product";
import { useContext, useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";
export default function AllProducts() {
  const [allProducts, setAllProducts] = useState({
    loading: true,
    data: [],
  });

  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);

  useEffect(() => {
    const getAllProducts = async () => {
      const res = await getAllAdminProducts();
      setAllProducts({
        loading: false,
        data: res,
      });
      setPageLevelLoader(false);
    };
    getAllProducts();
  }, []);

  if (allProducts.loading) {
    setPageLevelLoader(true);
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#fff"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return <Listing data={allProducts.data.data} />;
}
