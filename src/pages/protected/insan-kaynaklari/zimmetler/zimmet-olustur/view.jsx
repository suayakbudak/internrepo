import { paths } from "src/routes/paths";

import { DashboardContent } from "src/pages/protected/layout";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

import { ProductNewEditForm } from "./components/product-new-edit-form";

// ----------------------------------------------------------------------

export function ProductCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Zimmet Oluştur"
        links={[
          { name: "Anasayfa", href: paths.anasayfa.root },
          { name: "İnsan Kaynakları", href: paths.anasayfa.admin.insanKaynaklari.zimmetler.root },
          { name: "Zimmet Oluştur" },
        ]}
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <ProductNewEditForm />
    </DashboardContent>
  );
}
