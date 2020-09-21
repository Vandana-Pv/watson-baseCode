var admin = require("firebase-admin");
require('dotenv').config();

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DB_URL
  });
  
const db = admin.firestore();

async function addDetails(sessionId,state){
    console.log('====',sessionId,state)
    const res = await db.collection('watson').add({
        sessionId : sessionId,
        state: state
    })
    console.log('Document uploaded with id',res.id)
}

exports.addDetails = addDetails;

