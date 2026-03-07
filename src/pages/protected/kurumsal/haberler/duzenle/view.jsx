import { paths } from "src/routes/paths";

import { DashboardContent } from "src/pages/protected/layout";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";

import { PostNewEditForm } from "./components/post-new-edit-form";

// ----------------------------------------------------------------------

export function PostEditView({ post }) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Haber Düzenle"
        backHref={paths.anasayfa.kurumsal.haberler.root}
        links={[
          { name: "Anasayfa", href: paths.anasayfa.root },
          { name: "Haberler", href: paths.anasayfa.kurumsal.haberler.root },
          { name: "Düzenle: " + post?.title },
        ]}
        sx={{ mb: { xs: 2, md: 3 } }}
      />

      <PostNewEditForm currentPost={post} />
    </DashboardContent>
  );
}
