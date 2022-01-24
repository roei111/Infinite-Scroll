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
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    [theme.breakpoints.up("xs")]: { margin: "0.5rem" },
    [theme.breakpoints.up("md")]: { margin: "1rem auto", width: "85vw" },
    marginTop: "1rem",
  },
  linkStyle: {
    textDecoration: "none",
    color: "black",
  },
  cardMediaStyle: {
    maxHeight: "75vh",
    objectFit: "contain",
  },
  cardActionsStyle: {
    display: "flex",
    [theme.breakpoints.up("xs")]: { justifyContent: "space-between" },
    [theme.breakpoints.up("md")]: { justifyContent: "space-evenly" },
  },
  likesWrapper: {
    display: "flex",
  },
  iconStyle: {
    fill: "#D2042D",
  },
}));

const DetailedPhoto = (props) => {
  const classes = useStyles();
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
      <Card className={classes.cardStyle}>
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
              className={classes.linkStyle}
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
          className={classes.cardMediaStyle}
        />
        <CardActions className={classes.cardActionsStyle}>
          <div className={classes.likesWrapper}>
            <FavoriteIcon className={classes.iconStyle} />
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
