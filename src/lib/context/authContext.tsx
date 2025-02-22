import { User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";


interface AuthProviderProps {
    children: ReactNode;
}
export interface loginEmailPassword {
    email: string,
    password: string
}

export interface AuthContextType {
    user: any | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean
}

export const AuthContext = createContext({

});

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)

    async function login( email:string, password:string) {
        console.log(email, password, "Email i sifra koju korisnik unese Context")
        const res = await fetch("api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" }
        })
        if (!res.ok) throw new Error("Login failed")
        const { user, token } = await res.json()
        setUser(user)
        setLoading(false)
        localStorage.setItem("user", JSON.stringify(user))
    }

    function logOut() {
        setUser(null);
        setLoading(true)
        localStorage.removeItem("user")
    }

    const value = { user, login, logOut, loading }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
}
