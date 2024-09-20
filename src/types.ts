// Определение типов для ответа с изображениями
export interface Image {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
  };
  likes: number;
  description: string;
}

export interface ImageResponse {
  results: Image[];
  total: number;
  total_pages: number;
}

// Определение типов для состояния модального окна
export interface ModalState {
  modalIsOpen: boolean;
  srcUrl: string;
  altDescription: string;
  authorName: string;
  likes: number;
  largeDescription: string;
}
