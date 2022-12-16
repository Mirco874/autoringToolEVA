import { useState } from "react"

export const useCounter = (initialValue=0) => {
    const[counter,setCounter]=useState(initialValue);
    const increment=(amount)=>{
        setCounter(counter+amount);
    }
    return {counter,increment};
}
