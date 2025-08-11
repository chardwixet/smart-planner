import style from "./TasksBoard.module.scss";
import { TaskList } from "../TaskList";
import { TaskForm } from "../TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { removeList, type Board } from "../../../store/slices/boardSlices";
import type { Task } from "../../../store/slices/taskSlices";
import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  board: Board;
  tasks: Task[];
};

export function TasksBoard({ board, tasks }: Props) {
  const dispatch = useDispatch();

  const filterTasks = tasks.filter((item) => board.id === item.idBoard);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: board.id,
    data: {
      type: "Board",
    },
  });

  return (
    <div
      {...attributes}
      {...listeners}
      style={{ transition, transform: CSS.Translate.toString(transform) }}
      ref={setNodeRef}
      className={style.board}
    >
      <div>
        <h2>{board.title}</h2>
        <TaskForm idBoard={board.id} />
        <TaskList tasks={filterTasks} board={board} />
        <button onClick={() => dispatch(removeList(board.id))}>Удалить</button>
      </div>
    </div>
  );
}
