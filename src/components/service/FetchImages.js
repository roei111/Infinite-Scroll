import { useEffect } from "react";

//Unsplash limits their free api to 50 requests per hour, so I opened 12 'projects' to bypass the limit, and this random helps to switch between the keys
const randomNum = Math.floor(Math.random() * (12 - 1 + 1) + 1);
//Access key and urls to Unsplash API
const access = `REACT_APP_ACCESS_KEY${randomNum}`;
const clientID = `?client_id=${process.env[access]}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

const FetchImages = (props) => {
  const {
    loading,
    setLoading,
    page,
    setPage,
    query,
    sortBy,
    orientation,
    color,
    noResultsMessage,
    setNoResultsMessage,
    setPhotos,
    addNewPhotos,
    setAddNewPhotos,
  } = props;
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
        setNoResultsMessage({ message: "", isPrevPhotos: false });
      }
      setLoading(false);
      setAddNewPhotos(false);
    } catch (error) {
      setLoading(false);
      setAddNewPhotos(false);
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

  useEffect(() => {
    if (!addNewPhotos) return;
    if (loading) return;
    setPage((prevValue) => {
      if (prevValue === 0) {
        return prevValue + 2;
      }
      return prevValue + 1;
    });
    // eslint-disable-next-line
  }, [addNewPhotos]);

  //when some filter variable changes, the fetchImages function runs with 'resetData' variable sets to true.
  useEffect(() => {
    fetchImages(true);
    // eslint-disable-next-line
  }, [sortBy, orientation, color]);

  useEffect(() => {
    //event listener that checks if the user scrolled to down to the end of the page
    if (noResultsMessage.message !== "") {
      return;
    }
    const event = window.addEventListener("scroll", () => {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        setAddNewPhotos(true);
      }
    });
    return () => window.removeEventListener("scroll", event);
  }, [noResultsMessage, setAddNewPhotos]);

  return null;
};

export default FetchImages;
