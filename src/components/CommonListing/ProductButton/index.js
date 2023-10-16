"use client";

import { useContext } from "react";
import { GlobalContext } from "@/context";
import { usePathname, useRouter } from "next/navigation";
import { deleteAProduct } from "@/servises/product";
import ComponentLevelLoader from "@/components/Loader/componentLevel";
import { toast } from "react-toastify";
import { addToCart } from "@/servises/cart";

const ProductButton = ({ item }) => {
  const pathName = usePathname();
  const {
    setCurrentUpdatedProduct,
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);
  const router = useRouter();
  const isAdminView = pathName.includes("admin-view");

  const handleDelete = async (item) => {
    setComponentLevelLoader({ loading: true, id: item._id });

    const res = await deleteAProduct(item._id);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      window.location.reload();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  };

  const handleAddToCart = async (getItem) => {
    setComponentLevelLoader({ loading: true, id: getItem._id });

    const res = await addToCart({ productID: getItem._id, userID: user._id });

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    }
    console.log(res);
  };

  return isAdminView ? (
    <>
      {" "}
      <button
        onClick={() => {
          setCurrentUpdatedProduct(item);
          router.push("/admin-view/add-products");
        }}
        className=" mt-1.5 flex w-full justify-center bg-[#F2ECBE] px-5 py-3 text-xs font-medium uppercase tracking-wide text-yellow-900 "
      >
        Update
      </button>{" "}
      <button
        onClick={() => handleDelete(item)}
        className="mt-1.5 flex w-full justify-center bg-[#F2ECBE] px-5 py-3 text-xs font-medium uppercase tracking-wide text-yellow-900"
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            text={"Deleting Product"}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "DELETE"
        )}
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => handleAddToCart(item)}
        className="mt-1.5 flex w-full justify-center bg-[#F2ECBE] px-5 py-3 text-xs font-bold uppercase tracking-wide text-yellow-900"
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        componentLevelLoader.id === item._id ? (
          <ComponentLevelLoader
            text={"Adding to cart"}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "Add To Cart"
        )}
      </button>
    </>
  );
};

export default ProductButton;
