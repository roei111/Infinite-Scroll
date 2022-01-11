import React from "react";
import { Grid, Paper, CircularProgress } from "@mui/material";
import Photo from "./Photo";

const PhotoList = (props) => {
    const {photos, loading}= props;
  return (
    <Paper
      elavation={3}
      component={"section"}
      sx={{ width: { sm: "70vw", md: "80vw" }, margin: "0 auto" }}
    >
      <Grid container spacing={2} justifyContent="center">
        {photos.map((photo, index) => {
          return (
            <Grid
              item
              key={index}
              sx={{
                height: "20rem",
                width: "30rem",
                marginX: "10px",
              }}
            >
              <Photo photo={photo} />
            </Grid>
          );
        })}
      </Grid>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {loading && (
          <CircularProgress sx={{ marginBottom: "50px", marginTop: "10px" }} />
        )}
      </div>
    </Paper>
  );
};

export default PhotoList;
