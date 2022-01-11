import React from "react";
import { Paper, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchForm = (props) => {
  const {handleSubmit, query, setQuery}= props
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
      </form>
    </Paper>
  );
};

export default SearchForm;
