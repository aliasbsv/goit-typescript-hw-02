import { Image } from "../types";
import css from "./ImageCard.module.css";

// Определение типов для пропсов компонента
interface ImageCardProps {
  image: Image; // Объект типа Image
  onImageClick: () => void; // Функция-обработчик клика
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onImageClick }) => {
  const { urls, alt_description, user, likes } = image;

  return (
    <div className={css.imgContainer}>
      <img
        src={urls.small}
        alt={alt_description}
        onClick={onImageClick}
        loading="lazy"
      />
      <ul className={css.imgList}>
        <li className={css.imgItem}>{user.name}</li>
        <li className={css.imgItem}>{likes}</li>
      </ul>
    </div>
  );
};
export default ImageCard;
