import React from "react";

interface ChipProps {
  iconSrc: string;
  value: string | null;
  label: string;
  onCancel: () => void;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const Chip: React.FC<ChipProps> = ({
  iconSrc,
  label,
  value,
  onCancel,
  onClick,
}) => {
  return (
    <div
      className={
        "flex items-center flex-grow-0 w-max py-2 px-4 mt-4 mr-8 font-medium text-gray-400 border rounded-lg cursor-pointer " +
        (value ? "border-black" : "")
      }
    >
      <div className="w-5 h-5 mr-2" onClick={onClick}>
        <img src={iconSrc} alt="" />
      </div>
      {value ? (
        <div onClick={onClick} className="text-black">
          {value}
        </div>
      ) : (
        <div onClick={onClick}>Pick a {label}</div>
      )}
      {value && (
        <div onClick={onCancel} className="ml-2 text-black">
          &#10005;
        </div>
      )}
    </div>
  );
};

export default Chip;
