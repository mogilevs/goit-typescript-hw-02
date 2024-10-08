import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { ModalParams } from "../../App";

Modal.setAppElement("#root");
interface customStyles {
  content: {
    top: string;
    left: string;
    right: string;
    bottom: string;
    marginRight: string;
    transform: string;
  };
}
interface ImageModalProps {
  isOpen: boolean;
  description: ModalParams;
  onRequestClose: () => void;
  style: customStyles;
}

export default function ImageModal({
  isOpen,
  description,
  onRequestClose,
  style,
}: ImageModalProps) {
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
