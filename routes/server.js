const express = require('express')
const router = express.Router();
const watsonUtil = require('../helpers/watson');
const storage = require('../helpers/firebase');

router.post('/', async (req,res)=>{
    console.log('req body', req.body)
    // SESSIONID PARAMETER - CHECKS IF THE SESSION IS EXPIRED OR NOT
    if(req.body.sessionId){
        console.log('session expired')
        console.log('Inside If');
        let sessionId = req.body.sessionId;
        console.log('......',sessionId);
        let finalData = await watsonUtil.sendMessage(req.body,sessionId)
        console.log('))))',finalData);  // Displays new session id 
        let updatedData = await storage.updateDetails(sessionId,finalData.sessionId)
        res.send(finalData.sessionId)   //returns new sessoin id
    }
    else if(req.body.state && req.body.sessionId){
        console.log('Inside else if', req.body.state, req.body.sessionId)
    }
    // CREATES A NEW SESSION 
    else{
        console.log('Outside If');
        let sessionId = await watsonUtil.createSessionId(req.body);
        let finalData = await watsonUtil.sendMessage(req.body,sessionId)
        console.log('))))',finalData);
        let state = finalData.context.skills["main skill"].system.state;
        console.log('))))',state)
        res.send(finalData);
        let storageData = await storage.addDetails(sessionId,state);
    }
})

router.get('/',(req,res) => {
    res.send('Hello World!')
})
module.exports = router;








    // let sessionId = req.body.sessionId;
    // let state = 'eyJzZXNzaW9uX2lkIjoiNGYwN2VlNzctZTAzNi00ZTdlLTg1MDQtZGE3YThlODQwY2I4Iiwic2tpbGxfcmVmZXJlbmNlIjoibWFpbiBza2lsbCIsImFzc2lzdGFudF9pZCI6IjU5OWRiZDc0LTk4MmEtNDFiZS05ZTQwLWQ1MGU0NjJhZjg0ZiIsImluaXRpYWxpemVkIjp0cnVlLCJkaWFsb2dfc3RhY2siOlt7ImRpYWxvZ19ub2RlIjoicm9vdCJ9XSwiX25vZGVfb3V0cHV0X21hcCI6eyJXZWxjb21lIjp7IjAiOlswXX19fQ=='
    // let finalData = await watsonUtil.sendMessage(req.body,sessionId)
    // console.log('))))',finalData);
    // // let state = finalData.context.skills["main skill"].system.state;
    // // Executes only if the session is expired
    // // finalData.sessionId returns the newSessionId
    // if(finalData.sessionId){
    //     console.log('Inside if');
    //     // Updates the previous sessionId with the new sessionId
    //     let updatedData = await storage.updateDetails(sessionId,finalData.sessionId)
    //     console.log('//////////', updatedData)
    //     res.send(finalData.sessionId)
    // }
    // else{
    //     console.log('))))',state)
    //     res.send(finalData);
    //     let storageData = await storage.addDetails(sessionId,state);
    // }
