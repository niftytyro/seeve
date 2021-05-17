import React, { useEffect, useState } from "react";
import { Moment } from "moment";
import { useToasts } from "react-toast-notifications";
import TaskModal from "../components/modal/taskModal";
import TaskTile from "../components/taskTile";
import {
  fetchCreateTask,
  fetchDeleteTask,
  fetchGetTasks,
  fetchUpdateTask,
  Task,
} from "../utils";
import moment from "moment";
import Spinner from "../components/spinner";
import DayHeader from "../components/dayHeader";
import DateSelector from "../components/dateSelector";

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
      const res = await fetchGetTasks();
      const tasksList = await res.json();
      setTasks(
        tasksList.map((task: Task) => {
          if (task.date) task.date = moment(task.date);
          return task;
        })
      );
    })();
  }, []);

  if (tasks === null) return <Spinner />;

  const addTask: () => Promise<void> = async () => {
    if (newTaskTitle) {
      const res = await fetchCreateTask(newTaskTitle, newTaskDate, newTaskTime);
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
    const res = await fetchDeleteTask(idx);
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
    const res = await fetchUpdateTask(idx, title, done, date, time);
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
        modalTitle="New Task"
        isOpen={modalIsOpen}
        setDate={setNewTaskDate}
        setTime={setNewTaskTime}
        setTitle={setNewTaskTitle}
      />
      <div className="flex flex-col justify-between flex-1 w-full pb-8 overflow-hidden">
        <div className="flex w-full h-full overflow-y-scroll">
          <div className="w-2/3 pl-4">
            <DayHeader openModal={() => setModalIsOpen(true)} />
            <div className="w-full">
              {tasks.length === 0 && (
                <div className="mt-32 text-center text-gray-600">
                  Your tasklist is empty.
                </div>
              )}
              {tasks
                .filter((task) => task.done)
                .map((task, idx) => (
                  <TaskTile
                    date={task.date ? moment(task.date) : null}
                    time={task.time ? moment(task.time) : null}
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
                    date={task.date ? moment(task.date) : null}
                    time={task.time ? moment(task.time) : null}
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
          <DateSelector />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
