"use client";
import ProductTile from "./ProductTile";
import ProductButton from "./ProductButton";
import { useContext, useEffect, useState } from "react";
import Notification from "../Nofication";
import { GlobalContext } from "@/context";
import { PulseLoader } from "react-spinners";

const CommonListing = ({ data }) => {
  const [adminData, setAdminData] = useState({
    isLoading: true,
    data: [],
  });

  const { setPageLevelLoader, pageLevelLoader } = useContext(GlobalContext);

  useEffect(() => {
    const admindata = data;
    setAdminData({
      isLoading: false,
      data: admindata,
    });
    setPageLevelLoader(false);
  }, []);

  console.log(adminData.data);

  if (adminData.isLoading) {
    setPageLevelLoader(true);
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <section className="bg-[#C08261] py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
          {adminData.data && adminData.data.length
            ? adminData.data.map((item) => (
                <article
                  className="flex flex-col justify-between overflow-hidden shadow-xl cursor-pointer"
                  key={item._id}
                >
                  <ProductTile item={item} />
                  <ProductButton item={item} />
                </article>
              ))
            : "No products are uploaded"}
        </div>
      </div>
      <Notification />
    </section>
  );
};

export default CommonListing;
