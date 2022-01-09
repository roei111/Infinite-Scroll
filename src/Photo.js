import React from "react";
import { Grid, Grow } from "@mui/material";

const Photo = ({
  urls: { regular, small },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  },
  mispar,
}) => {
  const expandImageHandler = () => {
    console.log("clickeed");
  };

  return (
    <Grow in={true}>
      <Grid
        item
        key={mispar}
        sx={{
          height: "20rem",
          width: "30rem",
          marginX: "10px",
          
        }}
      >
        <img
          src={small}
          alt={alt_description}
          onClick={expandImageHandler}
          className="image"
        />
        {/* <div className="photo-info">
      <div>
        <h4>{name}</h4>
        <p>{likes} likes</p>
      </div>
      <a href={portfolio_url}>
        <img src={medium} alt={name} className="user-img" />
      </a>
    </div> */}
      </Grid>
    </Grow>
  );
};

export default Photo;
