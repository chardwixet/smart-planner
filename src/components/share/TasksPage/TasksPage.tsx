import { Sidebar } from "../Sidebar";
import { TasksBoardList } from "../TasksBoardList";

import style from "./TasksPage.module.scss";

type Props = {};

export function TasksPage({}: Props) {
  return (
    <div className={style.page}>
      <div>
        <Sidebar />
        <TasksBoardList />
      </div>
    </div>
  );
}
