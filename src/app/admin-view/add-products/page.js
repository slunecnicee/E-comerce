"use client";
import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import { AvailableSizes, firebaseStroageURL } from "@/utils";
import { adminAddProductformControls } from "@/utils";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseConfig } from "@/utils";
import { useState, useEffect, useContext } from "react";
import { addNewProduct, updateAProduct } from "@/servises/product";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import ComponentLevelLoader from "@/components/Loader/componentLevel";
import Notification from "@/components/Nofication";
import { useRouter } from "next/navigation";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

async function helperForUPloadingImageToFirebase(file) {
  const getFileName = createUniqueFileName(file);
  const storageReference = ref(storage, `ecommerce/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
}

const initialFormData = {
  name: "",
  price: 0,
  description: "",
  category: "men",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  imageUrl: "",
  priceDrop: 0,
  userId: "",
};

const AdminAddNewProduct = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [currentUSer, setCurrentUser] = useState("");
  const {
    componentLevelLoader,
    setComponentLevelLoader,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
  } = useContext(GlobalContext);

  const router = useRouter();

  useEffect(() => {
    localStorage.getItem("user");
    const userr = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(userr._id);
  }, [currentUSer]);

  useEffect(() => {
    if (currentUpdatedProduct !== null) {
      setFormData({
        ...currentUpdatedProduct,
        userId: currentUSer,
      });
    }
  }, [currentUpdatedProduct]);

  async function handleImage(e) {
    const extractImageUrl = await helperForUPloadingImageToFirebase(
      e.target.files[0]
    );
    if (extractImageUrl !== "") {
      setFormData({
        ...formData,
        imageUrl: extractImageUrl,
      });
    }
  }

  const handleTileClick = (getCurrentItem) => {
    let cpySizes = [...formData.sizes];
    const index = cpySizes.findIndex((item) => item.id === getCurrentItem.id);

    if (index === -1) {
      cpySizes.push(getCurrentItem);
    } else {
      cpySizes = cpySizes.filter((item) => item.id !== getCurrentItem.id);
    }

    setFormData({
      ...formData,
      sizes: cpySizes,
    });
  };

  async function handleAddProduct() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res =
      currentUpdatedProduct !== null
        ? await updateAProduct({ ...formData, userId: currentUSer })
        : await addNewProduct({ ...formData, userId: currentUSer });

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setFormData(initialFormData);
      setCurrentUpdatedProduct(null);
      setTimeout(() => {
        router.push("/admin-view/all-products");
      }, 1000);
      setTimeout(() => {
        window.location.reload();
      }, 1300);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  return (
    <div className="w-full  mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col items-start justify-start p-10 bg-transparent shadow-2xl rounded-xl relative">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
          <input
            accept="image/*"
            max="1000000"
            type="file"
            onChange={handleImage}
          />

          <div className="flex gap-2 flex-col">
            <label>Available sizes</label>
            <TileComponent
              data={AvailableSizes}
              onClick={handleTileClick}
              selected={formData.sizes}
            />
          </div>
          {adminAddProductformControls.map((item) =>
            item.componentType === "input" ? (
              <InputComponent
                type={item.type}
                placeholder={item.placeholder}
                label={item.label}
                value={formData[item.id]}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [item.id]: event.target.value,
                  });
                }}
              />
            ) : item.componentType === "select" ? (
              <SelectComponent
                value={formData[item.id]}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [item.id]: event.target.value,
                  });
                }}
                label={item.label}
                options={item.options}
              />
            ) : null
          )}
          <button
            onClick={handleAddProduct}
            className="inline-flex w-full items-center justify-center bg-[#C08261] px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
          >
            {componentLevelLoader && componentLevelLoader.loading ? (
              <ComponentLevelLoader
                text={
                  currentUpdatedProduct !== null
                    ? "Updating Product"
                    : "Adding Product"
                }
                color={"#ffffff"}
                loading={componentLevelLoader && componentLevelLoader.loading}
              />
            ) : currentUpdatedProduct !== null ? (
              "Update Product"
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default AdminAddNewProduct;
