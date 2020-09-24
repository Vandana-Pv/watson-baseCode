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

async function updateDetails(sessionId,newSessionId){
    console.log('Firebase Update',sessionId,newSessionId)
    const snapshot = await db.collection('watson').get();

    snapshot.forEach((doc) => {
        // console.log(doc.id, '=>', doc.data());
        // console.log('----',doc.data().sessionId)
        if(doc.data().sessionId === sessionId){
            console.log('Inside updatDetails if')
            console.log(doc.id, '=>', doc.data());
            const data = db.collection('watson').doc(doc.id)
            // const finalData = await data.get();
            data.update({
                sessionId: newSessionId
            })
        }
      })
}

exports.addDetails = addDetails;
exports.updateDetails= updateDetails;

