import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IconContext } from "react-icons";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const [value, setValue] = useState("");

  function inputChange(event) {
    setValue(event.target.value);
  }
  function handleForm(event) {
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
          autocomplete="off"
          autofocus
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
