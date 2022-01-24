import React from "react";
import { Grid, Paper, CircularProgress, Typography } from "@mui/material";
import Photo from "./Photo";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    [theme.breakpoints.up("sm")]: { width: "70vw" },
    [theme.breakpoints.up("md")]: { width: "80vw" },
    padding: "0.5rem 0",
    margin: "0 auto",
    backgroundColor: "#ffffff",
  },
  gridStyle: {
    height: "20rem",
    width: "30rem",
    margin: "0 10px",
    position: "relative",
  },
  loaderWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  loaderStyle: {
    marginBottom: "50px",
    marginTop: "10px",
  },
}));

const PhotoList = (props) => {
  const classes = useStyles();
  const { photos, loading, message } = props;
  return (
    <Paper elavation={3} component={"section"} className={classes.paperStyle}>
      {/* Checks if there is no 'no results' and shows the photos accordingly with or without a 'no results' message */}
      {!message.message || (message.message && message.isPrevPhotos) ? (
        <Grid container spacing={2} justifyContent="center">
          {photos.map((photo, index) => {
            return (
              <Grid item key={index} className={classes.gridStyle}>
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
      ) : (
        <div className={classes.loaderWrapper}>
          {loading && <CircularProgress className={classes.loaderStyle} />}
        </div>
      )}
    </Paper>
  );
};

export default PhotoList;
