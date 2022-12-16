import { exportJsonFS } from "../../../AuthoringTool/helpers/exportJsonFS/exportJsonFS";
import "./Dropdown.css";
export const Dropdown = ({title,elements,setElements,metadata,setMetadata}) => {

  const importJsonFS= (e)=>{
    let content="";
    const file=e.target.files[0];
    const fileReader=new FileReader();
    if(!file){return;}
    fileReader.readAsText(file);

    fileReader.onload=()=>{
        content=JSON.parse(fileReader.result);
        setMetadata(content.quizData);
        setElements(content.elements);
      }

    fileReader.onerror=()=>{console.error("something´s wrong");}
}


const quizData= {quizData:metadata ,elements:elements}

  return (
    <div className="dropdown">
      <span>Import/Export</span>
      <div className="dropdown-content">
          <button className="btn btn-light" onClick={()=>{exportJsonFS(quizData)}}>export JSON in FS</button>
          <input type="file"   multiple={ false } onChange={(e)=>{importJsonFS(e)}}/>
          <button className="btn btn-light"  onClick={()=>{exportJsonFS(elements)}} disabled>export JSON in IPFS</button>
          <button className="btn btn-light" onClick={()=>{exportJsonFS(elements)}} disabled>import JSON in IPFS</button>
      </div>
    </div>
  );
};

