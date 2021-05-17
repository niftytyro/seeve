import { Moment, monthsShort } from "moment";
import React, { useState } from "react";
import TaskModal from "../modal/taskModal";
import { DAYS_SHORT } from "../../utils";
import Title from "./title";
import StatusBullet from "./statusBullet";

interface TaskTileProps {
  date: Moment | null;
  time: Moment | null;
  done: boolean;
  hoverIdx: number;
  idx: number;
  title: string;
  deleteTask: (idx: number) => void;
  setHoverIdx: React.Dispatch<React.SetStateAction<number>>;
  updateTask: (
    idx: number,
    done: boolean,
    title: string,
    date: Moment | null,
    time: Moment | null
  ) => Promise<void>;
}

const TaskTile: React.FC<TaskTileProps> = ({
  date,
  time,
  done,
  hoverIdx,
  idx,
  title,
  deleteTask,
  setHoverIdx,
  updateTask,
}) => {
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newDate, setNewDate] = useState<Moment | null>(date);
  const [newTime, setNewTime] = useState<Moment | null>(time);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState<boolean>(false);

  return (
    <>
      <TaskModal
        save={async () => {
          updateTask(idx, done, newTitle, newDate, newTime);
          setNewTitle(newTitle.trim());
        }}
        closeModal={() => {
          setUpdateModalIsOpen(false);
          setNewTitle(newTitle.trim());
        }}
        date={newDate}
        isOpen={updateModalIsOpen}
        setDate={setNewDate}
        setTime={setNewTime}
        setTitle={setNewTitle}
        time={newTime}
        title={newTitle}
        modalTitle="Edit Task"
      />
      <div
        onMouseOver={() => setHoverIdx(idx)}
        onMouseLeave={() => setHoverIdx(-1)}
        className={
          "px-4 py-4 my-2 text-lg cursor-pointer rounded-lg transition duration-300 hover:bg-gray-100 " +
          (done ? "text-gray-500" : "")
        }
      >
        <div
          className={"flex items-center w-full " + (done ? "line-through" : "")}
        >
          <StatusBullet
            onClick={() => updateTask(idx, !done, title, date, time)}
            done={done}
          />
          <Title
            onClick={() => {
              setUpdateModalIsOpen(true);
            }}
            isHover={hoverIdx === idx}
            title={title}
          />
          {idx === hoverIdx && (
            <div
              onClick={() => deleteTask(idx)}
              className="h-full px-5 transition-all duration-300"
            >
              &#10005;
            </div>
          )}
        </div>
        <div onClick={() => setUpdateModalIsOpen(true)} className="flex ml-10">
          {newDate && (
            <div className="w-max mr-4 px-4 py-1 text-xs text-gray-500 font-medium border rounded-full">
              {DAYS_SHORT[newDate.day()]}, {newDate.date()}{" "}
              {monthsShort(newDate.month())}
            </div>
          )}
          {newTime && (
            <div className="w-max mr-4 px-4 py-1 text-xs text-gray-500 font-medium border rounded-full">
              {newTime.format("hh:mm a")}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskTile;
