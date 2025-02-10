import { adminAuth } from "@/lib/firebase/firebaseadmin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const body = await req.json();
      const { token } = body;
        console.log("API hit")
      if (!token) {
        return NextResponse.json({ error: "Missing token" }, { status: 400 });
      }
  
      const decodedToken = await adminAuth.verifyIdToken(token);
      return NextResponse.json({ user: decodedToken }, { status: 200 });
    } catch (error) {
      console.error("Auth error:", error);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

