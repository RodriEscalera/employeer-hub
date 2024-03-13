import React, { FC } from "react";
import { Box, Typography, Modal } from "@mui/material";
import style from "./ModalConfirmation.module.css";
import { IModalConfirmation } from "./ModalConfirmation.types";
import CustomButton from "../CustomButton/CustomButton";

const ModalConfirmation: FC<IModalConfirmation> = ({
  open,
  handleClose,
  handleOk,
  title,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={style.modal}
    >
      <Box className={style["box-container"]}>
        <Box className={style["box-typography-title"]}>
          <Typography textAlign="center" variant="h6" component="h2">
            {title}
          </Typography>
        </Box>

        <Box className={style["box-buttons"]}>
          <CustomButton
            className={style["cancel-button"]}
            onClick={handleClose}
          >
            CANCEL
          </CustomButton>
          <CustomButton className={style["accept-button"]} onClick={handleOk}>
            ACEPT
          </CustomButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalConfirmation;
