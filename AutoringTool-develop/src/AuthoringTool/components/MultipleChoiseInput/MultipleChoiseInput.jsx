export const MultipleChoiseInput = ({index,content,state,onInputChange,onCheckChange}) => {
  return (
    <>
      <td>
        <input
          className="me-3"
          type={"text"}
          placeholder="Insert option"
          onChange={(e)=>onInputChange(e,index)}
          value={content}
        />
      </td>
      <td>
        <input
          type="checkbox"
          name={`${index}-MCQuestion`}
          checked={state}
          onChange={(e)=>onCheckChange(e,index)}
        />
      </td>
    </>
  );
};
