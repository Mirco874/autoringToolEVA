import { useState } from "react";
import { useCounter } from "../../../hooks";

export const TFQuestion = ({ body,onUpdateElmenet,onRemoveElement }) => {
    const [questionBody, setQuestionBody] = useState(body);
    const {index,question, answer,reference,points,failedMessage } = questionBody;
 

    const onQuestionChange = ({ target }) => {
      console.log(target.type)
        const { name, value,checked,type } = target;

        if(type!=="checkbox"){
          setQuestionBody({
            ...questionBody,
              [name]: value,
          });
        }
        else{
          setQuestionBody({
            ...questionBody,
              answer: checked,
          }); 
        }

      };



  return (
    <div className="card">
      <div className="card-header">
        <label className="me-2">Question: </label>
        <input
          type={"text"}
          placeholder="Insert question"
          onChange={(e) => onQuestionChange(e)}
          name="question"
          value={question}
        ></input>
      </div>
      <div className="card-body mx-auto">
        <input type="checkbox" name= {`${index}-TFanswer`} checked={answer} onChange={(e)=>{onQuestionChange(e)}} /><label >True</label> 
        <br />
        <br />

        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">reference(optional):</span>
          </div>
          <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={reference} name={`reference`} onChange={(e) => onQuestionChange(e)}/>
        </div>

        
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">points:</span>
          </div>
          <input type="number" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={points}  name="points" onChange={(e) => onQuestionChange(e)}/>
        </div>

        
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">failed message:</span>
          </div>
          <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={failedMessage} name="failedMessage" onChange={(e) => onQuestionChange(e)}/>
        </div>  


        <br />
        <button className="btn btn-primary" onClick={()=>{onUpdateElmenet(questionBody)}}>save</button>
        <button className="btn btn-danger ms-2" onClick={()=>{onRemoveElement(index)}}>remove</button>
      </div>
    </div>
  )
}
