const evaluationBtn=document.getElementById("evaluation-button");
const resultsCard=document.getElementById("results-card");
 
const evaluate=(e)=>{
    e.preventDefault();
    setPointsPerQuestion();
    evaluationBtn.hidden=true;
}

evaluationBtn.addEventListener("click",evaluate,false);    

const showRegisteredScore=(registeredScore)=>{
  resultsCard.hidden=false;
  document.getElementById("final-score").innerHTML=`your registered scaled score was: ${registeredScore*100}%`
}

  const getQuestionType = (questionInputsArray) => {
    let response = "";
    questionInputsArray.forEach((input) => {
      if (input.classList.contains("multiple-choise-input")) {
        response = "multiple-choise-input";
      }
      if (input.classList.contains("true-false-input")) {
        response = "true-false-input";
      }
      if (input.classList.contains("short-text-input")) {
        response = "short-text-input";
      }
    });
    return response;
  };
  
  const evaluateQuestion = (questionType,questionInputsArray,responseExpected) => {
    switch (questionType) {
      case "multiple-choise-input":
        evaluateMCQuestion(questionInputsArray, responseExpected);
        break;
      case "true-false-input":
        evaluateTFQuestion(questionInputsArray, responseExpected);
        break;
      case "short-text-input":
        evaluateShortQuestion(questionInputsArray, responseExpected);
        break;
    }
  };
  
  const evaluateMCQuestion = (questionInputsArray, responseExpected) => {
    const {number ,correctAnswer, points } = responseExpected;
    const checketInputValues = getCheckedInputsValues(questionInputsArray);
    let correctMatch = true;
  
    if (correctAnswer.length !== checketInputValues.length) {correctMatch = false;}
    else {
      correctAnswer.forEach((answer) => {
        if (!checketInputValues.includes(answer)) { correctMatch = false;}
      });}
  
    if (correctMatch) {increaseTotalPoints(points);} 
    else {
      openBadResponseCard(number);
      increaseIncorrectResponses();}
  
  };
  
  const evaluateTFQuestion = (questionInputsArray, responseExpected) => {
    const {number,correctAnswer, points } = responseExpected;
    const checkedInput =getCheckedInputs(questionInputsArray);
    const currentResponse = checkedInput[0].value;
  
    if (correctAnswer[0]===currentResponse){increaseTotalPoints(points);} 
    else {
      openBadResponseCard(number);
      increaseIncorrectResponses();}
  };
  
  const evaluateShortQuestion = (questionInputsArray, responseExpected) => {
    const {number,correctAnswer, points } = responseExpected;
    const currentResponse = questionInputsArray[0].value;
  
    if (correctAnswer.includes(currentResponse)) {increaseTotalPoints(points);} 
    else {
      openBadResponseCard(number);
      increaseIncorrectResponses();}
  
  };
  
  const increaseTotalPoints = (points) => {totalScore += points;};
  
  const increaseIncorrectResponses = () => {incorrectResponses++;};
  
  const increaseAttemps = () => {totalAttemps++;};
  
  const htmlCollectionToArray = (questionInputs) => {return Array.prototype.slice.call(questionInputs);};
  
  const getCheckedInputs=(questionInputsArray)=>{return questionInputsArray.filter((input) => input.checked === true);}
  
  const getCheckedInputsValues=(questionInputsArray)=>{
      const checkedInputObjects = getCheckedInputs(questionInputsArray);
      return checkedInputObjects.map((input) => input.value);
  }
  
  const openBadResponseCard=(number)=>{
    const badResponseCard=document.getElementById("bad-response-question-"+number);
    badResponseCard.hidden=false;
  }

  const disableEvaluationBtn=()=>{
    const evaluationBtn=document.getElementById("evaluation-button");
      evaluationBtn.hidden=true;
  }

  //del div
  const registerClick=(questionDescription)=>{
    const questionStatement=getQuestionStatementByDescription(questionDescription);
    registerClickInteractionStatement(questionStatement);
  }

  const finishQuiz=()=>{
    const scaledPoints= totalScore/maxScore;
    showRegisteredScore(scaledPoints);
    if(totalScore<minimalNoteToAprove){
        registerEndQuizStatement(scaledPoints,false,true);
    }
    else{
        registerEndQuizStatement(scaledPoints,true,true);
    }
    disableEvaluationBtn();
  }
  
  const setPointsPerQuestion = () => {
    increaseAttemps();
  
    questionsResponseExpected.forEach((responseExpected) => {
      const questionInputs = document.getElementsByClassName(`question-${responseExpected.number}`);
      const questionInputsArray = htmlCollectionToArray(questionInputs);
      const questionType = getQuestionType(questionInputsArray);
  
      evaluateQuestion(questionType, questionInputsArray, responseExpected);
    });
  
    finishQuiz();

  };
  
  


