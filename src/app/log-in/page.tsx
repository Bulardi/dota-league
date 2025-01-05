'use client'
import { createUserDocumentFromAuth, signInWithGooglePopup } from "@/lib/firebase/firebase";
import React, { useState } from "react";
const defaultFields = {
  email: '',
  password: ''
}
export default function Page() {
  const [signIn, setSignIn] = useState(defaultFields)

  const handleChange = (event: any) => {
    setSignIn({
      ...signIn,
      [event.target.name]: [event.target.value]
    })
  }
  const handleSubmit = async (e: any)=>{
    //logika za log in
  }
  const SignIn = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="container-register-width flex justify-center mt-10">
        <div className="container-register">
          <label className="input input-bordered flex items-center gap-2">
            Email
            <input type="email" className="grow" onChange={handleChange} value={signIn.email} placeholder="milos@gmail.com" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Password
            <input type="password" className="grow" required onChange={handleChange} value={signIn.password} />
          </label>
          <button type='submit' className="btn">Log In</button>or
          <button onClick={SignIn} className="btn"> Log in With Google</button>
        </div>
      </div>
    </form>
  )
}