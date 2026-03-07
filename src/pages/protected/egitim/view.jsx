import { varAlpha } from "minimal-shared/utils";

import Box from "@mui/material/Box";
import { cardClasses } from "@mui/material/Card";

import { CONFIG } from "src/global-config";
import { DashboardContent } from "src/pages/protected/layout";
import { _coursesContinue, _coursesFeatured, _coursesReminder } from "src/_mock";

import { CourseProgress } from "./components/course-progress";
import { CourseContinue } from "./components/course-continue";
import { CourseFeatured } from "./components/course-featured";
import { CourseReminders } from "./components/course-reminders";
import { CourseMyAccount } from "./components/course-my-account";
import { CourseHoursSpent } from "./components/course-hours-spent";
import { CourseMyStrength } from "./components/course-my-strength";
import { CourseWidgetSummary } from "./components/course-widget-summary";

// ----------------------------------------------------------------------

export function OverviewCourseView() {
  return (
    <DashboardContent
      maxWidth={false}
      disablePadding
      sx={[
        (theme) => ({
          borderTop: { lg: `solid 1px ${varAlpha(theme.vars.palette.grey["500Channel"], 0.12)}` },
        }),
      ]}
    >
      <Box sx={{ display: "flex", flex: "1 1 auto", flexDirection: { xs: "column", lg: "row" } }}>
        <Box
          sx={[
            (theme) => ({
              gap: 3,
              display: "flex",
              minWidth: { lg: 0 },
              py: { lg: 3, xl: 5 },
              flexDirection: "column",
              flex: { lg: "1 1 auto" },
              px: { xs: 2, sm: 3, xl: 5 },
              borderRight: {
                lg: `solid 1px ${varAlpha(theme.vars.palette.grey["500Channel"], 0.12)}`,
              },
            }),
          ]}
        >
          <Box
            sx={{
              gap: 3,
              display: "grid",
              gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(3, 1fr)" },
            }}
          >
            <CourseWidgetSummary
              title="Devam Eden Eğitimler"
              total={6}
              icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-progress.svg`}
            />

            <CourseWidgetSummary
              title="Tamamlanan Eğitimler"
              total={3}
              color="success"
              icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-completed.svg`}
            />

            <CourseWidgetSummary
              title="Sertifikalar"
              total={2}
              color="secondary"
              icon={`${CONFIG.assetsDir}/assets/icons/courses/ic-courses-certificates.svg`}
            />
          </Box>

          <CourseHoursSpent
            title="Harcanan Zaman"
            chart={{
              series: [
                {
                  name: "Weekly",
                  categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
                  data: [{ data: [10, 41, 35, 151, 49] }],
                },
                {
                  name: "Monthly",
                  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
                  data: [{ data: [83, 112, 119, 88, 103, 112, 114, 108, 93] }],
                },
                {
                  name: "Yearly",
                  categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
                  data: [{ data: [24, 72, 64, 96, 76, 41] }],
                },
              ],
            }}
          />

          <Box
            sx={{
              gap: 3,
              display: "grid",
              alignItems: "flex-start",
              gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(2, 1fr)" },
            }}
          >
            <CourseProgress
              title="Süreç"
              chart={{
                series: [
                  { label: "Bekliyor", value: 45 },
                  { label: "Devam Eden", value: 25 },
                  { label: "Tamamlandı", value: 20 },
                ],
              }}
            />

            <CourseContinue title="Devam Eden Eğitimler" list={_coursesContinue} />
          </Box>

          <CourseFeatured title="Öne Çıkan Eğitimler" list={_coursesFeatured} />
        </Box>

        <Box
          sx={{
            width: 1,
            display: "flex",
            flexDirection: "column",
            px: { xs: 2, sm: 3, xl: 5 },
            pt: { lg: 8, xl: 10 },
            pb: { xs: 8, xl: 10 },
            flexShrink: { lg: 0 },
            gap: { xs: 3, lg: 5, xl: 8 },
            maxWidth: { lg: 320, xl: 360 },
            bgcolor: { lg: "background.neutral" },
            [`& .${cardClasses.root}`]: {
              p: { xs: 3, lg: 0 },
              boxShadow: { lg: "none" },
              bgcolor: { lg: "transparent" },
            },
          }}
        >
          <CourseMyAccount />

          <CourseMyStrength
            title="Kazanımlar"
            chart={{
              categories: ["English", "History", "Physics", "Geography", "Chinese", "Math"],
              series: [{ data: [80, 50, 30, 40, 100, 20] }],
            }}
          />

          <CourseReminders title="Hatırlatıcı" list={_coursesReminder} />
        </Box>
      </Box>
    </DashboardContent>
  );
}
