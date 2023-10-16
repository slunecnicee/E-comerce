import CommonDetails from "@/components/CommonDetails";
import { productById } from "@/servises/product";

export default async function ProductDetails({ params }) {
  const productDetailsData = await productById(params.details);

  return <CommonDetails item={productDetailsData && productDetailsData.data} />;
}
