import { Helmet } from "react-helmet-async";

import { useParams } from "src/routes/hooks";

import { CONFIG } from "src/global-config";
import { useGetProduct } from "src/lib/actions/product";

import { ProductEditView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Product edit | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const { id } = useParams();

  const { product } = useGetProduct(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProductEditView product={product} />
    </>
  );
}
