//select our DOM Elements
//we have bunch of different selectors
const startScreen =document.getElementById("start-screen")
const quizScreen = document.getElementById("quiz-screen")
const resultScreen =document.getElementById("result-screen")
const startButton = document.getElementById("start-btn")
const questionText =document.getElementById("question-text")
const answersContainer = document.getElementById("answers-container")
const currentQuestionSpan =document.getElementById("current-question")
const totalQuestionsSpan = document.getElementById("total-questions")
const scoreSpan =document.getElementById("score")
const finalScoreSpan = document.getElementById("final-score")
const maxScoreSpan =document.getElementById("max-score")
const resultMessage = document.getElementById("result-message")
const restartButton =document.getElementById("restart-btn")
const progressBar = document.getElementById("progress")

//we are going to create an array of quiz questions
//5 different objects in it they all hae same field in it they have a question 
// and then a list of answers
//and each answer has a text a as well as if its correct answer or not
// Quiz questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

//get started with variables
//QUIZ STATE VARS
//We will have three diffrent variables
let currentQuestionIndex =0;
let score =0;
let answersDisabled = false;//its because lets say u click to the answer and you immediately clicked to it again.you dont really want the score to be incremeneted,when u first click it it will be disabled until u get the next question , until you dont click it u dont have to see the answer

//Now update our total questions and counter 
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners

startButton.addEventListener("click",startQuiz);
restartButton.addEventListener("click",restartQuiz);

function startQuiz(){
   //reset vars
   currentQuestionIndex = 0;
   score=0;
   scoreSpan.textContent = 0;

   startScreen.classList.remove("active");
   quizScreen.classList.add("active");

   showQuestion()
}

function showQuestion(){
  //reset state
  answersDisabled =false;
  const currentQuestion = quizQuestions[currentQuestionIndex]

  currentQuestionSpan.textContent = currentQuestionIndex +1;//now we can update the question no. as currentindex will start from 0 wewould like to say something like 1 
  
  const progressPercent = (currentQuestionIndex/ quizQuestions.length)*100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  //Now we can clear the previous answer buttons

  answersContainer.innerHTML ="";//if this was not written we got the new answers but  the previous answers are still there

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn"); 

    //We need to add the correct property on the button when we click it how do our code know its the correct answer
    // what is dataset? basically its a property of the button element that allows you to store custom data,we are adding the true field to the button ,u can use this on anything , not only on the button
    button.dataset.correct  = answer.correct; //button.dataset.correct  here instead of .correct u can write anything .bbskxbkabs etc but it should be correct so that our code makes sense.

    //now to add click button in answer itself
    button.addEventListener("click",selectAnswer);

    // finally add two container
    answersContainer.appendChild(button);
  });
}

function selectAnswer(event){//Now when u attach eventlistener by default it will get an argument called event,so that with event we can do bunch of different things
  //optimization check
  if(answersDisabled) return

  answersDisabled =true;

  const selectedButton = event.target; //How do we know this is the button i clicked , this is how we can do
  const isCorrect = selectedButton.dataset.correct ==="true" //when this hitthis will be a boolean , so like in above scenario i wrote .correct thatswhy i used  correct here

  //so we like to add a class that would update feedback
  Array.from(answersContainer.children).forEach((button) =>{
    if(button.dataset.correct ==="true"){
      button.classList.add("correct");
    }else if (button === selectedButton){//condition because if we click the wrong answer only that wrong ans will change to red
      button.classList.add("incorrect");
    }
  });
  //so we update the score if its correct
  if(isCorrect){
    score++;
    scoreSpan.textContent = score;
  }
  //if u want to add some delays , you would use setTimeout method which would take a call back as well as the timeout which is going to be in milliseconds
  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if(currentQuestionIndex < quizQuestions.length){
      showQuestion();
    }else{
      showResults();
    }
  },1000);
}

function showResults(){
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent =score;

  const percentage =(score/quizQuestions.length)*100;

  if(percentage === 100){
    resultMessage.textContent = "Perfect! Genius";
  }else if(percentage >= 80){
    resultMessage.textContent = "Great job!!";
  }else if ( percentage >= 60){
    resultMessage.textContent = "Good effort!!!";
  }else if (percentage >=40){
    resultMessage.textContent ="Not Bad!!!!";
  }else{
    resultMessage.textContent = "Keep Studying!!!!!";
  }
}

function restartQuiz(){
   resultScreen.classList.remove("active");

   startQuiz();
}
