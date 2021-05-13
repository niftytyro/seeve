import React from "react";

interface TaskTileProps {
  done: boolean;
  hoverIdx: number;
  idx: number;
  title: string;
  deleteTask: (idx: number) => void;
  setHoverIdx: React.Dispatch<React.SetStateAction<number>>;
  toggleTaskStatus: (idx: number) => void;
}

const TaskTile: React.FC<TaskTileProps> = ({
  done,
  hoverIdx,
  idx,
  title,
  deleteTask,
  setHoverIdx,
  toggleTaskStatus,
}) => {
  return (
    <div
      onMouseOver={() => setHoverIdx(idx)}
      onMouseLeave={() => setHoverIdx(-1)}
      className={
        "flex justify-between items-center px-4 py-4 my-4 text-lg cursor-pointer rounded-lg transition duration-300 hover:bg-gray-100 " +
        (done ? "text-gray-500" : "")
      }
    >
      <div
        onClick={() => toggleTaskStatus(idx)}
        className={"flex items-center w-full " + (done ? "line-through " : "")}
      >
        <div
          className={
            "flex justify-center items-center w-6 h-6 mr-4 border-gray-400 rounded-full cursor-pointer transition-all duration-300 " +
            (done ? "bg-yellow-400" : "border")
          }
        >
          {done && (
            <img className="w-3 h-3" src="/icons/check-mark.svg" alt="" />
          )}
        </div>
        {title}
      </div>
      {idx === hoverIdx && (
        <div
          onClick={() => deleteTask(idx)}
          className="transition-all duration-300"
        >
          &#10005;
        </div>
      )}
    </div>
  );
};

export default TaskTile;
