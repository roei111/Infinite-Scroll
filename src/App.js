import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ScrollTop from "./ScrollTop";

import Photo from "./Photo";
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

const App=()=> {
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

  const handleSumbit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchImages();
  };

  return (
    <main>
      <Paper
        elavation={3}
        component={"section"}
        sx={{ width: { sm: "70vw", md: "50vw" }, margin: "30px auto" }}
      >
        <form
          style={{ padding: "8px 5px", display: "flex", alignItems: "center" }}
        >
          <IconButton
            type="submit"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={handleSumbit}
          >
            <SearchIcon />
          </IconButton>
          <TextField
            label="Start searching now..."
            variant="standard"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </Paper>
      <Paper
        elavation={3}
        component={"section"}
        sx={{ width: { sm: "70vw", md: "80vw" }, margin: "0 auto" }}
      >
        <Grid container spacing={2} justifyContent="center">
          {photos.map((photo, index) => {
            // console.log(photo)
            return <Photo key={index} photo={photo}/>
          })}
        </Grid>

        <ScrollTop showBelow={250} />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {true && <CircularProgress sx={{ marginBottom: "50px", marginTop: "10px" }} />}
        </div>
      </Paper>
    </main>
  );
}

export default App;
