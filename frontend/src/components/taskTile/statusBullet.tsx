import React from "react";

interface StatusBulletProps {
  onClick: () => void;
  done: boolean;
}

const StatusBullet: React.FC<StatusBulletProps> = ({ onClick, done }) => {
  return (
    <div
      onClick={onClick}
      style={{ minWidth: "1.5rem", minHeight: "1.5rem" }}
      className={
        "flex justify-center items-center mr-4 border-gray-400 rounded-full cursor-pointer transition-all duration-300 " +
        (done ? "bg-yellow-400" : "border")
      }
    >
      {done && <img className="w-3 h-3" src="/icons/check-mark.svg" alt="" />}
    </div>
  );
};

export default StatusBullet;
