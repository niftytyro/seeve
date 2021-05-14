import React, { useEffect, useRef, useState } from "react";
import { useToasts } from "react-toast-notifications";
import TaskTile from "../components/taskTile";
import { API_URL, Task } from "../utils";

const Tasks: React.FC = () => {
  const [hoverIdx, setHoverIdx] = useState<number>(-1);
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const { addToast } = useToasts();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_URL}/tasks`, { credentials: "include" });
      const tasksList = await res.json();
      setTasks(tasksList);
    })();
  }, []);

  if (tasks === null)
    return (
      <div className="flex justify-center items-center h-full">
        <img src="/icons/spinner.svg" alt="" />
      </div>
    );

  const addTask: () => void = async () => {
    if (inputRef.current) {
      const res = await fetch(`${API_URL}/tasks/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: inputRef.current.value,
        }),
      });
      if (res.status === 201) {
        setTasks([
          ...tasks,
          { done: false, id: tasks.length, title: inputRef.current.value },
        ]);
        inputRef.current.value = "";
      } else {
        addToast(await res.text(), { appearance: "error", autoDismiss: true });
      }
    }
    inputRef.current?.focus();
  };

  const deleteTask: (idx: number) => void = async (idx) => {
    const res = await fetch(`${API_URL}/tasks/delete/${idx}`, {
      method: "POST",
      credentials: "include",
    });
    if (res.status === 200) {
      const newTasks = tasks.filter((task) => task.id !== idx);
      setTasks(newTasks);
      setHoverIdx(-1);
    } else {
      addToast(await res.text(), { appearance: "error", autoDismiss: true });
    }
  };

  const updateTask: (idx: number, done: boolean, title: string) => void =
    async (idx, done, title) => {
      let task = tasks.filter((task) => task.id === idx)[0];
      const res = await fetch(`${API_URL}/tasks/edit/${idx}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          done: done,
        }),
      });
      if (res.status === 200) {
        task.done = done;
        task.title = title;
        const newTasks: Task[] = JSON.parse(JSON.stringify(tasks));
        setTasks(newTasks);
      } else
        addToast(await res.text(), { appearance: "error", autoDismiss: true });
      inputRef.current?.focus();
    };

  return (
    <div className="flex flex-col justify-between w-1/2 h-full pb-12 m-auto">
      <div className="h-full">
        {tasks.length === 0 && (
          <div className="flex justify-center items-center h-full text-center text-gray-600">
            No tasks have been added before.
          </div>
        )}
        {tasks
          .filter((task) => task.done)
          .map((task, idx) => (
            <TaskTile
              key={idx}
              hoverIdx={hoverIdx}
              done={task.done}
              idx={task.id}
              title={task.title}
              deleteTask={deleteTask}
              setHoverIdx={setHoverIdx}
              updateTask={updateTask}
            />
          ))}
        {tasks.filter((task) => task.done).length &&
        tasks.filter((task) => !task.done).length ? (
          <hr className="border" />
        ) : null}
        {tasks
          .filter((task) => !task.done)
          .map((task, idx) => (
            <TaskTile
              key={idx}
              hoverIdx={hoverIdx}
              done={task.done}
              idx={task.id}
              title={task.title}
              deleteTask={deleteTask}
              setHoverIdx={setHoverIdx}
              updateTask={updateTask}
            />
          ))}
      </div>
      <div className="flex">
        <button
          onClick={addTask}
          className="flex justify-center items-center p-4 w-5 h-5 mr-3 border border-gray-400 rounded-lg text-gray-500 hover:bg-gray-50 active:bg-black active:text-white focus:outline-none"
        >
          +
        </button>
        <input
          autoFocus
          ref={inputRef}
          onKeyPress={(e) => {
            if (e.key === "Enter") addTask();
          }}
          placeholder="Add task..."
          className="w-full px-2 py-1 border-b-2 transition duration-300 focus:border-b focus:border-black focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Tasks;
