import React from "react";

interface TitleProps {
  onClick: () => void;
  isHover: boolean;
  title: string;
}

const Title: React.FC<TitleProps> = ({ onClick, isHover, title }) => {
  return (
    <div onClick={onClick} className="flex-1">
      <div
        className={
          "w-4/5 " +
          (isHover
            ? ""
            : "overflow-x-hidden whitespace-nowrap overflow-ellipsis")
        }
      >
        {title}
      </div>
    </div>
  );
};

export default Title;
