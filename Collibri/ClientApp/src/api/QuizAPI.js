export const getQuizes = (setQuizes, roomId) => {
    fetch('https://localhost:7176/api/Quiz/GetAllByRoomId/' + roomId)
        .then(response => response.json())
        .then(data => {
            setQuizes(data);
            console.log(data)
        })
        .catch(error => console.error('Error fetching data:', error));
}

export const deleteQuiz = (quiz, setQuizes) => {
    fetch('https://localhost:7176/api/Quiz/DeleteById' + quiz.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(data => {
            console.log(data); // Log the response from the DELETE request
            setQuizes(prevSections => prevSections.filter(section => section.id !== quiz.id));
        })
        .catch(error => console.error('Error deleting section:', error));
}

export const createQuiz = (quizName, quizDescription, roomId, setQuizes) => {
    let quizId = crypto.randomUUID();

    fetch('https://localhost:7176/api/Quiz/Add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: quizId,
            roomId: roomId,
            name: quizName,
            description: quizDescription,
        }), // Convert JavaScript object to JSON string
    })
        .then(data => {
            let newQuiz = {
                id: quizId,
                roomId: roomId,
                name: quizName,
                description: quizDescription,
            }
            console.log(data);
            setQuizes(prevSections => [...prevSections, newQuiz]);

        })
        .catch(error => {
            console.error('Error posting section:', error);
            // Display an error message to the user interface
        });
}

export const addQuestion = (question) => {
    fetch('https://localhost:7176/api/Question/Add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: question.id,
            quizId: question.quizId,
            name: question.name,
            questionText: question.questionText,
            type: question.type
        }),
    })
        .then(
            console.log("question added")
        )
        .catch(error => {
            console.error('Error posting section:', error);
            // Display an error message to the user interface
        });
}

export const addAnswer = async (answer) => {
    await fetch('https://localhost:7176/api/Answer/Add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: answer.id,
            questionId: answer.questionId,
            answerText: answer.answerText,
            isCorrect: answer.isCorrect
        }),
    })
        .then(
            console.log("answer added")
        )
        .catch(error => {
            console.error('Error posting section:', error);
            // Display an error message to the user interface
        });
}

export const editQuiz = (quizId, quizName, quizDescription, setQuizes) => {

    fetch('https://localhost:7176/api/Quiz/UpdateById/' + quizId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: '00000000-0000-0000-0000-000000000000',
            roomId: 0,
            name: quizName,
            description: quizDescription,
        }), // Convert JavaScript object to JSON string
    })
        .then(data => {
            setQuizes(q => q.map(quiz => quiz.id == quizId ? {...quiz, name: quizName, description:quizDescription} : quiz ));

        })
        .catch(error => {
            console.error('Error posting section:', error);
            // Display an error message to the user interface
        });

}