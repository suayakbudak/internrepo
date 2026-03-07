import { paths } from "src/routes/paths";

import { DashboardContent } from "src/pages/protected/layout";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

import { ProductNewEditForm } from "../zimmet-olustur/components/product-new-edit-form";

// ----------------------------------------------------------------------

export function ProductEditView({ product }) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Zimmet Düzenle"
        backHref={paths.anasayfa.insanKaynaklari.zimmetler.root}
        links={[
          { name: "Anasayfa", href: paths.anasayfa.root },
          { name: "İnsan Kaynakları", href: paths.anasayfa.admin.insanKaynaklari.zimmetler.root },
          { name: product?.name },
        ]}
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <ProductNewEditForm currentProduct={product} />
    </DashboardContent>
  );
}
