import React, { useState } from "react";
import {
  Paper,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CropPortraitSharpIcon from "@mui/icons-material/CropPortraitSharp";
import CropSquareSharpIcon from "@mui/icons-material/CropSquareSharp";
import CropLandscapeSharpIcon from "@mui/icons-material/CropLandscapeSharp";
import CircleIcon from "@mui/icons-material/Circle";
// import { CirclePicker } from "react-color";

const palette = [
  "Black",
  "White",
  "Yellow",
  "Orange",
  "Red",
  "Purple",
  "Green",
  "Teal",
  "Blue",
];

const SearchForm = (props) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const {
    handleSubmit,
    query,
    setQuery,
    sortBy,
    setSortBy,
    orientation,
    setOrientation,
    setColor,
    color,
  } = props;
  let openFilters = query.length !== 0;

  const clearFilters = () => {
    setOrientation("any");
    setColor("any");
    setSortBy("relevant");
    setIsButtonDisabled(true);
  };

  return (
    <Paper
      elavation={3}
      component={"section"}
      sx={{ width: { sm: "70vw", md: "50vw" }, margin: "1rem auto" }}
    >
      <form
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "95%",
            padding: "10px 0",
          }}
        >
          <IconButton type="submit" aria-label="search" onClick={handleSubmit} >
            <SearchIcon />
          </IconButton>
          <TextField
            label="Start searching now..."
            variant="standard"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Collapse in={openFilters}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 150, verticalAlign: "baseline" }}
            >
              <InputLabel id="sort-by">Sort by</InputLabel>
              <Select
                labelId="sort-by"
                id="sort-by"
                defaultValue={"relevant"}
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setIsButtonDisabled(false);
                }}
                label="Sort by"
              >
                <MenuItem value={"relevant"}>Relevance</MenuItem>
                <MenuItem value={"latest"}>Newest</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 150, verticalAlign: "baseline" }}
            >
              <InputLabel id="orientation">Orientation</InputLabel>
              <Select
                labelId="orientation"
                id="orientation"
                defaultValue={"any"}
                value={orientation}
                onChange={(e) => {
                  setOrientation(e.target.value);
                  setIsButtonDisabled(false);
                }}
                label="Orientation"
              >
                <MenuItem value={"any"}>Any orientation</MenuItem>
                <MenuItem value={"landscape"}>
                  <CropLandscapeSharpIcon style={{ marginRight: "5px" }} />
                  Landscape
                </MenuItem>
                <MenuItem value={"portrait"}>
                  <CropPortraitSharpIcon style={{ marginRight: "5px" }} />
                  Portrait
                </MenuItem>
                <MenuItem value={"squarish"}>
                  <CropSquareSharpIcon style={{ marginRight: "5px" }} />
                  Square
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 150, verticalAlign: "baseline" }}
            >
              <InputLabel id="color">Color</InputLabel>
              <Select
                labelId="color"
                id="color"
                defaultValue={"any"}
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                  setIsButtonDisabled(false);
                }}
                label="Color"
              >
                <MenuItem value={"any"}>Any color</MenuItem>
                <MenuItem value={"black_and_white"}>Black and white</MenuItem>
                {palette.map((color, index) => {
                  return (
                    <MenuItem value={color} key={index}>
                      <CircleIcon
                        style={{ fill: `${color}`, marginRight: "5px" }}
                      />
                      {color}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              disabled={isButtonDisabled}
              sx={{
                m: 1,
                minWidth: 150,
                verticalAlign: "baseline",
                backgroundColor: "#D2042D",
              }}
              onClick={clearFilters}
            >
              Clear filters
            </Button>
          </div>
        </Collapse>
      </form>
    </Paper>
  );
};

export default SearchForm;
