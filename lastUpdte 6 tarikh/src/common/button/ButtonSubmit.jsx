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
      className={`bg-primary-500 hover:bg-primnary-600 font-bold mx-auto flex w-full cursor-pointer items-center justify-center rounded px-8 py-3 text-center text-white transition duration-500 ease-in-out sm:w-auto ${className}`}
    >
      {text}
    </button>
  );
};

export default ButtonSubmit;
