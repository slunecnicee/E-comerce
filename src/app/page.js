"use client";

import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/servises/product";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);

  const [products, setProducts] = useState([]);
  const router = useRouter();

  async function getListOfProducts() {
    const res = await getAllAdminProducts();

    if (res.success) {
      setProducts(res.data);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="">
        <div className="grid max-w-screen-xl px-4 py-8 mx-suto  lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-[#9A3B3B] shadow-sm">
              Best Fashion Collection
            </h1>
            <p className="max-w-2xl mb-6 font-light text-[#C08261] first-line:lg:mb-8 md:text-lg lg:text-xl">
              Quisquemos sodales suscipit tortor ditaemcos condimentum de cosmo
              lacus meleifend menean diverra loremous.
            </p>

            <button
              type="button"
              onClick={() => router.push("/product/listing/all-products")}
              className="mt-1.5 inline-block px-5 py-3 text-xs font-medium uppercase tracking-wide text-white bg-[#C08261]"
            >
              Explore Shop Collection
            </button>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://i.pinimg.com/564x/99/f5/60/99f560f90e50ae84fbb8f6bb4e890556.jpg"
              alt="Explore Shop Collection"
            />
          </div>
        </div>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
            <div className="grid p-6 bg-[#C08261] rounded place-content-center sm:p-8">
              <div className="max-w-md mx-auto text-center lg:text-left">
                <div>
                  <h2 className="text-xl font-bold text-gray-200 sm:text-3xl">
                    Summer Sale Collection
                  </h2>
                </div>
                <button
                  onClick={() => router.push("/product/listing/all-products")}
                  className="mt-1.5 inline-block bg-[#9A3B3B] px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                >
                  Shop ALL
                </button>
              </div>
            </div>
            <div className="lg:col-span-2 lg:py-8">
              <ul className="grid grid-cols-2 gap-4">
                {products && products.length
                  ? products
                      .filter((item) => item.onSale === "yes")
                      .splice(0, 2)
                      .map((productItem) => (
                        <li
                          onClick={() =>
                            router.push(`/product/${productItem._id}`)
                          }
                          className="cursor-pointer"
                          key={productItem._id}
                        >
                          <div>
                            <img
                              src={productItem.imageUrl}
                              alt="Sale Product Item"
                              className="object-cover w-full rounded aspect-square"
                            />
                          </div>
                          <div className="mt-3">
                            <h3 className="font-medium text-gray-900">
                              {productItem.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-800">
                              ${productItem.price}{" "}
                              <span className="text-red-700">{`(-${productItem.priceDrop}%) Off`}</span>
                            </p>
                          </div>
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#9A3B3B] sm:text-3xl">
              SHOP BY DEPARTMENT
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
            <li>
              <div className="relative block group">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/slay-ecomerce.appspot.com/o/ecommerce%2FLadder%20Jacket.jpeg-1697414072092-afrkrkad3i?alt=media&token=5a5b7b31-18d3-4554-89ba-ed2b3f8b0f83"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white shadow-sm">
                    Celebrity Copies
                  </h3>
                  <button
                    onClick={() => router.push("/product/listing/celebward")}
                    className="mt-1.5 inline-block bg-[#9A3B3B] px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            <li>
              <div className="relative block group">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/slay-ecomerce.appspot.com/o/ecommerce%2Fcargo-pants-outfits.jpeg-1697414821229-3a98nvao1i?alt=media&token=d37e88c8-a020-48d5-9442-bb22fc56ef37"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium shadow-sm text-white">
                    Trending
                  </h3>
                  <button
                    onClick={() => router.push("/product/listing/trending")}
                    className="mt-1.5 inline-block bg-[#9A3B3B]  px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="relative block group">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/slay-ecomerce.appspot.com/o/ecommerce%2Fnackedwolfe.jpeg-1697414354206-flioqqp72n?alt=media&token=8827c030-9265-45f2-93d5-4cce7267ff74"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium shadow-xl text-white">
                    Many others
                  </h3>
                  <button
                    onClick={() => router.push("/product/listing/other")}
                    className="mt-1.5 inline-block bg-[#9A3B3B] px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
