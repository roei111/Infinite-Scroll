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

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    url = query
      ? `${searchUrl}${clientID}${urlPage}${urlQuery}`
      : `${mainUrl}${clientID}${urlPage}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((prevValue) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...prevValue, ...data.results];
        }
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
      />
      <PhotoList photos={photos} loading={loading}/>
      <ScrollTop showBelow={250} />
    </main>
  );
};

export default App;
