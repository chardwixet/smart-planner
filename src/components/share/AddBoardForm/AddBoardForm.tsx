import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addList } from "../../../store/slices/boardSlices";
import style from "./AddBoardForm.module.scss";
import { useClickAway } from "@uidotdev/usehooks";

export function AddBoardForm() {
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setisEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useClickAway<HTMLFormElement>(unFocus);

  function unFocus() {
    setisEditing(false);
    setInputValue("");
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputValue) {
      dispatch(addList(inputValue));
    }

    inputRef.current?.focus();
    setInputValue("");
  }

  return (
    <form onSubmit={add} ref={formRef} className={style.form}>
      {!isEditing ? (
        <button
          className={style.addButton}
          onClick={() => {
            setisEditing(true);
          }}
        >
          <svg
            width="24"
            height="24"
            role="presentation"
            focusable="false"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z"
              fill="currentColor"
            ></path>
          </svg>

          <span>Добавить список</span>
        </button>
      ) : (
        <div
          className={style.board}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
        >
          <input
            id="title"
            ref={inputRef}
            type="text"
            placeholder="Введите имя списка"
            onChange={(e) => setInputValue(e.target.value)}
            className={style.input}
            value={inputValue}
            autoComplete="off"
            spellCheck="false"
          />
          <div
            className={style.buttonContainer}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          >
            <button className={style.button}>Добавить список</button>
            <button className={style.buttonEx} onClick={unFocus}>
              <svg
                width="24"
                height="24"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
