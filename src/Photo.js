import React from "react";
import { Grid } from "@mui/material";

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
    <Grid item key={mispar} sx={{ height: "20rem", width: "30rem",marginX: '10px' }}>
      <img
        src={small}
        alt={alt_description}
        onClick={expandImageHandler}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
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
  );
};

export default Photo;
