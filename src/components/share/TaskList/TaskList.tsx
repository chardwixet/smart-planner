import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { TaskItem } from "../TaskItem";
import { useEffect, useState, type DragEvent } from "react";
import style from "./TaskList.module.scss";
import { moveTask, type Task } from "../../../store/slices/taskSlices";
import type { Board } from "../../../store/slices/boardSlices";
import {
  closestCenter,
  closestCorners,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
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

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const dispatch = useDispatch();

  const filteredTasks = tasks.filter((item) => {
    switch (filterStatus) {
      case "ALL":
        return item;

      case "COMPLETED":
        return item.status === true;

      case "NOT_COMPLETED":
        return item.status === false;
    }
  });

  function setStatus(status: Status) {
    setFilterStatus(status);
    localStorage.setItem("filterStatus", JSON.stringify(status));
  }

  return (
    <div>
      <div>
        <button onClick={() => setStatus("ALL")}>All</button>
        <button onClick={() => setStatus("COMPLETED")}>Completed</button>
        <button onClick={() => setStatus("NOT_COMPLETED")}>NotCompleted</button>
      </div>

      <SortableContext
        items={filteredTasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className={style.list}>
          {filteredTasks.length ? (
            filteredTasks.map((task) => (
              <li
                key={task.id}
                data-active-over={isActiveOver.id === task.id}
                data-active-pos={isActiveOver.pos}
                className={style.item}
              >
                <TaskItem task={task} />
              </li>
            ))
          ) : (
            <li
              // onDragOver={(e) => dragOverHandler(e)}
              // onDrop={(e) => dropHandler(e, board.id, "")}
              className={style.item}
            ></li>
          )}
        </ul>
      </SortableContext>
    </div>
  );
}
