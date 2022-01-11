import React from "react";
import {
  Slide,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";

const DetailedPhoto = (props) => {
  const {
    urls: { regular },
    likes,
    user: {
      name,
      profile_image: { medium },
      location,
    },
    links: { html },
    created_at,
  } = props.photo;
  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <Card
        sx={{
          margin: "0 auto",
          marginTop: "1rem",
          width: { md: "85vw" },
        }}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="profile_image">
              <a href={html} target="_blank" rel="noopener noreferrer">
                <img src={medium} alt={name} />
              </a>
            </Avatar>
          }
          action={
            <IconButton
              aria-label="settings"
              onClick={() => props.closeModal()}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          }
          title={
            <a
              href={html}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "black" }}
            >
              {name}
            </a>
          }
          subheader={location}
        />
        <CardMedia
          component="img"
          image={regular}
          alt="Paella dish"
          sx={{ maxHeight: "75vh", objectFit: "contain" }}
        />
        <CardActions
          sx={{
            display: "flex",
            justifyContent: { xs: "space-between", md: "space-evenly" },
          }}
        >
          <div style={{ display: "flex" }}>
            <FavoriteIcon />
            <Typography ml={1}>{likes} likes</Typography>
          </div>

          <Typography ml={1}>
            Published on{" "}
            {new Date(created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </CardActions>
      </Card>
      </Slide>
  );
};

export default DetailedPhoto;
