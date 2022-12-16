import { useRef } from "react";
import {Editor} from "@tinymce/tinymce-react";
import "./ChapterEditor.css"
import { useState } from "react";
export const ChapterEditor = ({content,onUpdateElmenet,onRemoveElement}) => {
  const {index,htmlContent}=content;
  const editorRef=useRef();
  const [text,setText]=useState(htmlContent)

  const saveEditorContent=()=>{
    content={...content,htmlContent:editorRef.current.getContent()}
    onUpdateElmenet(content);
  }

  return (
    <div className="editor-container">
        <h5>{`reference: text-${content.index}`}</h5>
        <Editor onInit={(e,editor)=>{editorRef.current=editor}} onEditorChange={(e)=>{
         setText(e)}} value={text}/>
        <button className="btn btn-primary" onClick={()=>{saveEditorContent()}}>save</button>
        <button className="btn btn-danger ms-2" onClick={()=>{onRemoveElement(index)}}>remove</button>
    </div>
  )
}
