import React, { useState } from "react";
import { Grow, Modal } from "@mui/material";
import DetailedPhoto from "./DetailedPhoto";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  iconStyle: {
    position: "absolute",
    right: "0",
    fill: "white",
    padding: "0.5rem",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "50%",
    margin: "0.25rem",
  },
  imageWrapper: {
    height: "100%",
    width: "100%",
    position: "relative",
    cursor: "pointer",
  },
});

const Photo = (props) => {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    urls: { small },
    alt_description,
  } = props.photo;

  const expandImageHandler = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        closeAfterTransition
        sx={{ overflow: "scroll" }}
      >
        <>
          <DetailedPhoto photo={props.photo} closeModal={handleClose} />
        </>
      </Modal>
      <Grow in={true}>
        <div className={classes.imageWrapper} onClick={expandImageHandler}>
          <img src={small} alt={alt_description} className="image" />
          <OpenInFullIcon className={classes.iconStyle} fontSize="small" />
        </div>
      </Grow>
    </>
  );
};

export default Photo;
