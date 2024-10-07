import css from "./ImageCard.module.css";
export default function ImageCard({ image, openModal }) {
  console.log(image);
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
