import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/sidebar/sidebar";
import Login from "./pages/login";
import Tasks from "./pages/tasks";
import { API_URL, sidebarSectionsList } from "./utils";

const App: React.FC = () => {
  const [selected, setSelected] = useState<number>(0);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          credentials: "include",
        });
        if (res.status === 200) setAuthenticated(true);
      } catch (e) {
        setAuthenticated(false);
      }
    })();
  }, []);

  if (authenticated === null) return <div />;

  if (!authenticated) return <Login />;

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
