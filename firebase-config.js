// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBU1r41CfJZvyIfuos_0SuIWrG9jcwoITM",
    authDomain: "emuarch-c8d86.firebaseapp.com",
    databaseURL: "https://emuarch-c8d86-default-rtdb.firebaseio.com",
    projectId: "emuarch-c8d86",
    storageBucket: "emuarch-c8d86.firebasestorage.app",
    messagingSenderId: "52858215490",
    appId: "1:52858215490:web:93a8f3e82a7832dd1c21db",
    measurementId: "G-32LL6QS2GG"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const analytics = firebase.analytics();
