import { Image } from "../types";
import ImageCard from "./ImageCard";
import css from "./ImageGallery.module.css";

// Определение типов для пропсов компонента
interface ImageGalleryProps {
  images: Image[]; // Массив объектов типа Image
  onImageClick: (
    srcUrl: string,
    altDescription: string,
    authorName: string,
    likes: number,
    largeDescription: string
  ) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  return (
    <ul className={css.imgList}>
      {images.map((image) => {
        return (
          <li className={css.imgItem} key={image.id}>
            <ImageCard
              image={image}
              onImageClick={() =>
                onImageClick(
                  image.urls.regular,
                  image.alt_description,
                  image.user.name,
                  image.likes,
                  image.description
                )
              }
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
