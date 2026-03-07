import { paths } from "src/routes/paths";

import { DashboardContent } from "src/pages/protected/layout";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

import { PostNewEditForm } from "../duzenle/components/post-new-edit-form";

// ----------------------------------------------------------------------

export function PostCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Haber Oluştur"
        backHref={paths.anasayfa.kurumsal.haberler.root}
        links={[
          { name: "Anasayfa", href: paths.anasayfa.root },
          { name: "Haberler", href: paths.anasayfa.kurumsal.haberler.root },
          { name: "Haber Oluştur" },
        ]}
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <PostNewEditForm />
    </DashboardContent>
  );
}
