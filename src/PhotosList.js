import React, { useState, useEffect } from "react";
import { Grid, Paper, CircularProgress, Alert, Collapse } from "@mui/material";
import Photo from "./Photo";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

const PhotoList = (props) => {
  const { photos, loading } = props;
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    setIsAlertOpen(true);
    const timer = setTimeout(() => {
      setIsAlertOpen(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Paper
      elavation={3}
      component={"section"}
      sx={{ width: { sm: "70vw", md: "80vw" },paddingTop: "0.5rem", margin: "0 auto", backgroundColor: "#ffffff" }}
    >
      <Collapse in={isAlertOpen}>
        <Alert
          onClose={() => setIsAlertOpen(false)}
          severity="info"
          variant="filled"
          sx={{ width: "70%", margin: "0 auto 0.3rem", backgroundColor: "#D2042D" }}
        >
          Click image to view full size
        </Alert>
      </Collapse>
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
                position: "relative"
              }}
            >
              <Photo photo={photo} />
              <OpenInFullIcon style={{ position: "absolute" }} />
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
