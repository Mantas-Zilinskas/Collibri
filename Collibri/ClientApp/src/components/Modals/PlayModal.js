import { Button ,Divider, TextField, Typography, Box, Grid, Checkbox, FormControlLabel, Modal } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CModal2 from "../Modals/CModal2";
import CModal from "../Modals/CModal";
import { addQuestion, addAnswer, getQuestions, getAnswers } from "../../api/QuizAPI";
import { CModalStyle } from "../../styles/CModalStyle";

const PlayModal = (props) => {

    const [playing, setPlaying] = useState(false);
    const [results, setResults] = useState(false);
    const [QnAs, setQnAs] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [correctAns, setCorrectAns] = useState(0);

    function getQuestionsAndAnswers(quiz) {
        var questionsAndAnswers = [];
        var questions = getQuestions(props.selectedQuiz.id);

        questions.forEach((question) => {
            var answers = getAnswers(question.id);
            if (answers.length == 4) {
                var newObj = { ...question, answers: answers }
                questionsAndAnswers  = questionsAndAnswers.concat(newObj);
            }
        });
        return questionsAndAnswers;
    }
    function answer1() {
        handleAnswer(0);
    }
    function answer2() {
        handleAnswer(1);
    }
    function answer3() {
        handleAnswer(2);
    }
    function answer4() {
        handleAnswer(3);
    }
    function handleAnswer(index) {
        var b = QnAs[questionIndex].answers[index].isCorrect;
        if (b == true) {
            setCorrectAns(correctAns + 1);
        }
        setQuestionIndex(questionIndex + 1);

        if ((QnAs.length - 1)== questionIndex) {
            setPlaying(false);
            setResults(true);
        }
    }

    useEffect(() => {
        if(props.playModal == true){
            setQnAs(getQuestionsAndAnswers(props.selectedQuiz));

        }
    }, [props.playModal]);

    function handleStart() {
        if (QnAs.length > 0) {
            setPlaying(true);
        } else
            setResults(true);
    }

    const handleClose = () => {
        setPlaying(false);
        setResults(false);
        setQnAs([]);
        setQuestionIndex(0);
        setCorrectAns(0);
        props.setPlayModal(false);
    }

    return (
 
                <CModal2 showModal={props.playModal} handleClose={handleClose}>
            {(playing == false && results == false) ?
                (
                    <Box width='100%' height='100%' justifyContent='center'>
                        <Button sx={CModalStyle.buttons} onClick={handleStart}> Start </Button>
                    </Box>
                ) :
                (
                    (playing) ?
                        (
                            <Box width='100%' height='100%' >
                                <Box border={1} borderRadius={3} width="80%" height="50%" justifyContent='center' alignItems='center'>
                                    <Typography variant="h5">{QnAs[questionIndex].questionText}</Typography>
                                </Box>
                                <Grid container spacing={2} >
                                    <Grid item sx={6} width='50%' height="50%"><Button onClick={answer1} sx={CModalStyle.buttons}>{QnAs[questionIndex].answers[0].answerText}</Button></Grid>
                                    <Grid item sx={6} width='50%' height="50%"><Button onClick={answer2} sx={CModalStyle.buttons}>{QnAs[questionIndex].answers[1].answerText}</Button></Grid>
                                    <Grid item sx={6} width='50%' height="50%"><Button onClick={answer3} sx={CModalStyle.buttons}>{QnAs[questionIndex].answers[2].answerText}</Button></Grid>
                                    <Grid item sx={6} width='50%' height="50%"><Button onClick={answer4} sx={CModalStyle.buttons}>{QnAs[questionIndex].answers[3].answerText}</Button></Grid>
                                </Grid>
                            </Box>
                        ) : (
                            <Box sx={{width:'100%', height:'100%', alignItems: 'center', justifyContent: 'center'}}>
                                <Typography variant='h4'>Result:</Typography>
                                <Typography variant='h4'>You got {correctAns} questions right out of {questionIndex}</Typography>
                            </Box>
                        )
                )}
                </CModal2 >
    );
}

export default PlayModal;