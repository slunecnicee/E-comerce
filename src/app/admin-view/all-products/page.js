import CommonListing from "@/components/CommonListing";
import { getAllAdminProducts } from "@/servises/product";

const AdminAllProducts = async () => {
  const allAdminProducts = await getAllAdminProducts();
  console.log(allAdminProducts);

  return <CommonListing data={allAdminProducts.data} />;
};

export default AdminAllProducts;
