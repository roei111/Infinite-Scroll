import React from "react";
import { ImageList, ImageListItem } from "@mui/material";

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
    <ImageListItem
      key={mispar}
      sx={{
        width: "20rem",
        // height: "10rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* <div className="photo"> */}
      {/* <h4>{mispar} index key</h4> */}
      <img src={small} alt={alt_description} onClick={expandImageHandler} />
      {/* <div className="photo-info">
        <div>
          <h4>{name}</h4>
          <p>{likes} likes</p>
        </div>
        <a href={portfolio_url}>
          <img src={medium} alt={name} className="user-img" />
        </a>
      </div> */}
      {/* </div> */}
    </ImageListItem>
  );
};

export default Photo;
