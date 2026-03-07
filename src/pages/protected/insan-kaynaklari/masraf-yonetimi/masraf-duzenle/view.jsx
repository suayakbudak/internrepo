import { paths } from "src/routes/paths";

import { DashboardContent } from "src/pages/protected/layout";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

import { InvoiceNewEditForm } from "./components/invoice-new-edit-form";

// ----------------------------------------------------------------------

export function InvoiceEditView({ invoice }) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Masraf Düzenle"
        backHref={paths.anasayfa.insanKaynaklari.masraflar.root}
        links={[
          { name: "Anasayfa", href: paths.anasayfa.root },
          { name: "Masraf Yönetimi", href: paths.anasayfa.admin.insanKaynaklari.masraflar.root },
          { name: invoice?.invoiceNumber },
        ]}
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <InvoiceNewEditForm currentInvoice={invoice} />
    </DashboardContent>
  );
}
