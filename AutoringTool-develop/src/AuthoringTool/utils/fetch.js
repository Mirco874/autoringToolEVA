import { saveAs } from "file-saver";

export const getBlobFile= async(url,fileName)=>{
    const response= await fetch(url);
    const data=await response.blob();
    saveAs(data,fileName);
}

export const post= async(url,jsonBody)=>{
    const method='POST'
    const headers={'Accept': 'application/json','Content-Type': 'application/json'};
    const body=JSON.stringify(jsonBody);

    const response= await fetch(url,{method: method,headers:headers,body:body});

    const data=await response.json();
    console.log(data);
    return data;

}
