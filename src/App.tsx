import { useEffect, useState, useRef } from "react";
import axios, { AxiosResponse as AxiosResponseType } from "axios";
import { RotatingSquare } from "react-loader-spinner";
import toast from "react-hot-toast";

import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import "./App.css";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import { Image, ModalParams } from "./types";

interface ApiResponse {
  total: number;
  results: Image[];
}

function App() {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalParams, setModalParams] = useState<ModalParams>({
    url: "",
    title: "",
    username: "",
    likes: 0,
  });
  const perPage = 12;
  const listRef = useRef<HTMLUListElement>(null);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  axios.defaults.headers.common["Authorization"] =
    "Client-ID jODoq13Aors36PWjuvxRfHsS5_Hl2a7Jd6nVEVwfyd8";
  axios.defaults.headers.common["Accept-Version"] = "v1";

  function openModal(
    url: string,
    description: string,
    name: string,
    likes: number
  ): void {
    setIsOpen(true);
    setModalParams({
      url: url,
      title: description,
      username: name,
      likes: likes,
    });
  }

  function closeModal(): void {
    setIsOpen(false);
  }
  useEffect(() => {
    if (!query) return;
    async function fetchImages<AxiosResponse>(): Promise<void> {
      try {
        setLoading(true);
        setLoadMore(false);
        const response: AxiosResponseType<ApiResponse> = await axios.get(
          "https://api.unsplash.com/search/photos/",
          {
            params: {
              page: page,
              per_page: perPage,
              query: query,
            },
          }
        );

        setImages((prevImages: Image[]) => [
          ...prevImages,
          ...response.data.results,
        ]);
        if (response.data.total > page * perPage) {
          setLoadMore(true);
        } else {
          toast("You've reached the end of search results");
        }
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [query, page]);

  function handleSubmit(text: string): void {
    setImages([]);
    setQuery(text);
  }

  useEffect(() => {
    if (listRef.current) {
      const lastChild = listRef.current.lastChild;
      if (lastChild instanceof Element) {
        const itemSizes = lastChild.getBoundingClientRect();

        scrollBy({
          top: itemSizes.top + itemSizes.height * 2,
          behavior: "smooth",
        });
      }
    }
  }, [images]);

  function addMoreItems(): void {
    setPage((prevPage: number) => prevPage + 1);
    setLoadMore(false);
  }

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {error && <p>An error occured. Please try later!</p>}
      {images.length > 0 && (
        <ImageGallery images={images} listRef={listRef} openModal={openModal} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        description={modalParams}
      />
      {loadMore && <LoadMoreBtn onClick={addMoreItems} />}
      {loading && (
        <RotatingSquare
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="rotating-square-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
    </>
  );
}

export default App;
