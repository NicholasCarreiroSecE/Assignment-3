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

function fakeAuth() {
    const username = prompt("Enter username:"); // prompt for username
    const password = prompt("Enter password:"); // prompt for password

    if (username === "user" && password === "password") {
        startQuiz(); // start the quiz if credentials are correct
    } else {
        alert("Incorrect username or password. Please try again."); // shows error message
        fakeAuth(); // retry authentication
    }
}

function startQuiz() {
    currentQuestionIndex = 0; // resets question index and score to 0 on starting quiz
    score = 0;
    nextButton.innerHTML = "Next"; // allows quiz to be restarted or replayed after quiz is finished
    showQuestion();
}

function showQuestion() {
    resetState();
    updateQuestionCounter(); // updates the question counter
    let currentQuestion = questions[currentQuestionIndex]; // gets the current question based on the current question index
    let questionNo = currentQuestionIndex + 1; // increments the question number by 1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button"); // creates a button for each answer
        button.innerHTML = answer.text;  // displays the answer text on the button
        button.classList.add("btn"); // adds the btn class to the button
        answerButtons.appendChild(button); // appends the button to the answer buttons
        if (answer.correct) {
            button.dataset.correct = answer.correct; // if the answer is correct, the button is marked as correct
        }
        button.addEventListener("click", selectAnswer); // adds event listener to the button and calls the selectAnswer function
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
        score++; // increments the score by one for correct answers
    } else {
        selectedBtn.classList.add("incorrect"); // if the button is incorrect, the button is marked as wrong
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct"); // if the button is correct, the button is marked as correct
        }
        button.disabled = true; // disables the button after it is clicked
    });
    nextButton.style.display = "block"; // displays the next button
}

function showScore() {
    resetState();
    questionElement.innerHTML = "You scored " + score + " correct out of " + questions.length + " questions."; // displays the score
    nextButton.innerHTML = "Try Again"; // allows quiz to be restarted or replayed after quiz is finished
    nextButton.style.display = "block"; // displays the next button
}

function handleNextButton() { // Displays next button and increments the current question index after answering each question
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => { // adds event listener to next button and calls the handleNextButton function
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


const questionCounter = document.getElementById("question-counter"); // gets the question counter element

function updateQuestionCounter() {
    questionCounter.innerHTML = `Question ${currentQuestionIndex + 1} of ${questions.length}`; // updates the question counter
}

fakeAuth();

