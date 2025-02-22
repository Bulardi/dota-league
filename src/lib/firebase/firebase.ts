import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, setPersistence, browserSessionPersistence, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, addDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { z } from "zod";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
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
const dataBaseNameItems = 'items';

export const createUserDocumentFromAuth = async (userAuth: User, adidtionalInformation: Record<string, any> = {}) => {
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
            console.error("Error while creating user", error)
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
    try {
        const itemsCollection = collection(db, dataBaseNameItems);
        const querySnapshot = await getDocs(query(itemsCollection, orderBy("date")));
        const items: T[] = querySnapshot.docs.map((doc) => ({
            // docs je property od querySnapshot koji predstavlja niz QueryDocumentSnapshot<DocumentData> objects u Firebase
            id: doc.id,
            ...(doc.data() as T),
        }));
        console.log(items, "items")
        return items;

    } catch (error: any) {
        if (error.code === "permission-denied") {
            console.error("Access denied: You must be logged in to view the items.");
        } else if (error.code === "unavailable") {
            console.error("Firestore service is currently unavailable. Please try again later.");
        } else {
            console.error("An unexpected error occurred while fetching items:", error);
        }
        return []
    }
};
const ItemSchema = z.object({
    itemName: z.string()
        .min(1, "Item name cannot be empty")
        .max(100, "Item name is too long")
        .regex(/^[a-zA-Z0-9\s]+$/, "Invalid characters detected"), // Prevents script injection
    date: z.date(),
});

//Dodavanje itema
export const AddItems = async (item: string) => {
    const currentDate = new Date();
    const { itemName, date } = ItemSchema.parse({
        itemName: item,
        date: currentDate,
    });

    try {
        const docRef = await addDoc(collection(db, dataBaseNameItems), {
            itemName,
            date
        })
        console.log("Added item with ID", docRef.id)
    } catch (error) {
        console.error("Didn't add item to the firebase", error)
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

// interface UserData {
//     name?: string
// }
// export function useAuthUser() {
//     const [user, setUser] = useState<User | null>(null);
//     const [loading, setLoading] = useState(true);

//     // Load user from localStorage on mount
//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         }
//         setLoading(false);
//     }, []);

//     // Function to log in a user via API
//     const login = async (email: string, password: string) => {
//         setLoading(true);
//         try {
//             const response = await fetch("/api/auth/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email, password }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setUser(data.user);
//                 localStorage.setItem("user", JSON.stringify(data.user)); // Store user data
//                 return data.user; // Return user data for further use
//             } else {
//                 throw new Error(data.error || "Login failed");
//             }
//         } catch (error) {
//             console.error("Login Error:", error);
//             return null;
//         } finally {
//             setLoading(false);
//         }
//     };

//     const logOut = async () => {
//         try {
//             await signOut(auth)
//             localStorage.removeItem("user")
//             setUser(null)
//         } catch (error) {
//             console.error("Error logging out", error)
//         }
//     }
//     console.log(user, "Korisnik u useAuthUser")
//     return { user, loading, logOut, login }
// }