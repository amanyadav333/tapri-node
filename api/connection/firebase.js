// const firebase_admin = require("firebase-admin");
// var serviceAccount = require("../uwoentertainment-9934a-firebase-adminsdk-vtg8f-c813a730c5.json");

// firebase_admin.initializeApp({
//   credential: firebase_admin.credential.cert(serviceAccount),
//   databaseURL: "https://uwoentertainment-9934a.firebaseio.com"
// })

// function sendNotificationToSingleUser(fb_id, title, message) {
//     return new Promise(async (resolve, reject) => {
//       try {
        
//         // console.log("*****22222");
//         // let qry = `select * from users where fb_id='${fb_id}'`;
//         // let result = await executeSqlQuery(qry);
//         if (true) {
//           const message_notification = {
//             notification: {
//               title: title,
//               body: message,
//             },
//           };
//           const notification_options = {
//             priority: "high",
//             timeToLive: 60 * 60 * 24,
//           };

//           const options = notification_options;

//           firebase_admin
//             .messaging()
//             .sendToDevice(fb_id, message_notification, options)
//             .then((response) => {
//               console.log("Notification sent successfully");
//               resolve("notification send");
//             });
//         } else {
//           reject("No User Found");
//         }
//       } catch (error) {
//         reject(error);
//       }
//     });
//   }

// module.exports.admin ={
//     "sendNotificationToSingleUser":sendNotificationToSingleUser
// }
