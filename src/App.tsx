import SearchBar from "./components/SearchBar";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn";
import ImageModal from "./components/ImageModal";
import { useState, useEffect, useRef } from "react";
import getImages from "./components/unsplash";
import toast from "react-hot-toast";
import "./App.css";
import { Image, ImageResponse, ModalState } from "./types";

// Начальное состояние модального окна с указанными типами
const MODAL_INITIAL_STATE: ModalState = {
  modalIsOpen: false,
  srcUrl: "",
  altDescription: "",
  authorName: "",
  likes: 0,
  largeDescription: "",
};

function App() {
  const [search, setSearch] = useState<string>(""); // <string> типизация строки
  const [page, setPage] = useState<number>(1); // <number> типизация числа
  const [images, setImages] = useState<Image[]>([]); // <Image[]> типизация массива с объектами изображений
  const [loading, setLoading] = useState<boolean>(false); // <boolean> типизация для логического состояния
  const [error, setError] = useState<boolean>(false); // <boolean> типизация ошибки
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState<boolean>(false); // <boolean> для кнопки загрузки
  const [modalState, setModalState] = useState<ModalState>(MODAL_INITIAL_STATE); // <ModalState> типизация состояния модального окна
  const mainElem = useRef<HTMLDivElement>(null); // <HTMLDivElement> типизация ссылки на элемент

  const handleSearch = (newSearch: string): void => {
    // Указан тип параметра newSearch
    setSearch(newSearch);
    setPage(1);
    setImages([]);
  };

  const handleLoadMoreBtn = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleModalOpen = (
    srcUrl: string,
    altDescription: string,
    authorName: string,
    likes: number,
    largeDescription: string
  ) => {
    setModalState({
      modalIsOpen: true,
      srcUrl,
      altDescription,
      authorName,
      likes,
      largeDescription,
    });
  };

  const handleModalClose = (): void => {
    setModalState(MODAL_INITIAL_STATE);
  };

  useEffect((): void => {
    async function getImagesData(): Promise<void> {
      try {
        setError(false);

        if (search === "") {
          setShowLoadMoreBtn(false);
          return;
        }

        setLoading(true);

        const data: ImageResponse = await getImages(search, page);

        if (data.total === 0) {
          setShowLoadMoreBtn(false);
          toast("There are no results!");
          return;
        }

        setImages((prevImages) => [...prevImages, ...data.results]);

        setShowLoadMoreBtn(data.total_pages !== page);
      } catch (error: unknown) {
        setError(true);
        toast.error("Failed to fetch images. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    getImagesData();
  }, [search, page]);

  useEffect(() => {
    if (page === 1) return;

    mainElem.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [images, page]);

  return (
    <div ref={mainElem}>
      <SearchBar onSearch={handleSearch} />

      {error && <ErrorMessage />}

      <ImageGallery images={images} onImageClick={handleModalOpen} />

      {showLoadMoreBtn && !loading && (
        <LoadMoreBtn onLoadMoreBtn={handleLoadMoreBtn} />
      )}

      {loading && <Loader />}
      <ImageModal onModalClose={handleModalClose} modalState={modalState} />
    </div>
  );
}

export default App;
