import style from "./TasksBoard.module.scss";
import { TaskList } from "../TaskList";
import { TaskForm } from "../TaskForm";
import { useDispatch } from "react-redux";
import { removeList, type Board } from "../../../store/slices/boardSlices";
import type { Task } from "../../../store/slices/taskSlices";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ActiveOver } from "../TasksBoardList";

type Props = {
  board: Board;
  tasks: Task[];
  isActiveOver: ActiveOver;
};

export function TasksBoard({ board, tasks, isActiveOver }: Props) {
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
      tasks: filterTasks,
    },
  });

  return (
    <>
      <div
        {...attributes}
        style={{ transition, transform: CSS.Translate.toString(transform) }}
        ref={setNodeRef}
        className={style.board}
      >
        <div>
          <div className={style.header} {...listeners} />
          <h2 className={style.subtitle}>{board.title}</h2>
          <button onClick={() => dispatch(removeList(board.id))}>
            Удалить доску
          </button>
          <TaskList tasks={filterTasks} isActiveOver={isActiveOver} />
          <TaskForm idBoard={board.id} />
        </div>
      </div>
    </>
  );
}
