import { useDispatch } from "react-redux";
import { TaskItem } from "../TaskItem";
import { useMemo, useState } from "react";
import style from "./TaskList.module.scss";
import type { Task } from "@store/slices/taskSlices";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { ActiveOver } from "../TasksBoardList";

interface Props {
  className?: string;
  tasks: Task[];
  isActiveOver: ActiveOver;
}

type Status = "ALL" | "COMPLETED" | "NOT_COMPLETED";

export function TaskList({ tasks, isActiveOver }: Props) {
  const status = localStorage.getItem("filterStatus");
  const [filterStatus, setFilterStatus] = useState<Status>(
    status ? JSON.parse(status) : "ALL"
  );

  // const filteredTasks = tasks.filter((item) => {
  //   switch (filterStatus) {
  //     case "ALL":
  //       return item;

  //     case "COMPLETED":
  //       return item.status === true;

  //     case "NOT_COMPLETED":
  //       return item.status === false;
  //   }
  // });

  const filteredTasks = tasks;

  const tasksIds = useMemo(() => {
    return filteredTasks.map((t) => t.id);
  }, [filteredTasks]);

  function setStatus(status: Status) {
    setFilterStatus(status);
    localStorage.setItem("filterStatus", JSON.stringify(status));
  }

  return (
    <div>
      {/* <div>
        <button onClick={() => setStatus("ALL")}>All</button>
        <button onClick={() => setStatus("COMPLETED")}>Completed</button>
        <button onClick={() => setStatus("NOT_COMPLETED")}>NotCompleted</button>
      </div> */}

      <ul className={style.list}>
        <SortableContext
          items={tasksIds}
          strategy={verticalListSortingStrategy}
        >
          {filteredTasks.length ? (
            filteredTasks.map((task) => (
              <li
                key={task.id}
                data-active-over={isActiveOver.id === task.id}
                // data-active-pos={isActiveOver.pos}
                className={style.item}
              >
                <TaskItem task={task} />
              </li>
            ))
          ) : (
            <li className={style.item}></li>
          )}
        </SortableContext>
      </ul>
    </div>
  );
}
