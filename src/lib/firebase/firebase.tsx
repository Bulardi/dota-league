import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

// feedback: ja bih i ostale stvari stavio u env
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID
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
const databaseName = 'users';

export const createUserDocumentFromAuth = async (userAuth: any, adidtionalInformation: any = {}) => {
    const userDocRef = doc(db, databaseName, userAuth.uid)
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
            console.error("Error while creating user")
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;
    console.log('unio se mail i pass u database')
    return await createUserWithEmailAndPassword(auth, email, password);

}

export const SignInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);

}
//Fetchovanje itema
export const FetchItems = async () => {
    const itemsCollection = collection(db, "items")
    const querySnapshot = await getDocs(itemsCollection)
    const items: any = [];
    querySnapshot.forEach((doc) => {
        const itemsData = doc.data()
        items.push({ id: doc.id, ...itemsData })
    })
    return items;
}

//Dodavanje itema
export const AddItems = async (item: any) => {
    if (item !== "") {
        try {
            const docRef = await addDoc(collection(db, "items"), {
                item: item
            })
            console.log("Added item with ID", docRef.id)
        } catch (error) {
            console.error("Didn't add item to the firebase")
        }
    }
    else {
        console.error("Input can't be empty string")
    }
}


//Brisanje itema
export const DeleteItems = async (itemId: string) => {
    try {
        await deleteDoc(doc(db, "items", itemId));
        return itemId;
    } catch (error) {
        console.error("Item is not deleted or does not exist", error)
    }
}