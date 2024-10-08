import { ChangeEvent, FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IconContext } from "react-icons";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (value: string) => void;
}
export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [value, setValue] = useState<string>("");

  function inputChange(event: ChangeEvent<HTMLInputElement>): void {
    setValue(event.target.value);
  }
  function handleForm(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (value.trim() === "") {
      toast("Please enter what you are searching for");
      return;
    }
    onSubmit(value);
    setValue("");
  }
  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleForm}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={inputChange}
        />
        <IconContext.Provider value={{ color: "blue" }}>
          <button className={css.button} type="submit">
            <FaMagnifyingGlass />
          </button>
        </IconContext.Provider>
      </form>
      <Toaster
        toastOptions={{
          style: {
            background: "red",
            color: "white",
          },
        }}
      />
    </header>
  );
}
