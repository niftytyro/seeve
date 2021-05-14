export enum SectionState {
  _active = "_active",
  _hover = "_hover",
  _inactive = "_inactive",
}

export const SectionStateColors = {
  _active: "#FFF",
  _hover: "#000",
  _inactive: "A5A8B1",
};

export const sidebarSectionsList = [
  "Dashboard",
  "Tasks",
  "Goals",
  "Projects",
  "Schedule",
  "Reminders",
];

export const API_URL = "http://localhost:8000";

export interface Task {
  id: number;
  done: boolean;
  title: string;
}
