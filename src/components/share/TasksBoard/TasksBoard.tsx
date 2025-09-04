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
  // tasks: Task[];
};

export function TasksBoard({ board }: Props) {
  const dispatch = useDispatch();

  // const filterTasks = tasks.filter((item) => board.id === item.idBoard);

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
      board,
    },
  });

  if (isDragging) {
    return <div className={style.dragBoard} />;
  }

  const corStyle = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <>
      <div style={corStyle} ref={setNodeRef} className={style.board}>
        <div {...attributes} {...listeners} className={style.header}>
          <h2 className={style.subtitle}>{board.title}</h2>
        </div>

        <button onClick={() => dispatch(removeList(board.id))}>
          Удалить доску
        </button>
      </div>
    </>
  );
}
