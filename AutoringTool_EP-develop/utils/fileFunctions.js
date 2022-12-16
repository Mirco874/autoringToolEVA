import fs from "fs"
import ZipLocal from "zip-local";

export const writeScormFile=async(req,res)=>{
    const {type,content}=req.body;

    let directory="./templates/scorm_course/";

    switch (type) {
        case "main": 
            directory+="shared/main.html";
            break;
        case "manifest":
            directory+="imsmanifest.xml";
        break;
    }

    fs.writeFile(directory, content, (err) => {if (err) throw err;});
}

export const buidScormZip=async(scormZipName)=>{
    const scormFolderDirectory="./templates/scorm_course";
    ZipLocal.sync.zip(scormFolderDirectory).compress().save(scormZipName);
}

export const downloadScormZip=async(res,zipPath)=>{
    res.download(zipPath);
}

export const generateScormZip=async(req,res)=>{
    const zipName="scorm_course.zip";
    const zipPath=`./${zipName}`;

    await buidScormZip(zipName)
    await downloadScormZip(res,zipPath);
}

export const writeXAPIFile=async(req,res)=>{
    const {type,content}=req.body;
    let directory="./templates/xAPI_course/index.html"; //directorio de escritura
        fs.writeFile(directory,content,(err) => 
        {
            if (err) {console.error(err);}
        });
}

export const downloadXAPIZip=async(req,res)=>{
    const XAPIFolderDirectory="./templates/xAPI_course";
    const zipName="xapi_course.zip";
    const zipPath=`./${zipName}`;
    ZipLocal.sync.zip(XAPIFolderDirectory).compress().save(zipName);
    res.download(zipPath);
}
