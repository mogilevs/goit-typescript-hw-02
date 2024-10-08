import { Image } from "../../types";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: Image[];
  listRef: React.RefObject<HTMLUListElement>;
  openModal: (
    url: string,
    description: string,
    name: string,
    likes: number
  ) => void;
}

export default function ImageGallery({
  images,
  listRef,
  openModal,
}: ImageGalleryProps) {
  return (
    <ul ref={listRef} className={css.list}>
      {images.map((image) => (
        <li className={css.item} key={image.id}>
          <ImageCard image={image} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
}
