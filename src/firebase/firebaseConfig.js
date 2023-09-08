import firebase from 'firebase/app';
import 'firebase/database';
const firebaseConfig = {
    // firebase config
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { database as default };
