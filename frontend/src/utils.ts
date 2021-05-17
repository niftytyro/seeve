import moment from "moment";
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

export const getCalendarData: (
  month: number,
  year: number
) => [number, string][] = (month: number, year: number) => {
  const date = moment(new Date(year, month));
  const numberOfDaysFromPreviousMonth = date.day();
  const lastDateInPreviousMonth = date.add(-1, "day").date();
  const daysFromPreviousMonth: [number, string][] = Array.from(
    Array(numberOfDaysFromPreviousMonth).keys()
  ).map((date) => [
    date + lastDateInPreviousMonth - numberOfDaysFromPreviousMonth + 1,
    "prev",
  ]);
  const lastDateInCurrentMonth = moment(new Date(year, month + 1)).add(
    -1,
    "day"
  );
  const daysFromCurrentMonth: [number, string][] = Array.from(
    Array(lastDateInCurrentMonth.date()).keys()
  ).map((date) => [date + 1, "current"]);
  const numberOfDaysFromNextMonth = 6 - lastDateInCurrentMonth.day();
  const daysFromNextMonth: [number, string][] = Array.from(
    Array(numberOfDaysFromNextMonth).keys()
  ).map((date) => [date + 1, "next"]);

  return daysFromPreviousMonth
    .concat(daysFromCurrentMonth)
    .concat(daysFromNextMonth);
};

export const convertCalendarDataToColumns = (
  calendarData: [number, string][]
) => {
  const numberOfWeeks = calendarData.length / 7;
  const newCalendarData: [number, string][][] = [];
  for (let i: number = 0; i < 7; i++) {
    newCalendarData.push([]);
    for (let j: number = 0; j < numberOfWeeks; j++) {
      newCalendarData[i].push([
        calendarData[i + 7 * j][0],
        calendarData[i + 7 * j][1],
      ]);
    }
  }
  return newCalendarData;
};

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
