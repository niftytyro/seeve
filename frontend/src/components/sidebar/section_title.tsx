import React from "react";
import { SectionState } from "../../utils";

interface SectionTitleProps {
  index: number;
  onClick: Function;
  onHoverIn: Function;
  onHoverOut: Function;
  state: SectionState;
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  index,
  onClick,
  onHoverIn,
  onHoverOut,
  state,
  title,
}) => {
  return (
    <div
      onMouseEnter={() => {
        onHoverIn(index);
      }}
      onMouseLeave={() => {
        onHoverOut(index);
      }}
      onClick={() => {
        onClick(index);
      }}
      className={`flex flex-row items-center px-6 py-4 my-1 bg-${state} cursor-pointer rounded-xl transition-all duration-150`}
    >
      <div className="w-5 mr-6">
        <img
          src={`${process.env.PUBLIC_URL}/icons/${title}${state}.svg`}
          alt={title}
        />
      </div>
      <div className={`mr-6 text-${state}`}>{title}</div>
    </div>
  );
};

export default SectionTitle;
