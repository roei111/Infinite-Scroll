import React from "react";
import {
  Paper,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchForm = (props) => {
  const { handleSubmit, query, setQuery, sortBy, setSortBy } = props;

  return (
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
          onClick={handleSubmit}
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
        {query ? (
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="sort-by">Sort by</InputLabel>
            <Select
              labelId="sort-by"
              id="sort-by"
              defaultValue={"relevant"}
            //   value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort by"
            >
              {/* <MenuItem value={{query.length===0 ? "relevant": "popular"}}>Relevance</MenuItem> */}
              
              <MenuItem value={"relevant"}>Relevance</MenuItem>

              <MenuItem value={"latest"}>Newest</MenuItem>
            </Select>
          </FormControl>
        ) : null}
      </form>
    </Paper>
  );
}

export default SearchForm;
