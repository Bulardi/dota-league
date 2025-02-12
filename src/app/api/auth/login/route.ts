import { adminAuth } from "@/lib/firebase/firebaseadmin";
import { NextResponse } from "next/server";
import { z } from "zod";

const singInFormat = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export async function POST(req: Request) {
    try {
        console.log("pocetak")
        const body = await req.json();
        const { email, password } = singInFormat.parse(body)
        console.log("Signing in user:", email)
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, returnSecureToken: true })
        })

        const data = await response.json();

        if (!response.ok) {
            console.error("Firebase Sign-In Error:", data);
            return NextResponse.json({ error: data.error?.message || "Unauthorized" }, { status: 401 });
        }
        console.log("Api returns data")

        return NextResponse.json({ token: data.idToken, user: data }, { status: 200 })

    } catch (error) {

        console.log('Login Error', error);
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
}