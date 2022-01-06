import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
// import { Masonry } from "@mui/lab";
import {ImageList, ImageListItem} from '@mui/material';
import Photo from "./Photo";
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");

  const fetchImages = async () => {
    console.log(page)
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
          if(prevValue===0){
            return prevValue + 2;
          }
          return prevValue + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
    // eslint-disable-next-line
  }, []);

  const handleSumbit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            placeholder="search"
            className="form-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="submit-btn" onClick={handleSumbit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        {/* <div className="photos-center"> */}
        {/* <Masonry columns={{sm:1, md:3, lg:5}} spacing={1} sx={{width: '90vw',  margin: '0 auto'}}> */}
        <ImageList cols={4} gap={8} sx={{width: '90vw',  margin: '0 auto'}}>
          {photos.map((photo, index) => {
            // console.log(photo);
            return <Photo key={index} {...photo} mispar={index} />;
          })}
        </ImageList>
        {/* </div> */}
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
