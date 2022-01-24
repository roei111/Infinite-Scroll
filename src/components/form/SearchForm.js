import React, { useState } from "react";
import {
  Paper,
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
import { makeStyles } from "@mui/styles";

//Colors palette for the Color filter
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

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    margin: "1rem auto",
    [theme.breakpoints.up("sm")]: { width: "70vw" },
    [theme.breakpoints.up("md")]: { width: "50vw" },
  },
  formStyle: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  searchDiv: {
    display: "flex",
    width: "95%",
    padding: "10px 0",
  },
  buttonStyle: {
    minWidth: "120px",
    backgroundColor: "#D2042D",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "#b00024",
    },
  },
  filtersWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  filterStyle: {
    margin: "0.5rem",
    minWidth: "150px",
  },
  iconStyle: {
    marginRight: "5px",
  },
}));

const SearchForm = (props) => {
  const classes = useStyles();
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
    <Paper elavation={3} component={"section"} className={classes.paperStyle}>
      <form className={classes.formStyle}>
        <div className={classes.searchDiv}>
          <TextField
            label="Start searching now..."
            variant="standard"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            type="submit"
            className={classes.buttonStyle}
            variant="contained"
            aria-label="search"
            endIcon={<SearchIcon />}
          >
            Search
          </Button>
        </div>
        <Collapse in={openFilters}>
          <div className={classes.filtersWrapper}>
            <FormControl variant="standard" className={classes.filterStyle}>
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

            <FormControl variant="standard" className={classes.filterStyle}>
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
                  <CropLandscapeSharpIcon className={classes.iconStyle} />
                  Landscape
                </MenuItem>
                <MenuItem value={"portrait"}>
                  <CropPortraitSharpIcon className={classes.iconStyle} />
                  Portrait
                </MenuItem>
                <MenuItem value={"squarish"}>
                  <CropSquareSharpIcon className={classes.iconStyle} />
                  Square
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" className={classes.filterStyle}>
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
                        style={{ fill: `${color}` }}
                        className={classes.iconStyle}
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
              className={`${classes.buttonStyle} ${classes.filterStyle}`}
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
