import React, {useEffect, useState} from 'react';
import {Alert, AlertTitle, Box, Button, Fade, Modal} from '@mui/material';
import { Check, Clear } from '@mui/icons-material';
import { CModalStyle, customModal, modalContent } from "../../styles/CModalStyle";
import { CModalStyle1} from "../../styles/CModalStyle1";


// custom modal template for any modal with three props: showModal bool, handleClose and handleChanges function
// can be used in any basic modal
const CModal1 = (props) => {
  const [alertVisibility, setAlertVisibility] = useState(false);
  
  const onSuccess = () => {
    setAlertVisibility(true);
    props.handleChanges();
  }
  
  return (
    <>
      <Fade
          in={alertVisibility}
          timeout={{ enter: 500, exit: 500 }}
          addEndListener={() => {
            setTimeout(() => {
              setAlertVisibility(false)
            }, 2000);
          }}
          sx={CModalStyle.alert}
      >
        <Alert severity="success" variant="standard" className="alert">
          <AlertTitle>Success</AlertTitle>
            Action was successful!
        </Alert>
      </Fade>
      <Modal open={props.showModal} onClose={props.handleClose}>
        <Box sx={CModalStyle1.modal} align="center">
          {props.children}
          <Box sx={CModalStyle.content}>
            <Button onClick={props.handleClose} sx={CModalStyle.buttons}>
              <Clear />
            </Button>
            <Button onClick={onSuccess} sx={CModalStyle.buttons}>
              <Check />
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default CModal1;