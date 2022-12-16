import { useElements, useForm } from "../../../hooks";
import { Navbar } from "../../../UI/components";
import { Panel, PanelEditor, QuizModal } from "../../components";
import MetadataEditor from "../../components/MetadataEditor/MetadataEditor";
import { exportJsonFS } from "../../helpers";
import "./EditorPage.css";

export const EditorPage = () => {
  const initialElementsList = [];
  const initialQuizDataForm={ autor:"",titulo:"",organizacion:"", puntaje_total:"", xapi_domain:"",lrs:"",lrs_username:"",lrs_pass:"" }


  const {form,onFormUpdate,setForm}=useForm(initialQuizDataForm);

  const {
    elements,
    onAddChapter,
    onAddMulChoiseQuest,
    onAddShortTextQuest,
    onAddTFQuest,
    onUpdateElmenet,
    onRemoveElement,
    setElements
  } = useElements(initialElementsList);


  return (
    <>
      <Navbar title={"Authoring tool."} elements={elements} setElements={setElements} metadata={form} setMetadata={setForm} onFormUpdate={onFormUpdate}/>
      <main className="main">
        <aside className="side-bar mx-2 postition-fixed ">
          <PanelEditor onAddChapter={onAddChapter} />
        </aside>
        <section className="panel-section">
          <QuizModal
            onAddMulChoiseQuest={onAddMulChoiseQuest}
            onAddTFQuest={onAddTFQuest}
            onAddShortTextQuest={onAddShortTextQuest}
          />
        <MetadataEditor form={form} onFormUpdate={onFormUpdate}   />
        <hr />
          <Panel
            elements={elements}
            onUpdateElmenet={onUpdateElmenet}
            onRemoveElement={onRemoveElement}
          />
        </section>
      </main>
    </>
  );
};
