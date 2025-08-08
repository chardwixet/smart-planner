import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { TaskItem } from "../TaskItem";
import { useState, type DragEvent } from "react";
import style from "./TaskList.module.scss";
import { moveTask, type Task } from "../../../store/slices/taskSlices";
import type { Board } from "../../../store/slices/boardSlices";

interface Props {
  className?: string;
  tasks: Task[];
  board: Board;
}

type Status = "ALL" | "COMPLETED" | "NOT_COMPLETED";

export function TaskList({ tasks, board }: Props) {
  const status = localStorage.getItem("filterStatus");
  const [filterStatus, setFilterStatus] = useState<Status>(
    status ? JSON.parse(status) : "ALL"
  );

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

  function dragStartHandler(e: DragEvent<HTMLLIElement>, id: string): void {
    console.log("записал этот id в current", id);
    e.dataTransfer.setData("text/plain", id); // Сохраняем id перетаскиваемого элемента
    e.dataTransfer.effectAllowed = "move";

    const target = e.currentTarget;

    target.classList.add(style.dragging);
  }

  function dragEndHandler(e): void {
    document.querySelectorAll(`.${style.item}`).forEach((el) => {
      el.classList.remove(style.dropIndicator);
    });
    e.currentTarget.classList.remove(style.dragging);
  }

  function dragOverHandler(e): void {
    e.preventDefault();
    const target = e.currentTarget;
    // Удаляем класс у всех элементов
    document.querySelectorAll(`.${style.item}`).forEach((el) => {
      el.classList.remove(style.dropIndicator);
    });
    // Добавляем класс только текущему
    target.classList.add(style.dropIndicator);
  }

  function dropHandler(
    e: DragEvent<HTMLLIElement>,
    idBoard: string,
    id: string
  ): void {
    e.preventDefault();
    const currentId = e.dataTransfer.getData("text/plain");
    console.log("беру эти id: ", currentId, id, idBoard);
    dispatch(moveTask({ currentId, dropId: id, idBoard }));

    e.currentTarget.classList.remove(style.dropIndicator);
  }

  return (
    <div>
      <div>
        <button onClick={() => setStatus("ALL")}>All</button>
        <button onClick={() => setStatus("COMPLETED")}>Completed</button>
        <button onClick={() => setStatus("NOT_COMPLETED")}>NotCompleted</button>
      </div>
      <ul className={style.list}>
        {filteredTasks.length ? (
          filteredTasks.map((task) => (
            <li
              draggable
              onDragStart={(e) => dragStartHandler(e, task.id)}
              onDragLeave={(e) => dragEndHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e, board.id, task.id)}
              key={task.id}
              className={style.item}
            >
              <TaskItem task={task} />
            </li>
          ))
        ) : (
          <li
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, board.id, "")}
            className={style.item}
          ></li>
        )}
      </ul>
    </div>
  );
}
