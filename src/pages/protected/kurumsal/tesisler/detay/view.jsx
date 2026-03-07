import { useState, useCallback } from "react";
import { useTabs } from "minimal-shared/hooks";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { paths } from "src/routes/paths";

import { DashboardContent } from "src/pages/protected/layout";
import { TOUR_DETAILS_TABS, TOUR_PUBLISH_OPTIONS } from "src/_mock";

import { Label } from "src/components/label";

import { TourDetailsContent } from "./components/tour-details-content";
import { TourDetailsBookers } from "./components/tour-details-bookers";
import { TourDetailsToolbar } from "./components/tour-details-toolbar";
import { idParam } from "src/routes/param";

// ----------------------------------------------------------------------

export function TourDetailsView({ tour }) {
  const [publish, setPublish] = useState(tour?.publish);

  const tabs = useTabs("content");

  const handleChangePublish = useCallback((newValue) => {
    setPublish(newValue);
  }, []);

  const renderToolbar = () => (
    <TourDetailsToolbar
      backHref={paths.anasayfa.kurumsal.tesisler.root}
      editHref={idParam(paths.anasayfa.kurumsal.tesisler.duzenle, tour?.id)}
      liveHref="#"
      publish={publish || ""}
      onChangePublish={handleChangePublish}
      publishOptions={TOUR_PUBLISH_OPTIONS}
    />
  );

  const renderTabs = () => (
    <Tabs value={tabs.value} onChange={tabs.onChange} sx={{ mb: { xs: 2, md: 3 } }}>
      {TOUR_DETAILS_TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            tab.value === "bookers" ? <Label variant="filled">{tour?.bookers.length}</Label> : ""
          }
        />
      ))}
    </Tabs>
  );

  return (
    <DashboardContent>
      {renderToolbar()}

      {renderTabs()}
      {tabs.value === "content" && <TourDetailsContent tour={tour} />}
      {tabs.value === "bookers" && <TourDetailsBookers bookers={tour?.bookers} />}
    </DashboardContent>
  );
}
