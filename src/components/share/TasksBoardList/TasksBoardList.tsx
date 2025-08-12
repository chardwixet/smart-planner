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
import { useRef, useState } from "react";
import { moveTask, type Task } from "../../../store/slices/taskSlices";

type Props = {};

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
  const [activeOverId, setActiveOverId] = useState<UniqueIdentifier | null>(
    null
  );
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
    if (type === "board") {
      return boards.find((board) => board.id === id);
    }

    if (type === "board") {
      return boards.find((board) => board.id === id);
    }
  }

  const handleDragStart = (event) => {
    const { active } = event;

    const activatorEvent = event.activatorEvent as MouseEvent;

    setMousePosition({
      x: activatorEvent.clientX,
      y: activatorEvent.clientY,
    });

    console.log();

    if (active.data.current?.type === "task") {
      setActiveTask(active.data.current.task);
    }

    // const task = filteredTasks.find((t) => t.id === active.id);
  };

  const handleDragMove = (event) => {
    const { over } = event;
    const activatorEvent = event.activatorEvent as MouseEvent;

    // const droppableElement = document.querySelector(`[data-id="${over.id}"]`);
    // if (!droppableElement) return;
    const rect = over.rect;

    const clientY = activatorEvent.clientY;

    setActiveOverId(over?.id || null);
    // const rect = over.activatorEvent.target.getBoundingClientRect();
    console.log(clientY < rect.top + rect.height / 2);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    setActiveOverId(null);

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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragMove={handleDragMove}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={boards.map((i) => i.id)}>
        <ul className={style.list}>
          {boards &&
            boards.map((board) => (
              <li key={board.id} ref={itemRef}>
                <TasksBoard
                  board={board}
                  tasks={tasks}
                  isActiveOverId={activeOverId}
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
              cursor: "grabbing",
              // Отключаем стандартные трансформации
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
    </DndContext>
  );
}
