import React, { useState } from "react";
import { Grid, Grow, Modal } from "@mui/material";
import DetailedPhoto from "./DetailedPhoto";

const Photo = (
  props
  //   {
  //   urls: { small },
  //   alt_description,
  //   likes,
  //   user: {
  //     name,
  //     portfolio_url,
  //     profile_image: { medium },
  //   },
  //   id,
  // }
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    urls: { small },
    alt_description,
    id,
  } = props.photo;

  const expandImageHandler = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <Modal open={isModalOpen} onClose={handleClose} closeAfterTransition sx={{overflow:'scroll'}}>
        <div
          style={{
            // maxWidth: "100vw",
            maxHeight: "80vh",
            width: "auto",
            // position: "absolute",
            // top: "50%",
            // left: "50%",
            // transform: "translateY(-50%)",
            // transform: "translate(-50%, -50%)",
            margin: "0 auto",
            marginTop: "5rem"
          }}
        >
          <DetailedPhoto photo={props.photo} closeModal={handleClose} />
        </div>
      </Modal>
      <Grow in={true}>
        <Grid
          item
          key={id}
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
        </Grid>
      </Grow>
    </>
  );
};

export default Photo;
