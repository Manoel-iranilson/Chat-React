import Firebase from 'firebase/compat/app'
import "firebase/compat/auth"
import "firebase/compat/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyD1oJ4PMSn7tL07sLNtAysvWr_jMPMYgC4",
  authDomain: "chat-c8d4f.firebaseapp.com",
  projectId: "chat-c8d4f",
  storageBucket: "chat-c8d4f.appspot.com",
  messagingSenderId: "252349915093",
  appId: "1:252349915093:web:faaba86ac973d0bb14a75c"
};
  
const app = Firebase.initializeApp(firebaseConfig)

const db = app.firestore();
const auth = app.auth();
const provider = new Firebase.auth.GoogleAuthProvider();

export {db,auth,provider};
