import React from "react";
import { Grid, Paper, CircularProgress, Typography } from "@mui/material";
import Photo from "./Photo";

const PhotoList = (props) => {
  const { photos, loading } = props;
  return (
    <Paper
      elavation={3}
      component={"section"}
      sx={{ width: { sm: "70vw", md: "80vw" }, margin: "0 auto" }}
    >
      <Typography variant="h3" component="div" textAlign={"center"}>
        Click image to view full size
      </Typography>
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
