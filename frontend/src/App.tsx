import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/sidebar/sidebar";
import Login from "./pages/login";
import Tasks from "./pages/tasks";
import { sidebarSectionsList } from "./utils";

const App: React.FC = () => {
  const [selected, setSelected] = useState<number>(0);
  if (document.cookie.slice(0, 4) !== "jwt=") return <Login />;

  return (
    <div className="flex flex-row p-4 h-full divide-x divide-light-blue-400">
      <Sidebar selected={selected} setSelected={setSelected} />
      <div className="w-full">
        {selected === sidebarSectionsList.indexOf("Tasks") ? (
          <Tasks />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default App;
