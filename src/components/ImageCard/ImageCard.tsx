import { Image } from "../../App";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  image: Image;
  openModal: (
    url: string,
    description: string,
    name: string,
    likes: number
  ) => void;
}
export default function ImageCard({ image, openModal }: ImageCardProps) {
  return (
    <div>
      <img
        className={css.image}
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => {
          openModal(
            image.urls.regular,
            image.description,
            image.user.name,
            image.likes
          );
        }}
      />
    </div>
  );
}
