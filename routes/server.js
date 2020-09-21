const express = require('express')
const router = express.Router();
const watsonUtil = require('../helpers/watson');
const storage = require('../helpers/firebase');

router.post('/', async (req,res)=>{
    console.log('req body', req.body)
    let sessionId = await watsonUtil.createSessionId(req.body);
    console.log('......',sessionId);
    let finalData = await watsonUtil.sendMessage(req.body,sessionId)
    console.log('))))',finalData);
    let state = finalData.context.skills["main skill"].system.state;
    console.log('))))',state)
    res.send(finalData);
    let storageData = await storage.addDetails(sessionId,state);
})

module.exports = router;