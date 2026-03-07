import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { varAlpha } from "minimal-shared/utils";
import { Label } from "src/components/label";
import { getStatusColor, STATUS_KEYS, STATUS_TABS } from "../../utils";

export function ProjectTableTabsBar({ handleFilterStatus, currentFilters, tableData }) {
  return (
    <Tabs
      value={currentFilters.status}
      onChange={handleFilterStatus}
      sx={[
        (theme) => ({
          px: 2.5,
          boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey["500Channel"], 0.08)}`,
        }),
      ]}
    >
      {STATUS_TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            <Label
              variant={tab.value === currentFilters.status ? "filled" : "soft"}
              color={getStatusColor(tab.value)}
            >
              {STATUS_KEYS.includes(tab.value)
                ? tableData.filter((user) => user.status === tab.value).length
                : tableData.length}
            </Label>
          }
        />
      ))}
    </Tabs>
  );
}
