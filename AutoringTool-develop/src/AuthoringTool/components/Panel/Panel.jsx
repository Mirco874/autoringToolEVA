import { ChapterEditor } from "../ChapterEditor/ChapterEditor";
import { Question } from "../Question/Question";

export const Panel = ({ elements,onUpdateElmenet,onRemoveElement }) => {
  return (
    <>
      {elements.map((element) => (
        <div key={element.index}>
          {element.type === "text"? <ChapterEditor content={element} onUpdateElmenet={onUpdateElmenet} onRemoveElement={onRemoveElement} /> : <Question content={element} onUpdateElmenet={onUpdateElmenet} onRemoveElement={onRemoveElement}/>}
          <br />
        </div>
      ))}
    </>
  );
};
