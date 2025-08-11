import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { TasksBoard } from "../TasksBoard";
import style from "./TasksBoardList.module.scss";
import {
  closestCorners,
  defaultDropAnimation,
  DndContext,
  DragOverlay,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragMoveEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { moveTask, type Task } from "../../../store/slices/taskSlices";
import { TaskItem } from "../TaskItem";

type Props = {};

export function TasksBoardList({}: Props) {
  const boards = useSelector((state: RootState) => state.boards).lists;
  const tasks = useSelector((state: RootState) => state.tasks).tasks;
  const dispatch = useDispatch();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 2 },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
    if (type === "board") {
      return boards.find((board) => board.id === id);
    }

    if (type === "board") {
      return boards.find((board) => board.id === id);
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    if (active.data.current?.type === "task") {
      setActiveTask(active.data.current.task);
    }

    // const task = filteredTasks.find((t) => t.id === active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over || active.id === over.id) {
      return;
    }

    if (over.data.current?.type === "task") {
      console.log(
        "task start",
        active.data.current?.task,
        "task конец",
        over.data.current?.task
      );
      setActiveTask(over.data.current.task);
    }

    if (over.data.current?.type === "Board") {
      console.log("board", over.id);
      setActiveTask(over.data.current.task);
    }

    // console.log(
    //   "currentId",
    //   active.id,
    //   "dropId: ",
    //   over.id,
    //   "board: ",
    //   board.id
    // );

    // Обновляем порядок в Redux
    dispatch(
      moveTask({
        currentId: active.id as string,
        dropId: over.id as string,
        idBoard: over.data.current?.task.idBoard,
      })
    );
  };

  useEffect(() => {
    console.log(screenX);
  }, [screenX]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={boards.map((i) => i.id)}>
        <ul className={style.list}>
          {boards &&
            boards.map((board) => (
              <li key={board.id}>
                <TasksBoard board={board} tasks={tasks} />
              </li>
            ))}
        </ul>
      </SortableContext>

      <DragOverlay dropAnimation={{ ...defaultDropAnimation }}>
        {activeTask ? (
          <div
            style={{
              position: "fixed",
              left: `${10}px`, // 15px правее курсора
              top: `${10}px`,
              transform: "none", // Отключаем стандартные трансформации
              cursor: "grabbing",
              zIndex: 9999,
              // Дополнительные стили:
              width: "200px",
              backgroundColor: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {activeTask.title}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
