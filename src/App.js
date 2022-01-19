import React, { useState} from "react";
import ScrollTop from "./ScrollTop";
import SearchForm from "./SearchForm";
import PhotoList from "./PhotosList";
import NavBar from "./NavBar";

//Enable smooth scroll for ios devices
import smoothscroll from "smoothscroll-polyfill";
import FetchImages from "./FetchImages";
smoothscroll.polyfill();


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
  };

  return (
    <>
      <NavBar />
      <main style={{ margin: "0.5rem" }}>
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
    </>
  );
};

export default App;
