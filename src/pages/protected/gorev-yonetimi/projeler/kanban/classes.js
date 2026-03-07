import { createClasses } from "src/assets/theme/create-classes";

// ----------------------------------------------------------------------

export const kanbanClasses = {
  item: createClasses("kanban__item"),
  column: createClasses("kanban__column"),
  itemWrap: createClasses("kanban__item__wrap"),
  columnList: createClasses("kanban__column_list"),
  state: {
    fadeIn: "--fade-in",
    sorting: "--sorting",
    dragging: "--dragging",
    disabled: "--disabled",
    dragOverlay: "--drag-overlay",
    overContainer: "--over-container",
  },
};

export const cssVars = {
  "--item-gap": "16px",
  "--item-radius": "12px",
  "--column-gap": "24px",
  "--column-width": "336px",
  "--column-radius": "16px",
  "--column-padding": "20px 16px 16px 16px",
};
