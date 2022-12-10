// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { 
    getFirestore,
    collection,
    addDoc,
    getDocs,
    onSnapshot, //Cuando los datos cambien
    deleteDoc,
    doc, // un solo documento
    getDoc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcz5uovdyp6tZu2JprHvvU_TV-ZVTgGXg",
    authDomain: "fir-notes-crud.firebaseapp.com",
    projectId: "fir-notes-crud",
    storageBucket: "fir-notes-crud.appspot.com",
    messagingSenderId: "959897389943",
    appId: "1:959897389943:web:626738501f157c03646f72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveNote = (ntitle, ntype, ncontent) =>
    addDoc(collection(db, 'notes'), { ntitle, ntype, ncontent });

export const getNotes = () => getDocs(collection(db, 'notes'));

export const onGetNotes = (callback) => onSnapshot(collection(db, 'notes'), callback)

export const deleteNote = (id) => deleteDoc(doc(db, 'notes', id));

export const getNote = (id) => getDoc(doc(db, 'notes', id));

export const updateNote = (id, newFields) => updateDoc(doc(db, 'notes', id), newFields);
