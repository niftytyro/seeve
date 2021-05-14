import React, { useEffect, useState } from "react";

interface TaskTileProps {
  done: boolean;
  hoverIdx: number;
  idx: number;
  title: string;
  deleteTask: (idx: number) => void;
  setHoverIdx: React.Dispatch<React.SetStateAction<number>>;
  updateTask: (idx: number, done: boolean, title: string) => void;
}

const TaskTile: React.FC<TaskTileProps> = ({
  done,
  hoverIdx,
  idx,
  title,
  deleteTask,
  setHoverIdx,
  updateTask,
}) => {
  const [titleValue, setTitleValue] = useState<string>("");
  useEffect(() => {
    setTitleValue(title);
  }, [title]);
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
        className={"flex items-center w-full " + (done ? "line-through " : "")}
      >
        <div
          onClick={() => updateTask(idx, !done, title)}
          className={
            "flex justify-center items-center w-6 h-6 mr-4 border-gray-400 rounded-full cursor-pointer transition-all duration-300 " +
            (done ? "bg-yellow-400" : "border")
          }
        >
          {done && (
            <img className="w-3 h-3" src="/icons/check-mark.svg" alt="" />
          )}
        </div>
        <input
          className={"bg-transparent focus:outline-none"}
          onChange={(e) => setTitleValue(e.currentTarget.value)}
          value={titleValue}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
            }
          }}
          onBlur={() => {
            updateTask(idx, done, titleValue);
          }}
        />
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
  );
};

export default TaskTile;
