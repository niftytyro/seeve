import { months } from "moment";
import React, { useState } from "react";
import { DAYS } from "../../utils";

interface DayHeaderProps {
  openModal: () => void;
}

const DayHeader: React.FC<DayHeaderProps> = ({ openModal }) => {
  const [day] = useState<Date>(new Date());
  return (
    <div className="flex justify-between items-start w-3/4 pt-2 pb-4 m-auto">
      <div>
        <div className="text-3xl font-semibold text-gray-800">Today</div>
        <div className="text-xl font-medium text-gray-500">
          {DAYS[day.getDay()]}, {months(day.getMonth())} {day.getDate()}
        </div>
      </div>
      <button
        onClick={() => openModal()}
        className="px-6 py-4 bg-black text-white text-sm rounded-xl focus:outline-none"
      >
        <span className="mr-3 font-semibold text-lg">+</span>
        Add new task
      </button>
    </div>
  );
};

export default DayHeader;
