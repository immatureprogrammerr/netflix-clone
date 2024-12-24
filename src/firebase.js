import { initializeApp } from "firebase/app";
import { 
        getAuth, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        signOut
    } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "netflix-clone-6cb7f.firebaseapp.com",
  projectId: "netflix-clone-6cb7f",
  storageBucket: "netflix-clone-6cb7f.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;

        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })
    } catch(err) {
        console.log(err)
        toast.error(err.code.split("/")[1].split("-").join(" "))
    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch(err) {
        console.log(err);
        toast.error(err.code.split("/")[1].split("-").join(" "))
    }
};

const logout = async () => {
    try {
        signOut(auth);
    } catch(err) {
        console.log(err);
    }
};

export { auth, db, login, signUp, logout }