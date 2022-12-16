export const importJsonFS= (e)=>{
    let content="";
    const file=e.target.files[0];
    const fileReader=new FileReader();

    if(!file){return;}
    fileReader.readAsText(file);

    fileReader.onload=()=>{
        content=JSON.parse(fileReader.result);
        console.log(content);
    }
    fileReader.onerror=()=>{
        console.error("something´s wrong");
    }
    return content;
}
