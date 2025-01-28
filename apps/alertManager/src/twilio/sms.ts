const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSID=process.env.TWILIO_MESSAGEING_SERVICE_SID;
const client = require('twilio')(accountSid, authToken);

console.log("Account SID:", process.env.TWILIO_ACCOUNTSID);
console.log("Auth Token:", process.env.TWILIO_AUTHTOKEN);
console.log("Messaging Service SID:", process.env.TWILIO_MESSAGEING_SERVICE_SID);
/**
 * 
 * @param to user's phone number
 * @param message -> message which is to be send
 */
export async function sendSMS(to:string,message:string) {
    await client.messages
      .create({
        body: message,
        messagingServiceSid:messagingServiceSID,
        to: to
    }).then((message:any)=>console.log(message))
}
