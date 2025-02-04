import { useQuery } from "@tanstack/react-query";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const fetchUser = () =>
    new Promise<User | null>((resolve) => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("poziva se funkcija fetchUser")
            resolve(user);
            unsubscribe(); //unsubscriba se posle resolving da ne bi bilo bespotrebnih ponavljanja.
        });
    });

export function useAuthUser() {
    return useQuery({
        queryKey: ["authUser"],
        queryFn: fetchUser,
        staleTime: 0,
        refetchOnWindowFocus:true
    });
}