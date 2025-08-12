import style from "./TasksBoard.module.scss";
import { TaskList } from "../TaskList";
import { TaskForm } from "../TaskForm";
import { useDispatch } from "react-redux";
import { removeList, type Board } from "../../../store/slices/boardSlices";
import type { Task } from "../../../store/slices/taskSlices";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { UniqueIdentifier } from "@dnd-kit/core";

type Props = {
  board: Board;
  tasks: Task[];
  isActiveOverId: UniqueIdentifier | null;
};

export function TasksBoard({ board, tasks, isActiveOverId }: Props) {
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
      style={{ transition, transform: CSS.Translate.toString(transform) }}
      ref={setNodeRef}
      className={style.board}
    >
      <div>
        <div className={style.header} {...listeners} />
        <h2 className={style.subtitle}>{board.title}</h2>
        <TaskForm idBoard={board.id} />
        <TaskList tasks={filterTasks} isActiveOverId={isActiveOverId} />
        <button onClick={() => dispatch(removeList(board.id))}>Удалить</button>
      </div>
    </div>
  );
}
