const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const questionLimit = quiz.length;//20;

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

function setAvailableQuestions(){
    const totalQuestions = quiz.length;
    for(let i=0; i<totalQuestions; i++){
        availableQuestions.push(quiz[i])
    }
}
// dk===============================
let currentQuestionIndex = 0;
let skippedQuestions = [];
let answeredQuestions = [];
let score = 0;

// Load the current question
function loadQuestion() {
    const question = quiz[currentQuestionIndex];
    document.querySelector(".question-number").textContent = `Question ${currentQuestionIndex + 1} of ${quiz.length}`;
    document.querySelector(".question-text").textContent = question.q;
    const optionContainer = document.querySelector(".option-container");
    optionContainer.innerHTML = ""; // Clear previous options

    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.onclick = () => selectAnswer(index);
        optionContainer.appendChild(button);
    });
}

// Handle Skip button
function skipQuestion() {
    // if (!skippedQuestions.includes(currentQuestionIndex)) {
    //     skippedQuestions.push(currentQuestionIndex);
    // }
    // if(questionCounter === questionLimit){
    //     quizOver();
    // }else{
    //     getNewQuestion()
    // }
    // moveToNextQuestion();
    if (!skippedQuestions.includes(currentQuestionIndex)) {
        skippedQuestions.push(currentQuestionIndex);
    }
    next();
}

// Handle Save and Next button
function saveAndNext() {
    answeredQuestions.push(currentQuestionIndex);
    moveToNextQuestion();
}

// Move to the next question or handle skipped questions
function moveToNextQuestion() {
    if (currentQuestionIndex < quiz.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else if (skippedQuestions.length > 0) {
        currentQuestionIndex = skippedQuestions.shift(); // Revisit the first skipped question
        loadQuestion();
    } else {
        quizOver();
    }
}
// =======================================dk 

//dk=============================================
// Select an answer and check correctness
function selectAnswer(selectedIndex) {
    const correctAnswer = quiz[currentQuestionIndex].answer;
    if (selectedIndex === correctAnswer) {
        score++;
    }
    saveAndNext();
} 
let user = {
    name: "",
    rollNumber: "",
};

// Login function
function login() {
    const name = document.getElementById("name").value.trim();
    const rollNumber = document.getElementById("rollNumber").value.trim();

    if (name === "" || rollNumber === "") {
        alert("Please enter both Name and Roll Number.");
        return;
    }

    user.name = name;
    user.rollNumber = rollNumber;

    document.querySelector(".login-box").classList.add("hide");
    document.querySelector(".home-box").classList.remove("hide");

    document.getElementById("display-name").textContent = user.name;
    document.getElementById("display-roll-number").textContent = user.rollNumber;
}

// Start Quiz function
function startQuiz() {
    document.querySelector(".home-box").classList.add("hide");
    document.querySelector(".quiz-box").classList.remove("hide");
    // Call your quiz initialization logic here
}

// Other functions like next(), quizOver(), tryAgain(), goToHome(), etc. remain unchanged

// dk========================================
function getNewQuestion(){
    questionNumber.innerHTML = "Question " + (questionCounter+1) + " of " + questionLimit;
    const questionIndex = availableQuestions[Math.floor(Math.random()*availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    const index1 = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1,1);
    if(currentQuestion.hasOwnProperty("img")){
        const img = document.createElement("img");
        img.src = currentQuestion.img;
        questionText.appendChild(img);
    }
    const optionsLength = currentQuestion.options.length;
    for(let i=0; i<optionsLength; i++){
        availableOptions.push(i);
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.2;
    for(let i=0; i<optionsLength; i++){
        const optionIndex = availableOptions[Math.floor(Math.random()*availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay+'s';
        animationDelay = animationDelay+0.15;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)");
    }
    questionCounter++;
}

function getResult(element){
    const id = parseInt(element.id);
    if(id === currentQuestion.answer){
        element.classList.add("correct");
        updateAnswerIndicator("correct");
        correctAnswers++;
    }
    else{
        element.classList.add("wrong");
        updateAnswerIndicator("wrong");
        const optionLength = optionContainer.children.length;
        for(let i=0; i<optionLength; i++){
            if(parseInt(optionContainer.children[i].id)===currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOptions();
}

function unclickableOptions(){
    const optionLength = optionContainer.children.length;
    for(let i=0; i<optionLength; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function next(){
    if(questionCounter === questionLimit){
        quizOver();
    }else{
        getNewQuestion()
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = questionLimit;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);

    }
}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
}

function quizOver(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = questionLimit;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/questionLimit)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + questionLimit;
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
    availableQuestions = [];
}

function tryAgain(){
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToHome(){
    // resultBox.classList.add("hide");
    // homeBox.classList.remove("hide");
    // resetQuiz();
    window.location.href = "../index.html"
}

function startQuiz(){
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvailableQuestions();
    getNewQuestion();
    answersIndicator();
}

window.onload = function (){
    homeBox.querySelector(".total-question").innerHTML = ""+questionLimit;
}