import style from "./TasksBoard.module.scss";
import { TaskList } from "../TaskList";
import { TaskForm } from "../TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { removeList, type Board } from "../../../store/slices/boardSlices";
import type { Task } from "../../../store/slices/taskSlices";

type Props = {
  board: Board;
  tasks: Task[];
};

export function TasksBoard({ board, tasks }: Props) {
  const dispatch = useDispatch();

  const filterTasks = tasks.filter((item) => board.id === item.idBoard);

  return (
    <div className={style.board}>
      <h2>{board.title}</h2>
      <TaskForm idBoard={board.id} />
      <TaskList tasks={filterTasks} board={board} />
      <button onClick={() => dispatch(removeList(board.id))}>Удалить</button>
    </div>
  );
}
