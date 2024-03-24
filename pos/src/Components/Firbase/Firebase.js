import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDEZFiBz7qdsjEY8TVIFia-eTj7-tTRLHs",
    authDomain: "pos-system-74091.firebaseapp.com",
    databaseURL: "https://pos-system-74091-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pos-system-74091",
    storageBucket: "pos-system-74091.appspot.com",
    messagingSenderId: "947884349220",
    appId: "1:947884349220:web:3a38f5908fb5cc8cca05b1"
};
 
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);