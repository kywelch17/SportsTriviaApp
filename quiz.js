const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("btn btn-lg btn-outline-primary"));
const questionNumber = document.getElementById("q-num");
const scoreNumber = document.getElementById("score-num");

//let currentQuestion = {};
let askingQuestion = {};
let acceptingAnswers = false;
//let score = 0;
let scoreCounter = 0;
let questionCounter = 0;
//let availableQuestions = [];
let questionsLeft = [];

let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript??",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
    }
];

//CONSTANTS
const MAX_QUESTIONS = 3;
const POINTS = 1;

startGame = () => {
    questionCounter = 0;
    scoreCounter = 0;
    questionsLeft = [...questions];
    console.log(questionsLeft);
    getNewQuestion();
};

getNewQuestion = () => {
    if (questionsLeft.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * questionsLeft.length);
    askingQuestion = questionsLeft[questionIndex];
    question.innerText = askingQuestion.question;

    questionNumber.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = askingQuestion["choice" + number];
    });

    questionsLeft.splice(questionIndex, 1);
    console.log(questionsLeft);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        console.log(selectedAnswer);

        const coic =
            selectedAnswer == askingQuestion.answer ? "correct" : "incorrect";

        selectedChoice.parentElement.classList.add(coic);

        if(coic === "correct")
            addScore(POINTS);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(coic);
            getNewQuestion();
        }, 900);
    });
});

addScore = n => {
    scoreCounter = scoreCounter + n;
    scoreNumber.innerText = scoreCounter;
};

startGame();

