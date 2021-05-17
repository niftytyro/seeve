import React from "react";
import {
  convertCalendarDataToColumns,
  DAYS_SHORT,
  getCalendarData,
} from "../../utils";

const DateSelector: React.FC = () => {
  return (
    <div className="flex justify-between w-full pt-4 text-right">
      {convertCalendarDataToColumns(
        getCalendarData(new Date().getMonth(), new Date().getFullYear())
      ).map((dateColumn, idx) => (
        <div>
          <div className="pb-4 text-gray-500 font-medium">
            {DAYS_SHORT[idx]}
          </div>
          {dateColumn.map((date) => (
            <div
              className={
                "py-1 font-medium " +
                (date[1] !== "current" ? "text-gray-300" : "")
              }
            >
              {date[0]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DateSelector;
