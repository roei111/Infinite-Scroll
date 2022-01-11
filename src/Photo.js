import React, { useState } from "react";
import { Grow, Modal } from "@mui/material";
import DetailedPhoto from "./DetailedPhoto";

const Photo = (
  props
) => {
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
        <img
          src={small}
          alt={alt_description}
          onClick={expandImageHandler}
          className="image"
        />
      </Grow>
    </>
  );
};

export default Photo;
