import { useState, useCallback } from "react";
import { useParams } from "src/routes/hooks";
import { paths } from "src/routes/paths";

import { DashboardContent } from "src/pages/protected/layout";
import { JOB_PUBLISH_OPTIONS, _jobs } from "src/_mock";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import { RouterLink } from "src/routes/router-link";
import { JobDetailsToolbar } from "./components/job-details-toolbar";
import { JobDetailsContent } from "./components/job-details-content";
import { idParam } from "src/routes/param";

// ----------------------------------------------------------------------

export function JobDetailsView() {
  const { id = "" } = useParams();
  
  // URL'den gelen ID ile ilanı bul
  const currentJob = _jobs.find((job) => job.id === id);
  
  // İlan bulunamazsa varsayılan değer
  const job = currentJob || _jobs[0];
  
  const [publish, setPublish] = useState(job?.publish || 'published');

  const handleChangePublish = useCallback((newValue) => {
    setPublish(newValue);
  }, []);

  const renderToolbar = () => (
    <JobDetailsToolbar
      backHref={paths.anasayfa.kurumsal.ilanlar.root}
      editHref={idParam(paths.anasayfa.kurumsal.ilanlar.duzenle, job?.id)}
      liveHref="#"
      publish={publish || ""}
      onChangePublish={handleChangePublish}
      publishOptions={JOB_PUBLISH_OPTIONS}
    />
  );

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="İlan Açıklaması"
        links={[
          { name: "Anasayfa", href: paths.anasayfa.root },
          { name: "İlanlar", href: paths.anasayfa.kurumsal.ilanlar.root},
          { name: job?.title || "İlan", component: RouterLink} 
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {renderToolbar()}
      <JobDetailsContent job={job} />
    </DashboardContent>
  );
}