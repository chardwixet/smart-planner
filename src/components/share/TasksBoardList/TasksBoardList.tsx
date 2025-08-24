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
import { useEffect, useRef, useState } from "react";
import { moveTask, type Task } from "../../../store/slices/taskSlices";
import { useMouse } from "@uidotdev/usehooks";

type Props = {};
export interface ActiveOver {
  id: UniqueIdentifier | null;
  pos: string;
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
    pos: "",
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseState] = useMouse();

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

    const activatorEvent = event.activatorEvent as MouseEvent;
    // const rect = (activatorEvent.target as HTMLElement).getBoundingClientRect();

    setMousePosition({
      x: activatorEvent.clientX,
      y: activatorEvent.clientY,
    });

    if (active.data.current?.type === "task") {
      setActiveTask(active.data.current.task);
    }
  };

  const handleDragMove = (event: DragMoveEvent) => {
    const { over } = event;

    const rect = over?.rect || 0;

    // console.log(rect, over);

    if (!rect) {
      setActiveOver({ id: "", pos: "" });
    }

    if (rect && over?.data.current?.type === "task") {
      if (mouseState.y > rect.top + rect.height / 2) {
        setActiveOver({ id: over?.id || "", pos: "bot" });
      } else {
        setActiveOver({ id: over?.id || "", pos: "top" });
      }
    }

    if (over?.data.current?.type === "Board") {
      const tasks = over.data.current.tasks;
      const last = tasks.length - 1;

      setActiveOver({
        id: tasks[last].id,
        pos: "bot",
      });
      console.log(tasks[last].id);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    let idBoard;

    if (!over || active.id === over.id) {
      setActiveOver({ id: null, pos: "" });
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
        pos: activeOver.pos,
        idBoard: idBoard,
      })
    );

    setActiveOver({ id: "", pos: "" });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragMove={handleDragMove}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div>
        <SortableContext items={boards.map((i) => i.id)}>
          <ul className={style.list}>
            {boards &&
              boards.map((board) => (
                <li key={board.id} ref={itemRef}>
                  <TasksBoard
                    board={board}
                    tasks={tasks}
                    isActiveOver={activeOver}
                  />
                </li>
              ))}
          </ul>
        </SortableContext>

        <DragOverlay dropAnimation={{ ...defaultDropAnimation }}>
          {activeTask ? (
            <div
              style={{
                position: "fixed",
                left: `${mousePosition.x + 13}px`,
                top: `${mousePosition.y}px`,
                zIndex: 9999,
                // Дополнительные стили:
                width: "200px",
                backgroundColor: "#36373b",
                textAlign: "start",
                padding: "10px",
                borderRadius: "5px",
                color: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              {activeTask.title}
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
