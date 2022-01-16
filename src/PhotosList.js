import React from "react";
import { Grid, Paper, CircularProgress,Typography } from "@mui/material";
import Photo from "./Photo";

const PhotoList = (props) => {
  const { photos, loading, message } = props;
  return (
    <Paper
      elavation={3}
      component={"section"}
      sx={{
        width: { sm: "70vw", md: "80vw" },
        padding: "0.5rem 0",
        margin: "0 auto",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Checks if there is no 'no results' and shows the photos accordingly with or without a 'no results' message */}
      {!message.message || (message.message && message.isPrevPhotos) ? (
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
                  position: "relative",
                }}
              >
                <Photo photo={photo} />
              </Grid>
            );
          })}
        </Grid>
      ) : null}
      {message.message ? (
        <Typography variant="h3" mb={5} textAlign={"center"} component="div">
          {message.message}
        </Typography>
      ) : null}
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
