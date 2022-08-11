const functions = require("firebase-functions").region('europe-west3');
const admin = require('firebase-admin');
admin.initializeApp();

//Take a text parameter passed to this HTTP and insert it into Firestore
exports.addMessage = functions.https.onRequest(async (req, res) => {
    //Grab the message text
    const timeM = req.query.time;
    const sequenceN = req.query.sequenceN;
    const device = req.query.device;
    const payload = req.query.data;
    const wet = parseInt(payload.substring(0,4), 16)
    const temp = parseInt(payload.substring(4,6), 16)
    const hum = parseInt(payload.substring(6,8), 16)
    //Push the new message to Firestore
    const writeResult = await admin.firestore().collection('messages').doc(sequenceN)
        .set({
            time: timeM,
            device: device,
            wet: wet,
            temp: temp,
            hum: hum
        });
    //Send back a message
    res.json({result: `Message with ID: ${sequenceN} added.`})
});

