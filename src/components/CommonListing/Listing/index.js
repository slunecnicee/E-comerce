"use client";

import { useRouter } from "next/navigation";
import ProductButton from "../ProductButton";
import ProductTile from "../ProductTile";
import { useEffect } from "react";
import Notification from "@/components/Nofication";

export default function Listing({ data }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <section className="bg-[#C08261] py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
          {data ? (
            data.data.map((item) => (
              <article
                className="relative justify-between flex flex-col overflow-hidden shadow-xl cursor-pointer"
                key={item._id}
              >
                <ProductTile
                  onClick={() => router.push(`/product/${item._id}`)}
                  item={item}
                />
                <ProductButton item={item} />
              </article>
            ))
          ) : (
            <div className="w-screen h-full bg-inherit flex items-center justify-center font-bold text-xl color-black-900">
              {" "}
              No Products With this Category
            </div>
          )}
        </div>
      </div>
      <Notification />
    </section>
  );
}
