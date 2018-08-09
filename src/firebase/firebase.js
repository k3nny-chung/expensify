import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };
  
firebase.initializeApp(config);
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {firebase, googleAuthProvider, database as default }

// database.ref('expenses').on('value', (snapshot) => {
//     const expenses = [];

//     snapshot.forEach( (child) => {
//         expenses.push( {
//             id: child.key,
//             ...child.val()
//         });
//     });

//     console.log(expenses);
// });

// database.ref('expenses').push({
//     description: 'Groceries',
//     note: '',
//     amount: 10189,
//     createdAt: 98573302812
// });


// database.ref('expenses').once('value')
// .then( (snapshot) => {
//     const expenses = [];

//     snapshot.forEach( (child) => {
//         expenses.push( {
//             id: child.key,
//             ...child.val()
//         });
//     });

//     console.log(expenses);
// });
