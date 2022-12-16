import { useState } from "react";

export const useElementsList = (initialList=[]) => {
    const [elements, setElements] = useState(initialList);
    const [lastIndex,setLastIndex]=useState(1);

    const incrementLastIndex=(amount)=>{
        setLastIndex(lastIndex+amount);
    }

    const onAddElement=(element)=>{
        const newElement={...element,index:lastIndex};
        setElements([...elements,newElement]);
        incrementLastIndex(1);
    }

    const onUpdateElmenet=(updatedElement)=>{
        const {index}=updatedElement;
        const filteredElements=elements.filter((element)=>index!=element.index)
        
        const concatedList=[...filteredElements,updatedElement];
        sortElementsByIndex(concatedList);
    }

    const onRemoveElement=(index)=>{
        const filteredElements=elements.filter((element)=>index!=element.index)
        setElements(filteredElements);
    }

    const sortElementsByIndex=(list)=>{
        setElements(list.sort((a, b) =>  (a.index - b.index)));
    }

    return { elements,onAddElement,onUpdateElmenet,onRemoveElement,setElements };
}
