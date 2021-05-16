import React, { useEffect, useState } from "react";
import { Moment } from "moment";
import { useToasts } from "react-toast-notifications";
import TaskModal from "../components/modal/taskModal";
import TaskTile from "../components/taskTile";
import { API_URL, Task } from "../utils";
import moment from "moment";

const Tasks: React.FC = () => {
  const [hoverIdx, setHoverIdx] = useState<number>(-1);
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [newTaskDate, setNewTaskDate] = useState<Moment | null>(null);
  const [newTaskTime, setNewTaskTime] = useState<Moment | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState<string | null>(null);
  const { addToast } = useToasts();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_URL}/tasks`, { credentials: "include" });
      const tasksList = await res.json();
      setTasks(
        tasksList.map((task: Task) => {
          if (task.date) task.date = moment(task.date);
          return task;
        })
      );
    })();
  }, []);

  if (tasks === null)
    return (
      <div className="flex justify-center items-center h-full">
        <img src="/icons/spinner.svg" alt="" />
      </div>
    );

  const addTask: () => Promise<void> = async () => {
    if (newTaskTitle) {
      const res = await fetch(`${API_URL}/tasks/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTaskTitle,
          date: newTaskDate?.toDate(),
          time: newTaskTime?.toDate(),
        }),
      });

      if (res.status === 201) {
        setTasks([
          ...tasks,
          {
            done: false,
            id: parseInt((await res.json()).id),
            title: newTaskTitle,
            date: newTaskDate ?? null,
            time: newTaskTime ?? null,
          },
        ]);
        setNewTaskTitle(null);
      } else {
        addToast(await res.text(), { appearance: "error", autoDismiss: true });
      }
    }
  };

  const deleteTask: (idx: number) => Promise<void> = async (idx) => {
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

  const updateTask: (
    idx: number,
    done: boolean,
    title: string,
    date: Moment | null,
    time: Moment | null
  ) => Promise<void> = async (idx, done, title, date, time) => {
    let task = tasks.filter((task) => task.id === idx)[0];
    const res = await fetch(`${API_URL}/tasks/edit/${idx}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        done,
        date: date?.toDate(),
        time: time?.toDate(),
      }),
    });
    if (res.status === 200) {
      task.done = done;
      task.title = title;
      task.date = date;
      task.time = time;
      const newTasks: Task[] = JSON.parse(JSON.stringify(tasks));
      setTasks(newTasks);
    } else
      addToast(await res.text(), { appearance: "error", autoDismiss: true });
  };

  return (
    <div className="flex flex-col h-full">
      <TaskModal
        save={addTask}
        closeModal={() => {
          setModalIsOpen(false);
          setNewTaskDate(null);
          setNewTaskTime(null);
          setNewTaskTitle(null);
        }}
        date={newTaskDate}
        time={newTaskTime}
        title={newTaskTitle}
        modalTitle="Edit Task"
        isOpen={modalIsOpen}
        setDate={setNewTaskDate}
        setTime={setNewTaskTime}
        setTitle={setNewTaskTitle}
      />
      <div className="flex justify-between items-start w-3/4 pt-2 pb-4 m-auto">
        <div>
          <div className="text-3xl font-semibold text-gray-800">Today</div>
          <div className="text-xl font-medium text-gray-500">
            Saturday, May 15
          </div>
        </div>
        <button
          onClick={() => setModalIsOpen(true)}
          className="px-6 py-4 bg-black text-white text-sm rounded-xl focus:outline-none"
        >
          <span className="mr-3 font-semibold text-lg">+</span>
          Add new task
        </button>
      </div>
      <div className="flex flex-col justify-between flex-1 w-full pb-8 overflow-hidden">
        <div className="w-full h-full overflow-y-scroll">
          <div className="w-3/4 m-auto">
            {tasks.length === 0 && (
              <div className="mt-32 text-center text-gray-600">
                Your tasklist is empty.
              </div>
            )}
            {tasks
              .filter((task) => task.done)
              .map((task, idx) => (
                <TaskTile
                  date={task.date}
                  time={task.time}
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
              <div className="py-2">
                <hr className="border" />
              </div>
            ) : null}
            {tasks
              .filter((task) => !task.done)
              .map((task, idx) => (
                <TaskTile
                  date={task.date}
                  time={task.time}
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
        </div>
      </div>
    </div>
  );
};

export default Tasks;
