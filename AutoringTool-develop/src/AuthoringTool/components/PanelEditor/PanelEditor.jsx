import "./PanelEditor.css";
export const PanelEditor = ({ onAddChapter }) => {
  return (
    <>

      <h3 className="aside-title">Select element:</h3>
      <hr />

      <div id="add-quiz-option mx-auto d-block" className="">
        <button
          className="btn btn-primary mx-auto d-block"
          onClick={() => {
            onAddChapter("a");
          }}
        >
          add text editor
        </button>
      </div>
      <br />
      <div id="add-quiz-option mx-auto d-block" className="">
        <button
          className="btn btn-primary mx-auto d-block"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          add question
        </button>
      </div>

    </>

  );
};
