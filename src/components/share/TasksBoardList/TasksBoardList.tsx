import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { TasksBoard } from "../TasksBoard";
import style from "./TasksBoardList.module.scss";

type Props = {};

export function TasksBoardList({}: Props) {
  const data = useSelector((state: RootState) => state.boards).lists;

  const tasks = useSelector((state: RootState) => state.tasks).tasks;
  console.log(tasks);
  return (
    <div>
      <ul className={style.list}>
        {data &&
          data.map((board) => (
            <li key={board.id}>
              <TasksBoard board={board} tasks={tasks} />
            </li>
          ))}
      </ul>
    </div>
  );
}
