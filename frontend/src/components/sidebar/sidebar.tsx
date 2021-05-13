import React, { useState } from "react";
import { SectionState, sidebarSectionsList } from "../../utils";
import AppHeader from "../app_header";
import SectionTitle from "./section_title";

interface SidebarProps {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

const Sidebar: React.FC<SidebarProps> = ({ selected, setSelected }) => {
  const [hover, setHover] = useState(-1);

  return (
    <div className="flex flex-col w-min h-full p-4 font-sans">
      <AppHeader />
      {sidebarSectionsList.map((sectionTitle, idx) => {
        return (
          <SectionTitle
            index={idx}
            key={idx}
            onHoverOut={() => {
              setHover(-1);
            }}
            onHoverIn={setHover}
            onClick={setSelected}
            state={
              selected === idx
                ? SectionState._active
                : hover === idx
                ? SectionState._hover
                : SectionState._inactive
            }
            title={sectionTitle}
          />
        );
      })}
    </div>
  );
};

export default Sidebar;
