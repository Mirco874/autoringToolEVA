import { MultipleChoiseQuestion,TFQuestion,ShortAnswerQuestion } from "../"

export const Question = ({content,onUpdateElmenet,onRemoveElement}) => {
    switch(content.question_type) {
        case "multiple": return <MultipleChoiseQuestion body={content} onUpdateElmenet={onUpdateElmenet} onRemoveElement={onRemoveElement}/>;
        case "tf":   return <TFQuestion body={content} onUpdateElmenet={onUpdateElmenet} onRemoveElement={onRemoveElement}/>;
        case "word": return <ShortAnswerQuestion body={content} onUpdateElmenet={onUpdateElmenet} onRemoveElement={onRemoveElement}/>;
        default: return <div>question type not found</div>
      }
}
