export const STATUS_TABS = [
  { value: "all", label: "Tümü" },
  { value: "in_progress", label: "Devam eden" },
  { value: "upcoming", label: "Yaklaşan" },
  { value: "blocked", label: "Engellenen" },
  { value: "completed", label: "Tamamlanan" },
];

export const STATUS_OPTIONS = [
  { value: "in_progress", label: "Devam eden" },
  { value: "upcoming", label: "Yaklaşan" },
  { value: "blocked", label: "Engellenen" },
  { value: "completed", label: "Tamamlanan" },
];

export const STATUS_COLORS = {
  in_progress: "success",
  completed: "info",
  blocked: "error",
  upcoming: "warning",
};

export const STATUS_KEYS = ["in_progress", "upcoming", "blocked", "completed"];

export function getStatusName(status) {
  return STATUS_TABS.find((option) => option.value === status)?.label || "Unknown";
}

export function getStatusValue(label) {
  return STATUS_TABS.find((option) => option.label === label)?.value || "all";
}

export function getStatusColor(status) {
  return STATUS_COLORS[status] || "default";
}
