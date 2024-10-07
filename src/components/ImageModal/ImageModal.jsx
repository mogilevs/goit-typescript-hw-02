import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

export default function ImageModal({
  isOpen,
  description,
  onRequestClose,
  style,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={style}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <h2 className={css.title}>{description.title}</h2>
      <p className={css.text}>
        Photo by <span className={css.name}>{description.username}</span>
      </p>
      <p className={css.text}>{description.likes} likes</p>
      <img src={description.url}></img>
    </Modal>
  );
}
