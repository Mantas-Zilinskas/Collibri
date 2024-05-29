import { Button, Box, Divider, IconButton, TextField, Typography, Tooltip, Menu, MenuItem } from "@mui/material";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from "@mui/icons-material/Delete";
import CModal from "../Modals/CModal";
import { createSection } from "../../api/SectionApi";
import { createQuiz } from "../../api/QuizAPI";
import { RoomLayoutStyle, RoomLayoutStyles } from "../../styles/RoomLayoutStyle";
import { useSelector } from "react-redux";
import { CModalStyle } from "../../styles/CModalStyle";


export const AddSection = ({ setSections, sections, setQuizes, quizes }) => {
    const nameFieldRef = useRef(null);
    const QuizName = useRef(null);
    const QuizDescription = useRef(null);
    const [open, setOpen] = useState(false);
    const [isEmptyError, setIsEmptyError] = useState(false);
    const [isNameEmptyError, setIsNameEmptyError] = useState(false);
    const [isDescriptionEmptyError, setIsDescriptionEmptyError] = useState(false);
    const [isAlreadyUsedError, setIsAlreadyUsedError] = useState(false);
    const rooms = useSelector((state) => state.rooms);
    const { roomId } = useParams()

    const [anchorEl, setAnchorEl] = useState(null);
    const [quizOpen, setQuizOpen] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose1 = () => {
        setAnchorEl(null);
    };

    const handleOpen = () => setOpen(true);
    const openQuizModal = () => setQuizOpen(true);
    const handleClose = () => {
        handleClose1();
        setOpen(false);
        setQuizOpen(false);
        setIsEmptyError(false);
        setIsAlreadyUsedError(false);
        setIsDescriptionEmptyError(false);
        setIsNameEmptyError(false);
    }

    const handleOnChange = () => {
        setIsEmptyError(false);
        setIsAlreadyUsedError(false);
    }

    function handleCreateSection() {

        if (nameFieldRef.current.value.trim() === '') {
            setIsEmptyError(true);
            return;
        } else if (sections.some(section => section.sectionName === nameFieldRef.current.value.trim())) {
            setIsAlreadyUsedError(true);
            return;
        } else {
            handleClose();
            createSection(nameFieldRef.current.value.trim(), roomId, setSections);
        }
    }

    function handleCreateQuiz() {
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
            createQuiz(QuizName.current.value.trim(), QuizDescription.current.value.trim(), roomId, setQuizes);
            handleClose();
        }
    }

    return (
        <Box sx={{ height: '13%', display: 'flex', }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '15%', height: '100%' }}>
                <Tooltip title="Add section or quiz">
                    <IconButton sx={{ ...RoomLayoutStyles.addSettingsButtons, color: '#269160' }} color="success" onClick={handleClick}>
                        <AddBoxIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    handleClose={handleClose}
                >
                    <MenuItem onClick={handleOpen}>Add Section</MenuItem>
                    <MenuItem onClick={openQuizModal}>Add Quiz</MenuItem>
                </Menu>
            </Box>
            <Box sx={{ display: 'flex', marginLeft: '1rem', alignItems: 'center', width: '85%', height: '100%' }}>
                <Typography variant="h4" style={RoomLayoutStyle.roomName}>
                    {rooms.currentRoom.name}
                </Typography>
            </Box>
            <CModal showModal={open} handleClose={handleClose} handleChanges={handleCreateSection}>
                <Typography variant="h5" sx={CModalStyle.text}>
                    Create a new Section
                </Typography>
                <TextField fullWidth margin="normal" id="sectionName" label="Section name" variant="outlined"
                    error={isEmptyError || isAlreadyUsedError}
                    inputRef={nameFieldRef}
                    helperText={
                        isEmptyError
                            ? 'Section name cannot be empty'
                            : isAlreadyUsedError
                                ? 'Section name is already used'
                                : ' '
                    }
                    onChange={handleOnChange} margin="normal" />
                <Divider />
            </CModal>
            {/*add quiz modal*/}
            <CModal showModal={quizOpen} handleClose={handleClose} handleChanges={handleCreateQuiz}>
                <Typography variant="h5" sx={CModalStyle.text}>
                    Create a new Quiz
                </Typography>
                <TextField fullWidth margin="normal" id="QuizNAme" label="QuizName" variant="outlined"
                    error={isNameEmptyError}
                    inputRef={QuizName}
                    helperText={
                        isNameEmptyError
                            ? 'Quiz name cannot be empty'
                            : ' '
                    }
                    onChange={handleOnChange} margin="normal" />
                <TextField fullWidth margin="normal" id="QuizDescription" label="QuizDescription" variant="outlined"
                    error={isDescriptionEmptyError}
                    inputRef={QuizDescription}
                    helperText={
                        isDescriptionEmptyError
                            ? 'Quiz description cannot be empty'
                            : ' '
                    }
                    onChange={handleOnChange} margin="normal" />
                <Divider />
            </CModal>
        </Box>
    );
}