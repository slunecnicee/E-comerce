import Listing from "@/components/CommonListing/Listing";
import { getAllAdminProducts } from "@/servises/product";

const AdminAllProducts = async () => {
  const allAdminProducts = await getAllAdminProducts();
  console.log(allAdminProducts);

  return <Listing data={allAdminProducts.data} />;
};

export default AdminAllProducts;
