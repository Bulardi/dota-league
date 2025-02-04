import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, addDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

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
export const auth = getAuth(app);

setPersistence(auth, browserSessionPersistence)

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "consent"
})

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const db = getFirestore();
const databaseName = 'users';
const dataBaseNameItems= 'items';

export const createUserDocumentFromAuth = async (userAuth: User, adidtionalInformation: Record<string,any> = {}) => {
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
        } catch (error) {
            console.error("Error while creating user",error)
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
//The <T extends Record<string, any>> ensures T is a generic object type.
//Promise <T[]> knows that FetchItems returns an array of objects matching T
export const FetchItems = async <T extends Record<string, any>>(): Promise<T[]> => {
    const itemsCollection = collection(db, dataBaseNameItems);
    const querySnapshot = await getDocs(query(itemsCollection, orderBy("date")));
    const items: T[] = querySnapshot.docs.map((doc) => ({
        // docs je property od querySnapshot koji predstavlja niz QueryDocumentSnapshot<DocumentData> objects u Firebase
        id: doc.id,
        ...(doc.data() as T),
    }));
    console.log(items,"items")
    return items;
};

//Dodavanje itema
export const AddItems = async (item: any) => {
    const currentDate = new Date();
    if (item !== "" || !currentDate) {
        try {
            const docRef = await addDoc(collection(db, dataBaseNameItems), {
                item: item,
                date: currentDate
            })
            console.log("Added item with ID", docRef.id)
        } catch (error) {
            console.error("Didn't add item to the firebase",error)
        }
    }
    else {
        console.error("Input can't be empty string")
    }
}


//Brisanje itema
export const DeleteItems = async (itemId: string) => {
    try {
        await deleteDoc(doc(db, dataBaseNameItems, itemId));
        return itemId;
    } catch (error) {
        console.error("Item is not deleted or does not exist", error)
    }
}