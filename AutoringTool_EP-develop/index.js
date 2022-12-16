import express from 'express'
import cors from 'cors'
import { downloadXAPIZip, generateScormZip, writeScormFile, writeXAPIFile } from './utils/fileFunctions.js';

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("port",process.env.PORT || 3001);
app.use(cors())

app.post("/editor",async(req,res)=>{
    const {standar} =req.body;

    if(standar==="scorm"){
        try {
             await writeScormFile(req,res);
             res.status(201);
            } 
        catch (error){res.status(500).send(error)}
    }

    if(standar==="xapi"){
        try {
            await writeXAPIFile(req,res);
            res.status(201);
            } 
        catch (error){res.status(500).send(error);}
        
    }
});

app.get("/generate-scorm",async(req,res)=>{
        try {
            await generateScormZip(req,res);
            res.status(200);
            } 
        catch (error){res.status(500).send(error);}
})

app.get("/generate-xapi",async(req,res)=>{
    try {
        await downloadXAPIZip(req,res);
        res.status(200);
        } 
    catch (error){res.status(500).send(error);}
})


console.log("Server is running on port: "+app.get("port"));
app.listen(app.get("port"))