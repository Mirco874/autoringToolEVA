//const TinCan = require("./tincan");
//const UserData=require("./userData");
let lrs;
///toDo
// const domain="http://EVA12022.com";
// const endpoint="https://cloud.scorm.com/lrs/ESSS8PGA5M/";
// const LRSuserName="ESSS8PGA5M";
// const LRSPassword="iLJq7AazKGWwGYPT1QGjbTrmg2G7pUOstntjd9gd";
let userName="";
let email="";

const setUserName=(newUserName)=>{userName=newUserName;}
const setEmail=(newEmail)=>{email=newEmail;}

const getActorStatement=()=>{
  return {  
    objectType: "Agent",
    name:userName,
    mbox:`mailto:${email}`
  }
}

//
const endQuizActivity={
  id:"http://adlnet.gov/expapi/verbs/ended",
  display:{"es":"finalizado"}
}

const clickVerb={
    id:`${domain}/xapi/verbs#click`, 
    display:{"es" : "clickeo una opcion"} 
}

const getQuizActivity=()=>{
  return {
    id: `${domain}/quiz`,
    definition: {
        name: {
            "es": `actividad cuestionario`
        },
        description: {
            "es": `cuestionario creado para el dominio ${domain}`
        },
        type: `${domain}/types/quizActivity`
    },
    objectType: "Activity"}
}

const connect = () => {
  try {
    lrs = new TinCan.LRS({
      endpoint: endpoint,
      username: LRSuserName,
      password: LRSPassword,
      allowFail: false,
    });
    console.log("conection successfully!!!")
  } 
  catch (ex) {console.log("Failed to setup LRS object: ", ex);}
};

const uploadStatement=(statement)=>{
  console.log(statement)
  lrs.saveStatement(
    statement,
    {
        callback: function (err, xhr) {
            if (err !== null) {
                if (xhr !== null) {
                    console.log("Failed to save statement: " + xhr.responseText + " (" + xhr.status + ")");
                    return;
                }
                console.log("Failed to save statement: " + err);
                return;
            }
            console.log("Statement saved");
        }
    }
  );
}


const registerClickInteractionStatement=(description)=>{

  const questionInteractionStatement=cuestionActivitiesArray.find((item)=>item.definition.description.es===description);
    console.log(questionInteractionStatement);
  let statement = new TinCan.Statement(
    {
        actor: getActorStatement(),
        verb: clickVerb,
        target: questionInteractionStatement
    });

    console.log("register click interaction statement")
    console.log(statement)
    console.log("+++++++++++++++++")
uploadStatement(statement);
}

const registerEndQuizStatement=(scaledPoints,success,completion)=>{
  const statement=new TinCan.Statement({
    actor:getActorStatement(),
    verb:endQuizActivity,
    target: getQuizActivity(),
    result:{
      score:{
        scaled:scaledPoints
      },
      success:success,
      completion:completion
    }
  })
  console.log("register End Quiz Statement")
  console.log(statement)
  console.log("+++++++++++++++++")
  uploadStatement(statement);
}

connect();
//////
