import { paths } from "src/routes/paths";

import { DashboardContent } from "src/pages/protected/layout";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

import { InvoiceDetails } from "./components/invoice-details";

// ----------------------------------------------------------------------

export function InvoiceDetailsView({ invoice }) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={invoice?.invoiceNumber}
        backHref={paths.anasayfa.admin.insanKaynaklari.masraflar.root}
        links={[
          { name: "Anasayfa", href: paths.anasayfa.root },
          { name: "Masraf Yönetimi", href: paths.anasayfa.admin.insanKaynaklari.masraflar.root },
          { name: invoice?.invoiceNumber },
        ]}
        sx={{ mb: 3 }}
      />

      <InvoiceDetails invoice={invoice} />
    </DashboardContent>
  );
}
