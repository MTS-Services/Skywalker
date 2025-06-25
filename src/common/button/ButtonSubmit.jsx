import React from "react";

const ButtonSubmit = ({
  text = "Submit",
  onClick = () => {},
  className = "",
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`mx-auto flex w-full cursor-pointer items-center justify-center rounded bg-[var(--color-primary-400)] px-8 py-3 text-center font-medium text-white transition duration-500 ease-in-out hover:bg-[var(--color-primary-400)] sm:w-auto ${className}`}
    >
      {text}
    </button>
  );
};

export default ButtonSubmit;
