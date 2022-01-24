import React, { useState } from "react";
import ScrollTop from "./components/layout/ScrollTop";
import SearchForm from "./components/form/SearchForm";
import PhotoList from "./components/photo/PhotosList";
import NavBar from "./components/layout/NavBar";
import FetchImages from "./components/service/FetchImages";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

//Enable smooth scroll for ios devices
import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();

let theme = createTheme();
theme = responsiveFontSizes(theme);

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
  const [addNewPhotos, setAddNewPhotos] = useState(false);

  const handleSubmit = (e) => {
    //reset the photos data and run fetchImages function
    e.preventDefault();
    setPhotos([]);
    setPage(1);
    setAddNewPhotos(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <main>
        <FetchImages
          loading={loading}
          setLoading={setLoading}
          page={page}
          setPage={setPage}
          query={query}
          sortBy={sortBy}
          orientation={orientation}
          color={color}
          noResultsMessage={noResultsMessage}
          setNoResultsMessage={setNoResultsMessage}
          setPhotos={setPhotos}
          addNewPhotos={addNewPhotos}
          setAddNewPhotos={setAddNewPhotos}
        />
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
    </ThemeProvider>
  );
};

export default App;
