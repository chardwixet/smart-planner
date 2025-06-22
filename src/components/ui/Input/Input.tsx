import { useState } from "react";

interface Props {
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  placeholder?: string;
}

export function Input({ type, onChange, defaultValue, placeholder }: Props) {
  const [inputValue, setInputValue] = useState(
    defaultValue ? defaultValue : ""
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleBlur(e: React.ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      onChange(e);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Escape" || e.keyCode === 27) {
      setInputValue(defaultValue ? defaultValue : ""); // Очищаем input
    }
  }

  return (
    <input
      type={type}
      value={inputValue}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
    />
  );
}
