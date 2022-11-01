import Firebase from 'firebase/compat/app'
import "firebase/compat/auth"
import "firebase/compat/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyBNNxkltYD_AQzmBzexjP2SI8XbEHS2Ubk",
    authDomain: "chat-63ee2.firebaseapp.com",
    projectId: "chat-63ee2",
    storageBucket: "chat-63ee2.appspot.com",
    messagingSenderId: "161016934643",
    appId: "1:161016934643:web:af464c46195f72724ac786"
  };
  
const app = Firebase.initializeApp(firebaseConfig)

const db = app.firestore();
const auth = app.auth();
const provider = new Firebase.auth.GoogleAuthProvider();

export {db,auth,provider};
