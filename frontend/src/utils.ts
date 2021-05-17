import { Moment } from "moment";

export enum SectionState {
  _active = "_active",
  _hover = "_hover",
  _inactive = "_inactive",
}

export const sidebarSectionsList = [
  "Dashboard",
  "Tasks",
  "Goals",
  "Projects",
  "Schedule",
  "Reminders",
];

export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const API_URL = "http://localhost:8000";

export interface Task {
  id: number;
  done: boolean;
  title: string;
  date: Moment | null;
  time: Moment | null;
}

export const fetchGetTasks = () => {
  return fetch(`${API_URL}/tasks`, { credentials: "include" });
};

export const fetchCreateTask = (
  title: string,
  date: Moment | null,
  time: Moment | null
) => {
  return fetch(`${API_URL}/tasks/create`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      date: date?.toDate(),
      time: time?.toDate(),
    }),
  });
};

export const fetchUpdateTask = (
  idx: number,
  title: string,
  done: boolean,
  date: Moment | null,
  time: Moment | null
) => {
  console.log(typeof date);

  return fetch(`${API_URL}/tasks/edit/${idx}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      done,
      date: date?.toDate(),
      time: time?.toDate(),
    }),
  });
};

export const fetchDeleteTask = (idx: number) => {
  return fetch(`${API_URL}/tasks/delete/${idx}`, {
    method: "POST",
    credentials: "include",
  });
};
