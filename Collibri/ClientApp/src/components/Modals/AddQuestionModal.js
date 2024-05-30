import { Divider, TextField, Typography, Box, Grid, Checkbox, FormControlLabel } from "@mui/material";
import React, { useRef, useState } from "react";
import CModal1 from "../Modals/CModal1";
import { addQuestion, addAnswer } from "../../api/QuizAPI";
import { CModalStyle } from "../../styles/CModalStyle";

const AddQuestionModal = (props) => {

    const QuestionName = useRef(null);
    const QuestionText = useRef(null);
    const AnswerA = useRef(null);
    const AnswerB = useRef(null);
    const AnswerC = useRef(null);
    const AnswerD = useRef(null);
    const BoxA = useRef(false);
    const BoxB = useRef(false);
    const BoxC = useRef(false);
    const BoxD = useRef(false);

    const [QuestionNameEmpty, setQuestionNameEmpty] = useState(false);
    const [QuestionTextEmpty, setQuestionTextEmpty] = useState(false);
    const [AnswerAEmpty, setAnswerAEmpty] = useState(false);
    const [AnswerBEmpty, setAnswerBEmpty] = useState(false);
    const [AnswerCEmpty, setAnswerCEmpty] = useState(false);
    const [AnswerDEmpty, setAnswerDEmpty] = useState(false);

    const handleAddQuestion = () => {
        setQuestionNameEmpty(false);
        setQuestionTextEmpty(false);
        setAnswerAEmpty(false);
        setAnswerBEmpty(false);
        setAnswerCEmpty(false);
        setAnswerDEmpty(false);

        if (QuestionName.current.value.trim() == '') {
            setQuestionNameEmpty(true);
            return;
        } else if (QuestionText.current.value.trim() == '') {
            setQuestionTextEmpty(true);
            return;
        } else if (AnswerA.current.value.trim() == '') {
            setAnswerAEmpty(true);
            return;
        } else if (AnswerB.current.value.trim() == '') {
            setAnswerBEmpty(true);
            return;
        } else if (AnswerC.current.value.trim() == '') {
            setAnswerCEmpty(true);
            return;
        } else if (AnswerD.current.value.trim() == '') {
            setAnswerDEmpty(true);
            return;
        }
        
        let question = completeQuestion(QuestionName.current.value, QuestionText.current.value, 0, props.selectedQuiz.id); 
        let answerA = completeAnswer(AnswerA.current.value.trim(), BoxA.current.checked, question.id);
        let answerB = completeAnswer(AnswerB.current.value.trim(), BoxB.current.checked, question.id);
        let answerC = completeAnswer(AnswerC.current.value.trim(), BoxC.current.checked, question.id);
        let answerD = completeAnswer(AnswerD.current.value.trim(), BoxD.current.checked, question.id);
        
        for (var i = 0; (postQuestion(question) == false) && (i < 5); i++);
        for (var i = 0; (postAnswer(answerA) == false) && (i < 5); i++);
        for (var i = 0; (postAnswer(answerB) == false) && (i < 5); i++);
        for (var i = 0; (postAnswer(answerC) == false) && (i < 5); i++);
        for (var i = 0; (postAnswer(answerD) == false) && (i < 5); i++);

        handleClose();
    }

    function postQuestion(quiz) {
        addQuestion(quiz);
    }

    async function postAnswer(answer) {
        await addAnswer(answer);
    }

    function completeQuestion(name, text, type, quizId) {
        let questionId = crypto.randomUUID();
        return {
            id: questionId,
            quizId: quizId,
            name: name,
            questionText: text,
            type: type
        }
    }
    function completeAnswer(answerText, isCorrect, questionId) {
        let answerId = crypto.randomUUID();
        return{
          id: answerId,
          questionId: questionId,
          answerText: answerText,
          isCorrect: isCorrect 
        }
    }



    const handleClose = () => {
        setQuestionNameEmpty(false);
        setQuestionTextEmpty(false);
        setAnswerAEmpty(false);
        setAnswerBEmpty(false);
        setAnswerCEmpty(false);
        setAnswerDEmpty(false);
        props.setAddQuestionModal(false);
    }

    return (
        <CModal1 showModal={props.addQuestionModal} handleClose={handleClose} handleChanges={handleAddQuestion}>
            <Box>
                <Typography variant="h5" sx={CModalStyle.text}>
                    Add Question
                </Typography>
                <br />
                <Grid container>
                    <Grid item xs={3}></Grid> 
                        <Grid item xs={6}>
                        <TextField fullWidth={true}
                            variant="standard"
                            label="Question Name"
                            inputRef={QuestionName}
                            error={QuestionNameEmpty}
                            helperText={
                                QuestionNameEmpty
                                    ? 'Required'
                                    : ''
                            }
                        ></TextField>
                        </Grid>
                    <Grid item xs={3}></Grid>
                </Grid>
                <br />
                <br />
                <TextField fullWidth={true}
                    multiline rows={4}
                    label="Question Text"
                    inputRef={QuestionText}
                    error={QuestionTextEmpty}
                    helperText={
                        QuestionTextEmpty
                            ? 'Required'
                            : ''
                    }
                ></TextField>
                <br />
                <br />
                <br />
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <Typography variant = "h7">Correct Answers</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="h5">Add Answers</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <FormControlLabel control={
                            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 42 } }} name="A" inputRef={BoxA} />} label={<Typography variant="h5">A</Typography>} />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            fullWidth={true}
                            label="Answer A"
                            inputRef={AnswerA}
                            error={AnswerAEmpty}
                            helperText={
                                AnswerAEmpty
                                    ? 'Required'
                                    : ''
                            }
                        ></TextField>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 42 } }} name="B" inputRef={BoxB} />} label={<Typography variant="h5">B</Typography>} />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            fullWidth={true}
                            label="Answer B"
                            inputRef={AnswerB}
                            error={AnswerBEmpty}
                            helperText={
                                AnswerBEmpty
                                    ? 'Required'
                                    : ''
                            }
                        ></TextField>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 42 } }} name="C" inputRef={BoxC} />} label={<Typography variant="h5">C</Typography>} />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            fullWidth={true}
                            label="Answer C"
                            inputRef={AnswerC}
                            error={AnswerCEmpty}
                            helperText={
                                AnswerCEmpty
                                    ? 'Required'
                                    : ''
                            }
                        ></TextField>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 42 } }} name="D" inputRef={BoxD} />} label={ <Typography variant="h5">D</Typography>} />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            fullWidth={true}
                            label="Answer D"
                            inputRef={AnswerD}
                            error={AnswerDEmpty}
                            helperText={
                                AnswerDEmpty
                                    ? 'Required'
                                    : ''
                            }
                        ></TextField>
                    </Grid>
                </Grid>
            </Box>
            <Divider />
        </CModal1>
    );
}

export default AddQuestionModal;