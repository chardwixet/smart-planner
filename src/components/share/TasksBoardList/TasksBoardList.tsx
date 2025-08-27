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
import { useRef, useState } from "react";
import { useMouse } from "@uidotdev/usehooks";
import { AddBoardForm } from "../AddBoardForm";
import type { RootState } from "@store/index";
import { moveTask, type Task } from "@store/slices/taskSlices";

type Props = {};
export interface ActiveOver {
  id: UniqueIdentifier | null;
}

export function TasksBoardList({}: Props) {
  const boards = useSelector((state: RootState) => state.boards).lists;
  const tasks = useSelector((state: RootState) => state.tasks).tasks;

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

  const sensors = useSensors(mouseSensor, touchSensor);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeOver, setActiveOver] = useState<ActiveOver>({
    id: "",
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // const [mouseState] = useMouse();

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    const activatorEvent = event.activatorEvent as MouseEvent;

    setMousePosition({
      x: activatorEvent.clientX,
      y: activatorEvent.clientY,
    });

    if (active.data.current?.type === "task") {
      setActiveTask(active.data.current.task);
      return;
    }
  };

  const handleDragMove = (event: DragMoveEvent) => {
    const { over } = event;
    const rect = over?.rect || 0;

    if (!rect) {
      setActiveOver({ id: "" });
    }

    if (rect && over?.data.current?.type === "task") {
      setActiveOver({ id: over?.id || "" });
    }

    if (over?.data.current?.type === "Board") {
      const tasks = over.data.current.tasks;
      const last = tasks.length - 1;

      setActiveOver({
        id: tasks[last].id,
      });
      console.log(tasks[last].id);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    let idBoard;

    if (!over || active.id === over.id) {
      setActiveOver({ id: null });
      return;
    }

    if (over.data.current?.type === "task") {
      console.log(
        "task start",
        active.data.current?.task,
        "task конец",
        over.data.current?.task
      );
      idBoard = over.data.current?.task.idBoard;
      setActiveTask(over.data.current.task);
    }

    if (over.data.current?.type === "Board") {
      idBoard = over.id;
      setActiveTask(over.data.current.task);
    }

    dispatch(
      moveTask({
        currentId: active.id as string,
        dropId: over.id as string,

        idBoard: idBoard,
      })
    );

    setActiveOver({ id: "" });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      // onDragMove={handleDragMove}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={boards.map((i) => i.id)}>
        <ul className={style.list}>
          {boards &&
            boards.map((board) => (
              <li key={board.id} ref={itemRef} className={style.backgroundItem}>
                <TasksBoard
                  board={board}
                  tasks={tasks}
                  isActiveOver={activeOver}
                />
              </li>
            ))}
          <AddBoardForm />
        </ul>
      </SortableContext>

      <DragOverlay dropAnimation={{ ...defaultDropAnimation }}>
        {activeTask ? (
          <div
            style={
              {
                // zIndex: 9999,
                // // Дополнительные стили:
                // // width: "200px",
                // backgroundColor: "#36373b",
                // textAlign: "start",
                // padding: "10px",
                // borderRadius: "5px",
                // color: "white",
                // boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }
            }
          >
            {activeTask.title}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
