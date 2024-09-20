import toast, { Toaster } from "react-hot-toast";
import { RxMagnifyingGlass } from "react-icons/rx";
import css from "./SearchBar.module.css";

// Определяем интерфейс для пропсов компонента
interface SearchBarProps {
  onSearch: (search: string) => void; // Типизация пропса onSearch
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const search = form.elements.namedItem("searchInput") as HTMLInputElement;
    const searchValue = search.value.trim();

    if (searchValue === "") {
      toast.error("Please enter text to search for images");
      return;
    }

    onSearch(searchValue);
    form.reset();
  };

  return (
    <header className={css.header}>
      <Toaster position="top-right" />
      {/* Компонент Toaster отображает уведомления на экране. */}
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchInput"
        />
        <button className={css.btn} type="submit">
          <RxMagnifyingGlass />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
