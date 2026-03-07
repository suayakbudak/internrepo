import { paths } from "src/routes/paths";

import { DashboardContent } from "src/pages/protected/layout";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

import { InvoiceNewEditForm } from "../masraf-duzenle/components/invoice-new-edit-form";

// ----------------------------------------------------------------------

export function InvoiceCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Masraf Oluştur"
        links={[
          { name: "Anasayfa", href: paths.anasayfa.root },
          { name: "Masraf Yönetimi", href: paths.anasayfa.admin.insanKaynaklari.masraflar.root },
          { name: "Masraf Oluştur" },
        ]}
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <InvoiceNewEditForm />
    </DashboardContent>
  );
}
