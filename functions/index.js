const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotification = ((notification) => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc));
});


exports.projectCreated = functions.firestore
  .document('record/{recordId}')
  .onCreate(doc => {

    const record = doc.data();
    const notification = {
      content: 'is registered',
      user: `${record.name} with an amount ${record.amount}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification);

});