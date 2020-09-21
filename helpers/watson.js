require('dotenv').config();
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

// Set up Assistant service wrapper.
const service = new AssistantV2({
  version: '2019-02-28',
  authenticator: new IamAuthenticator({
    apikey: process.env.API_KEY, // replace with API key
  }),
  serviceUrl: process.env.SERVICE_URL,

});

const assistantId = process.env.ASSISTANT_ID; // replace with assistant ID
let sessionId;

// Send message to assistant.
async function sendMessage(watsonData,sessionId) {
  console.log('Data from the function',watsonData,sessionId)
  let messageInput = {
        messageType: 'text',
        text: watsonData.query,
        options:{
          export: true
        }
  }
  console.log('---', messageInput);
  return new Promise((resolve, reject) => {
    service.message({
      assistantId : assistantId,
      sessionId : sessionId,
      input: messageInput,
      context: {
        global: {
          system: {
            timezone:"Asia/Calcutta",
            sampleText:"hello there"
          }
        },
        skills: {
          'main skill': {
            user_defined: {
              sampleContext: 'MyName'
            }
          }
        }
      }
    }).then(res => {
      // console.log(JSON.stringify(res.result, null, 2))
      let msgData = res.result;
      console.log('CONTEXT DATA',msgData.context.skills["main skill"].system.state)
      resolve(msgData);
    }).catch(err => {
      console.log(err)
      reject(err);
    })
  })
}

// Create session.
function createSessionId(watsonData){
  console.log('---Watson data', watsonData)
  return new Promise((resolve, reject) => {
    service.createSession({
      assistantId,
    }).then(res => {
      sessionId = res.result.session_id;
      console.log(sessionId);
      resolve(sessionId);
    }).catch(err => {
      console.log(err); 
      reject(err);
    });
  })
}


exports.createSessionId = createSessionId;
exports.sendMessage = sendMessage;

