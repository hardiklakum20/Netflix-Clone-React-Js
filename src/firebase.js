import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB7oiaGY9qyAaEpzBzmFI-IqlpH6PDA5HI",
  authDomain: "netflix-clone-c755d.firebaseapp.com",
  projectId: "netflix-clone-c755d",
  storageBucket: "netflix-clone-c755d.appspot.com",
  messagingSenderId: "956915389276",
  appId: "1:956915389276:web:5fcfdcaecb05cfa2146799",
  measurementId: "G-Z8N8T8KRXW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name,email,password) => {
    try {
       const res =  await createUserWithEmailAndPassword(auth,email,password);
       const user = res.user;
       await addDoc(collection(db,"user"),{
        uid: user.uid,
        name,
        authProvider:"local",
        email,
       })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email,password) => {
    try {
       await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}

const logout = () => {
    signOut(auth);
}

export {auth,db,login,signUp,logout};
