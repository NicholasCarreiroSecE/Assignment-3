const questions = [
    {
        question: "What is the largest desert in the world?",
        answers: [
            {text: "Sahara Desert", correct: false},
            {text: "Gobi Desert", correct: false},
            {text: "Arabian Desert", correct: false},
            {text: "Antarctic Desert", correct: true},
        ]   
    },
    {
        question: "Which is the longest river in the world?",
        answers: [
            {text: "Amazon River", correct: false},
            {text: "Nile River", correct: true},
            {text: "Yangtze River", correct: false},
            {text: "Mississippi River", correct: false},
        ]   
    },
    {
        question: "Mount Everest is located in which mountain range?",
        answers: [
            {text: "Andes", correct: false},
            {text: "Alps", correct: false},
            {text: "Himalayas", correct: true},
            {text: "Rockies", correct: false},
        ]   
    },
    {
        question: "What country is the smallest in the world by land mass?",
        answers: [
            {text: "Monaco", correct: false},
            {text: "Vatican City", correct: true},
            {text: "San Marino", correct: false},
            {text: "Lichenstein", correct: false},
        ]   
    },
    {
        question: "Which is the deepest ocean in the world?",
        answers: [
            {text: "Atlantic Ocean", correct: false},
            {text: "Indian Ocean", correct: false},
            {text: "Pacific Ocean", correct: true},
            {text: "Antarctic Ocean", correct: false},
        ]   
    },
    {
        question: "The Great Barrier Reef is located off of the coast of which country?",
        answers: [
            {text: "Australia", correct: true},
            {text: "Indonesia", correct: false},
            {text: "Philippines", correct: false},
            {text: "New Zealand", correct: false},
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0; // starts current question index and current score to 0 to begin the quiz
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0; // resets question index and score to 0 on starting quiz
    score = 0;
    nextButton.innerHTML = "Next"; // allows quiz to be restarted or replayed after quiz is finished
    showQuestion();
}

function showQuestion() {
    resetState(); // resets the state of the quiz
    let currentQuestion = questions[currentQuestionIndex]; // based on current question index, displays the current question
    let questionNo = currentQuestionIndex + 1; // if index is 0 question number is 1 if index is 1 question number is 2 and so on
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // recieves current question

    currentQuestion.answers.forEach(answer => {  
        const button = document.createElement("button"); // for each answer in the current question, creates a button for each answer
        button.innerHTML = answer.text; // displays the answer text on the button
        button.classList.add("btn"); // adds a class to the button
        answerButtons.appendChild(button); // appends the button to the answer button
        if(answer.correct) {  
            button.dataset.correct = answer.correct; // if the answer is correct, the button is marked as correct
        }
        button.addEventListener("click", selectAnswer); // when the button is clicked, the selectAnswer function is called
    });
}

function resetState() {
    nextButton.style.display = "none"; // hides the next button
    while(answerButtons.firstChild) { // while there are still answers in the answer button, removes the answers
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target; // selects the button that was clicked
    const isCorrect = selectedBtn.dataset.correct === "true"; // checks if the button is correct
    if(isCorrect) {
        selectedBtn.classList.add("correct"); // if the button is correct, the button is marked as correct
    } else {
        selectedBtn.classList.add("incorrect"); // if the button is incorrect, the button is marked as wrong
    }
}

startQuiz(); // starts the quiz