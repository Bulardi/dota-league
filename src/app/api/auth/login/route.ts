import { adminAuth } from "@/lib/firebase/firebaseadmin";
import { getAuth } from "firebase-admin/auth";
import { NextResponse } from "next/server";
import { serialize } from "cookie"; // npm install cookie da bih koristio ovaj package
import { z } from "zod";

const signInFormat = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export async function POST(req: Request) {
    try {
        console.log("Checking request method:", req.method);
        console.log("Request headers:", req.headers);
        const body = await req.json();
        console.log(body, "BODY U RUTI")
        const { email, password } = signInFormat.parse(body)
        const user = await getAuth().getUserByEmail(email)
        const token = await adminAuth.createCustomToken(user.uid)
        console.log(user, token, "Korisnik i token sa sign in rute")
        const cookie = serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return NextResponse.json({ user, token }, { headers: { "Set-Cookie": cookie } })
    } catch (error) {
        console.log(error, "ERROR NA RUTI")
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
}