import React from "react";
import css from "./LoadMoreBtn.module.css";

// Определение типов для пропсов компонента
interface LoadMoreBtnProps {
  onLoadMoreBtn: () => void; // Функция-обработчик нажатия кнопки
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onLoadMoreBtn }) => {
  return (
    <button className={css.btn} type="button" onClick={onLoadMoreBtn}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
