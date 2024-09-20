import React from "react";
import Modal from "react-modal";
import { CiHeart, CiUser } from "react-icons/ci";
import css from "./ImageModal.module.css";
import { ModalState } from "../types"; // Импортируем тип ModalState

Modal.setAppElement("#root");

// Определение типов для пропсов компонента
interface ImageModalProps {
  modalState: ModalState; // Объект состояния модального окна
  onModalClose: () => void; // Функция для закрытия модального окна
}

const ImageModal: React.FC<ImageModalProps> = ({
  modalState,
  onModalClose,
}) => {
  return (
    <Modal
      className={css.modal}
      overlayClassName={css.modalOverlay}
      isOpen={modalState.modalIsOpen}
      onRequestClose={onModalClose}
    >
      <img src={modalState.srcUrl} alt={modalState.altDescription} />
      <ul className={css.list}>
        <li className={css.item}>
          <CiUser size="20" />
          {modalState.authorName}
        </li>
        <li className={css.item}>
          <CiHeart size="20" />
          {modalState.likes}
        </li>
      </ul>
      <p className={css.text}>{modalState.largeDescription}</p>
    </Modal>
  );
};

export default ImageModal;
