import {Divider, TextField, Typography} from "@mui/material";
import React, { useRef, useState } from "react";
import CModal from "../Modals/CModal";
import { editQuiz } from "../../api/QuizAPI";
import { CModalStyle } from "../../styles/CModalStyle";

const EditQuizModal = (props) => {

    const QuizName = useRef(null);
    const QuizDescription = useRef(null);
    const [isNameEmptyError, setIsNameEmptyError] = useState(false);
    const [isDescriptionEmptyError, setIsDescriptionEmptyError] = useState(false);

    const handleClose = () => {
        setIsDescriptionEmptyError(false);
        setIsNameEmptyError(false);
        props.setEditQuizModal(false);
    }

    function handleEditQuiz() {
        if (QuizName.current.value.trim() === '') {
            setIsNameEmptyError(true);
            return;
        } else if (QuizDescription.current.value.trim() === '') {
            setIsDescriptionEmptyError(true);
            setIsNameEmptyError(false);
            return;
        } else {
            setIsDescriptionEmptyError(false);
            setIsNameEmptyError(false);
            editQuiz(props.selectedQuiz.id,QuizName.current.value.trim(), QuizDescription.current.value.trim(), props.setQuizes);
            handleClose();
        }
    }

    return (
        <CModal showModal={props.editQuizModal} handleClose={handleClose} handleChanges={handleEditQuiz}>
            <Typography variant="h5" sx={CModalStyle.text}>
                Edit Quiz
            </Typography>
            <TextField fullWidth margin="normal" id="QuizNAme" label="QuizName" variant="outlined"
                error={isNameEmptyError}
                inputRef={QuizName}
                helperText={
                    isNameEmptyError
                        ? 'Quiz name cannot be empty'
                        : ' '
                }
                margin="normal" />
            <TextField fullWidth margin="normal" id="QuizDescription" label="QuizDescription" variant="outlined"
                error={isDescriptionEmptyError}
                inputRef={QuizDescription}
                helperText={
                    isDescriptionEmptyError
                        ? 'Quiz description cannot be empty'
                        : ' '
                }
                margin="normal" />
            <Divider />
        </CModal>
        /*<Modal open={props.editQuizModal} onClose={handleClose}>
            <Box sx={DocumentModalStyles.modal}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', marginBottom: '0%' }}>
                    <IconButton onClick={handleClose} sx={DocumentModalStyles.closeButton}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Box>
        </Modal>*/
    );
}

export default EditQuizModal;