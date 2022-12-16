import { get, getBlobFile, post } from "./fetch";

const createText=(textId,htmlContent)=>{
    return `<div id=text-${textId}>${htmlContent}</div>`;}

const createBadResponseCard=(id,message)=>{
    return `
    <div class="card border-danger" id="bad-response-question-${id}" style="max-width: 100vh;" hidden>
        <div class="card-body text-danger">
        <h6 class="card-title">Respueta incorrecta</h6>
        <p class="card-text">${message}</p>
        </div>
    </div>
    `;
}


const createMCOption=(questionId,value,optionIndex)=>{
    return `<div class="form-check">
                <input  class="check-input form-check-input question-${questionId} multiple-choise-input" 
                        type="checkbox" 
                        value="${value}" 
                        id="flexCheckChecked${optionIndex}" >
                <label class="form-check-label" for="flexCheckChecked${optionIndex}}">${value}</label>
            </div>
            `;
}

const createMCQuestion=(index,question,optionsList)=>{
    let optionsHtml=``;
    optionsList.forEach(option => {
        optionsHtml+=createMCOption(index,option.content,option.index);
    });

    return `<div class="card shadow-none p-3 rounded" onclick="registerClickInteractionStatement('${question}')">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Pregunta ${index}.</h6>
                    <h5 class="card-title">${question}</h5>

                    <div class="form-group multiple-choise-question" id="${index}">
                        ${optionsHtml}
                    </div>

                </div>
            </div>
            `;
}

const createTFQuestion=(index,question)=>{
    const name=question.replace(/ /g, "");

    return `<div class="card shadow-none p-3 rounded" onclick="registerClickInteractionStatement('${question}')">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Pregunta ${index}.</h6>
                    <h5 class="card-title">${question}</h5>
                    <div class=" form-group d-flex flex-row true-false-question" id="${index}">

                        <div class="form-check">
                            <input class="form-check-input question-${index} true-false-input" type="radio" name="flexRadio${name}" id="flexRadio${name}1" value="true" >
                            <label class="form-check-label" for="flexRadio${name}1">True</label>
                        </div>

                        <div class="form-check mx-3">
                            <input class="form-check-input question-${index} true-false-input" type="radio" name="flexRadio${name}" id="flexRadio${name}2" value="false" >
                            <label class="form-check-label" for="flexRadio${name}2">False</label>
                        </div>

                    </div>
                </div>
            </div>`;
}

const createSAQuestion=(index,question)=>{
    return `<div class="card shadow-none p-3 rounded question" onclick="registerClickInteractionStatement('${question}')">
                <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">Pregunta ${index}.</h6>
                <h5 class="card-title">${question}</h5>
            
                <div class="input-group short-response-question" id="${index}">
                    <div class="input-group-prepend ">
                    <span class="input-group-text">Tú respuesta:</span>
                    </div>
                    <input type="text" class="form-control question-${index} short-text-input" id="answer-input">
                </div>

                </div>
            </div>`;
}

const generateInteractiveContent=(content)=>{
    let htmlForm=``;
    content.forEach((item)=>{
        console.log(item)
    const {type}=item;  

        if(type==="text"){
            const {index,htmlContent}=item;
            htmlForm+=createText(index,htmlContent);
            }

        if(type==="question"){
            const {index,question_type,question,failedMessage}=item;
            if(question_type==="multiple"){
                htmlForm+=createMCQuestion(index,question,item.options);
    
            }
            if(question_type==="tf"){
                htmlForm+=createTFQuestion(index,question);

            }
            if(question_type==="word"){
                htmlForm+=createSAQuestion(index,question);
            }
            htmlForm+=createBadResponseCard(index,failedMessage);
        }
    })
    return htmlForm;
}
///////////////revisado//////////////////
const createMCQuestionStatement=(question,optionsList)=>{
    const questionId= question.replace(/\s+/g, '');
    let correctAnswers=`["`
    let correctResponsesList=optionsList.filter((item)=>item.state===true);
    console.log(correctResponsesList);

    for (var i = 0; i < correctResponsesList.length; i++) {
        if(correctResponsesList[i].state===true){
            console.log(i,)
            if(i==correctResponsesList.length-1){correctAnswers+=`${correctResponsesList[i].content} "]`;}
            else{correctAnswers+=`${correctResponsesList[i].content}[,]`;}
        }
      }
    
    let choices=`[`;
    optionsList.forEach(option => {choices+=`{id:"${option.content}"},`});
    choices+=`]`;

    return `{
        id:"http://www.EVA12022.com/question${questionId}Activity",
        definition: {
            description: {es: "${question}"},
            type: "http://adlnet.gov/expapi/activities/quizInteraction",
            interactionType: "choice",
            correctResponsesPattern: ${correctAnswers},
            choices: ${choices}
        }
},`;
}

const createTFQuestionStatement=(question,answer)=>{
    const questionId= question.replace(/\s+/g, '')
    return `{
            id:"http://www.EVA12022.com/question${questionId}Activity",
            definition: {
                description: {es: "${question}"},
                type: "http://adlnet.gov/expapi/activities/quizInteraction",
                interactionType: "true-false",
                correctResponsesPattern: ["${answer}"]
                }
            },
    `;
}

const createSAQuestionStatement=(question,answer)=>{
    const questionId= question.replace(/\s+/g, '')
    return `{
        id:"http://www.EVA12022.com/question${questionId}Activity",
        definition: {
            description: {es: "${question}"},
            type: "http://adlnet.gov/expapi/activities/quizInteraction",
            interactionType: "fill-in",
            correctResponsesPattern: ["${answer}"]
            }
    },`;
}

const generateXAPIScript=(content)=>{
    let htmlForm=``;
    content.forEach((item)=>{
    const {type}=item;  
        if(type==="question"){
            const {question_type,question,answer}=item;
            if(question_type==="multiple")
                {console.log(item)
                    htmlForm+=createMCQuestionStatement(question,item.options);}
            if(question_type==="tf")
                {htmlForm+=createTFQuestionStatement(question,answer);}
            if(question_type==="word")
                {htmlForm+=createSAQuestionStatement(question,answer);}
        }
    })
    return htmlForm;
}

////revisado//////////////////////
const getCorrectAnswer=(answerList)=>{
    let response=``;
    for (var i = 0; i < answerList.length; i++) {
        console.log(answerList[i])
        if(answerList[i].state===true){
            response+=`"${answerList[i].content}"`;
            if(i<answerList.length-1){
                response+=`,`;
            }
        }
      }
      return response;
}


const generateScript=(quizData,content)=>{
    const {puntaje_total}=quizData;
    let questionsResponseExpected=``;
    let totalQuestions=0;
    const pointsPerQuestion=100/content.length;
    const minimalNote=(parseInt(puntaje_total)/2)+1;
    content.forEach((item)=>{
        const {type}=item;
        if(type==="question")
        {
            totalQuestions++;
            const {index,question_type,answer,points,failedMessage}=item;
            if(question_type==="multiple"){
                questionsResponseExpected+=`{ 
                                            number:${index},
                                            correctAnswer:[${getCorrectAnswer(item.options)}],
                                            points:${parseInt(points)},
                                            failedMessage:"${failedMessage.toString()}"
                                            },`;
            }
            else{
                questionsResponseExpected+=`{ 
                                            number:${index},
                                            correctAnswer:["${answer}"],
                                            points:${parseInt(points)},
                                            failedMessage:"${failedMessage.toString()}"
                                            },`;
                }
        }

    })
    
    return `
    let totalScore=0;
    let totalAttemps=0;
    let incorrectResponses=0;
    const minScore=0;
    const maxScore=${puntaje_total};
    const minimalNoteToAprove=${minimalNote};
    const questionsResponseExpected=[${questionsResponseExpected}];`;
}

const generateHtml=(quizData,content)=>{
    const {autor,titulo, puntaje_total,xapi_domain,lrs,lrs_username,lrs_pass}=quizData;
    let htmlInteractiveContent=generateInteractiveContent(content); // preguntas interactivas
    let script=generateScript(quizData,content); // generar valores iniciales
    let xapiScript=generateXAPIScript(content);  // generar los statements iniciales

    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
            <link rel="stylesheet" href="./styles/form-styles.css">
            <title>${titulo}</title>
        </head>
        <body>
            <main class="mx-auto">
            <div style="margin-left:50vh;" >
                    <h1  >${titulo}</h1>
                    <br/>
                    <b class="mx-auto">Author:</b> ${autor}
                    <br/>
                    <br/>
                    <b class="mx-auto">Max points:</b> ${puntaje_total}
                    <br/>
                    </div>

                <div id="user-form">
                    <form style="width: 75vh;" class="mx-auto" > 
                        <h3>Ingresa tus datos personales</h3>
                        <div class="mb-3 d-flex flex-row" >
                        <input type="text" class="form-control w-50" id="email" placeholder="Correo electrónico">
                        <input type="text" class="form-control w-50 ms-3" id="userName" placeholder="Nombre completo" >
                        <button class="ms-3 btn btn-primary" id="register-user-btn"> Aceptar</button>
                        </div>
                    </form>
                </div>
            <!--  -->
                <div id="quiz-content" class="mx-auto" hidden>
                ${htmlInteractiveContent}
                
                <div id="evaluation-button"><button class="ms-3 btn btn-primary d-block mx-auto" >Enviar</button></div>
        
        
              <div class="card border-success mb-3" style="max-width: 18rem;" id="results-card" hidden>
                <div class="card-header">Results</div>
                <div class="card-body text-success">
                    <p class="card-text" id="final-score"></p>
                </div>
              </div>

            <!--  -->

            </main>
            <script>
            const domain="${xapi_domain}";
            const endpoint="${lrs}";
            const LRSuserName="${lrs_username}";
            const LRSPassword="${lrs_pass}";
            </script>
            <script src="./scripts/tincan-min.js"></script>
            <script src="./scripts/xApiInteractions.js"></script>
            <script src="./scripts/main.js"></script>
            <script>
                const registrarUsuario=(e)=>{
                    e.preventDefault()
                    setUserName(document.getElementById("userName").value);
                    setEmail(document.getElementById("email").value);
                    document.getElementById("user-form").hidden=true; 
                    document.getElementById("quiz-content").hidden=false;
                }
                const btn=document.getElementById("register-user-btn")
                btn.addEventListener("click",registrarUsuario,false)
            </script>
            <script>
                ${script}
            </script>
            <script>
            let cuestionActivitiesArray=[
                ${xapiScript}
            ]
            </script>
        </body>
</html>`;
}

const createHtmlFile=(htmlContent)=>{
    const url="http://localhost:3001/editor";
    const jsonBody={
        standar:"xapi",
        type:"main",
        content:htmlContent
    }
    console.log(jsonBody)
    post(url,jsonBody)
}


const downloadXAPIZip=()=>{
    const url="http://localhost:3001/generate-xapi"; 
    const currentDate = (new Date()).toLocaleString();
    const fileName=`xapi_${currentDate}`;
    getBlobFile(url,fileName)
}

export const generateXAPI=(quizData,elements)=>{
    const htmlContent=generateHtml(quizData,elements);
    console.log(htmlContent)
    createHtmlFile(htmlContent);
    downloadXAPIZip();
} 




