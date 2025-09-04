import { useDispatch, useSelector } from "react-redux";
import { TasksBoard } from "../TasksBoard";
import style from "./TasksBoardList.module.scss";
import {
  defaultDropAnimation,
  DndContext,
  DragOverlay,
  MouseSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragMoveEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo, useRef, useState } from "react";
import { useMouse } from "@uidotdev/usehooks";
import { AddBoardForm } from "../AddBoardForm";
import type { RootState } from "@store/index";
import { moveTask, type Task } from "@store/slices/taskSlices";
import { TaskItem } from "../TaskItem";
import type { Board } from "@store/slices/boardSlices";
import { createPortal } from "react-dom";

type Props = {};
export interface ActiveOver {
  id: UniqueIdentifier | null;
}

export function TasksBoardList({}: Props) {
  // const boards = useSelector((state: RootState) => state.boards).lists;
  // const tasks = useSelector((state: RootState) => state.tasks).tasks;

  const [boards, setBoards] = useState<Board[]>([
    {
      id: "A",
      title: "Column 1",
    },
    {
      id: "B",
      title: "Column 2",
    },
    {
      id: "C",
      title: "Column 3",
    },
  ]);
  // const [tasks, setTasks] = useState<Task[]>([
  //   {
  //     id: "1A",
  //     idBoard: "A",
  //     title: "ad,sa,f",
  //     status: false,
  //   },
  //   {
  //     id: "2A",
  //     idBoard: "A",
  //     title: "ad,sa,f",
  //     status: false,
  //   },
  //   {
  //     id: "3A",
  //     idBoard: "A",
  //     title: "ad,sa,f",
  //     status: false,
  //   },
  // ]);

  const dispatch = useDispatch();
  const itemRef = useRef(null);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 2 },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const boardId = useMemo(() => boards.map((board) => board.id), [boards]);

  const sensors = useSensors(mouseSensor, touchSensor);
  // const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeBoard, setActiveBoard] = useState<Board | null>(null);

  const handleDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "Board") {
      setActiveBoard(e.active.data.current.board);
      return;
    }

    // if (e.active.data.current?.type === "Task") {
    //   setActiveTask(e.active.data.current.task);
    //   return;
    // }
  };

  // const handleDragEnd = (event: DragEndEvent) => {
  //   const { active, over } = event;
  //   // setActiveTask(null);
  //   let idBoard;

  //   if (!over || active.id === over.id) {
  //     return;
  //   }

  //   idBoard = over.id;
  // };

  return (
    <DndContext
      sensors={sensors}
      // onDragMove={handleDragMove}
      onDragStart={handleDragStart}
      // onDragEnd={handleDragEnd}
    >
      <div className={style.list}>
        <SortableContext items={boardId}>
          {boards.map((board) => (
            <TasksBoard key={board.id} board={board} />
          ))}
        </SortableContext>
      </div>
      <AddBoardForm />
      {createPortal(
        <DragOverlay>
          {activeBoard && <TasksBoard board={activeBoard} />}
          {/* {activeTask && <TaskItem task={activeTask} />} */}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
