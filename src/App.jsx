import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";

import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import "./App.css";
import ImageModal from "./components/ImageModal/ImageModal.jsx";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalParams, setModalParams] = useState({
    url: "",
    title: "",
    username: "",
    likes: 0,
  });
  const perPage = 12;
  const listRef = useRef();
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

  function openModal(url, description, name, likes) {
    setIsOpen(true);
    setModalParams({
      url: url,
      title: description,
      username: name,
      likes: likes,
    });
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    if (!query) return;
    async function fetchImages() {
      try {
        setLoading(true);
        setLoadMore(false);
        const response = await axios.get(
          "https://api.unsplash.com/search/photos/",
          {
            params: {
              page: page,
              per_page: perPage,
              query: query,
            },
          }
        );

        setImages((prevImages) => [...prevImages, ...response.data.results]);
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

  function handleSubmit(text) {
    setImages([]);
    setQuery(text);
  }

  useEffect(() => {
    if (listRef.current) {
      const itemSizes = listRef.current.lastChild.getBoundingClientRect();

      scrollBy({
        top: itemSizes.top + itemSizes.height * 2,
        behavior: "smooth",
      });
    }
  }, [images]);

  function addMoreItems() {
    setPage((prevPage) => prevPage + 1);
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
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass="loader"
        />
      )}
    </>
  );
}

export default App;
