import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "",
    authDomain: "dota-league-94e1b.firebaseapp.com",
    projectId: "dota-league-94e1b",
    storageBucket: "dota-league-94e1b.firebasestorage.app",
    messagingSenderId: "910446673274",
    appId: "1:910446673274:web:cc0be593d0125de58ceac3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "consent"
})
export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth: any, adidtionalInformation:any ={}) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnaphot = await getDoc(userDocRef)
    if (!userSnaphot.exists()) {
        const { displayName, email } = userAuth;

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                ...adidtionalInformation
            })
        } catch (error: any) {
            console.log("error creating user", error.message)
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;
    console.log('unio se mail i pass u database')
    return await createUserWithEmailAndPassword(auth, email, password);
    
}