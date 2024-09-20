import React from "react";
import css from "./ErrorMessage.module.css";

const ErrorMessage: React.FC = () => {
  return (
    <>
      <p className={css.text}>Something went wrong! Please, reload the page!</p>
    </>
  );
};

export default ErrorMessage;
