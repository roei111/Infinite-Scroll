import React, { useState, useEffect } from "react";
import ScrollTop from "./ScrollTop";
import SearchForm from "./SearchForm";
import PhotoList from "./PhotosList";
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevant");
  const [orientation, setOrientation] = useState("any");
  const [color, setColor] = useState("any");

  const fetchImages = async (resetData = false) => {
    console.log("resetdata: ", resetData);
    console.log("color: ",color)
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    const urlSortBy = `&order_by=${sortBy}`;
    const urlOrientation =
      orientation !== "any" ? `&orientation=${orientation}` : "";
    const urlColor =
      color !== "any" ? `&color=${color.toLowerCase()}` : "";
    url = query
      ? `${searchUrl}${clientID}${urlPage}${urlQuery}${urlSortBy}${urlOrientation}${urlColor}`
      : `${mainUrl}${clientID}${urlPage}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((prevValue) => {
        if (query && page === 1) {
          return data.results;
        } else if (!query && resetData) {
          console.log("Reset");
          return data;
        } else if (query && resetData) {
          return data.results;
        } else if (query) {
          return [...prevValue, ...data.results];
        }

        // else if (sortBy) {
        //   return data;
        // }

        return [...prevValue, ...data];
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    console.log("inside use effeect");
    fetchImages(true);
    // eslint-disable-next-line
  }, [sortBy, orientation, color]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        !loading &&
        window.scrollY + window.innerHeight >= document.body.scrollHeight
      ) {
        setPage((prevValue) => {
          if (prevValue === 0) {
            return prevValue + 2;
          }
          return prevValue + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPhotos([]);
    setPage(1);
    fetchImages();
  };

  return (
    <main>
      <SearchForm
        handleSubmit={handleSubmit}
        query={query}
        setQuery={setQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        orientation={orientation}
        setOrientation={setOrientation}
        color={color}
        setColor={setColor}
      />
      <PhotoList photos={photos} loading={loading} />
      <ScrollTop showBelow={250} />
    </main>
  );
};

export default App;
