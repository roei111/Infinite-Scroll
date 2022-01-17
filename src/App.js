import React, { useState, useEffect } from "react";
import ScrollTop from "./ScrollTop";
import SearchForm from "./SearchForm";
import PhotoList from "./PhotosList";
import NavBar from "./NavBar";

//Enable smooth scroll for ios devices
import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();

//Unsplash limits their free api to 50 requests per hour, so I opened 12 'projects' to bypass the limit, and this random helps to switch between the keys
const randomNum = Math.floor(Math.random() * (12 - 1 + 1) + 1);
//Access key and urls to Unsplash API
const access = `REACT_APP_ACCESS_KEY${randomNum}`;
const clientID = `?client_id=${process.env[access]}`;
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
  const [noResultsMessage, setNoResultsMessage] = useState({
    message: "",
    isPrevPhotos: false,
  });

  //When some filter variable changes, the function runs with 'resetData' variable sets to true.
  const fetchImages = async (resetData = false) => {
    setLoading(true);
    //Set the url params
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    const urlSortBy = `&order_by=${sortBy}`;
    const urlOrientation =
      orientation !== "any" ? `&orientation=${orientation}` : "";
    const urlColor = color !== "any" ? `&color=${color.toLowerCase()}` : "";
    //Switch between search for any photo to search with specific filters and query
    url = query
      ? `${searchUrl}${clientID}${urlPage}${urlQuery}${urlSortBy}${urlOrientation}${urlColor}`
      : `${mainUrl}${clientID}${urlPage}`;
    try {
      const response = await fetch(url);
      //In this api status code 403 means you've reached the maximum requests per hour so when this happends, I refresh the page to get new access key with 50 more requests
      if (response.status === 403) {
        window.location.reload();
      }
      const data = await response.json();
      //Checks if there is no results at all, or no more results, and sets the message
      if (data.results && data.results.length === 0) {
        if (data.total === 0) {
          if (resetData) {
            setNoResultsMessage({
              message: `Sorry, we could'nt find anything for "${query}" with your filters`,
              isPrevPhotos: false,
            });
          } else {
            setNoResultsMessage({
              message: `Sorry, we could'nt find anything for "${query}"`,
              isPrevPhotos: false,
            });
          }
        } else
          setNoResultsMessage({
            message: "Sorry, there is no more results :(",
            isPrevPhotos: true,
          });
      } else {
        //Set the new photos according to the parameters
        setNoResultsMessage({ message: "", isPrevPhotos: false });
        setPhotos((prevValue) => {
          if (query && page === 1) {
            return data.results;
          } else if (!query && resetData) {
            return data;
          } else if (query && resetData) {
            return data.results;
          } else if (query) {
            return [...prevValue, ...data.results];
          }
          return [...prevValue, ...data];
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setNoResultsMessage({
        message:
          "There is a limit of 50 searches per hour, please try again later.",
        isPrevPhotos: false,
      });
    }
  };
  //
  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, [page]);

  //when some filter variable changes, the fetchImages function runs with 'resetData' variable sets to true.
  useEffect(() => {
    fetchImages(true);
    // eslint-disable-next-line
  }, [sortBy, orientation, color]);

  useEffect(() => {
    //event listener that checks if the user scrolled to down to the end of the page
    const event = window.addEventListener("scroll", () => {
      if (
        !loading &&
        noResultsMessage.message === "" &&
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
  }, [noResultsMessage.message]);

  const handleSubmit = (e) => {
    //reset the photos data and run fetchImages function
    e.preventDefault();
    setPhotos([]);
    setPage(1);
    fetchImages();
  };

  return (
    <>
      <NavBar />
      <main style={{ margin: "0.5rem" }}>
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
        <PhotoList
          photos={photos}
          loading={loading}
          message={noResultsMessage}
        />
        <ScrollTop showBelow={250} />
      </main>
    </>
  );
};

export default App;
