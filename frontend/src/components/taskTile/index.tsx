import { Moment } from "moment";
import React, { useState } from "react";
import TaskModal from "../modal/taskModal";

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
          "flex justify-between items-center px-4 py-4 my-2 text-lg cursor-pointer rounded-lg transition duration-300 hover:bg-gray-100 " +
          (done ? "text-gray-500" : "")
        }
      >
        <div
          className={
            "flex items-center w-full " + (done ? "line-through " : "")
          }
        >
          <div
            onClick={() => updateTask(idx, !done, title, date, time)}
            style={{ minWidth: "1.5rem", minHeight: "1.5rem" }}
            className={
              "flex justify-center items-center mr-4 border-gray-400 rounded-full cursor-pointer transition-all duration-300 " +
              (done ? "bg-yellow-400" : "border")
            }
          >
            {done && (
              <img className="w-3 h-3" src="/icons/check-mark.svg" alt="" />
            )}
          </div>
          <div
            onClick={() => {
              setUpdateModalIsOpen(true);
            }}
            className="flex-1"
          >
            <div
              className={
                "w-4/5 transition-all " +
                (hoverIdx === idx
                  ? ""
                  : "overflow-x-hidden whitespace-nowrap overflow-ellipsis")
              }
            >
              {title}
            </div>
          </div>
        </div>
        {idx === hoverIdx && (
          <div
            onClick={() => deleteTask(idx)}
            className="h-full px-5 transition-all duration-300"
          >
            &#10005;
          </div>
        )}
      </div>
    </>
  );
};

export default TaskTile;
