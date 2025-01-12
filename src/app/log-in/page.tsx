'use client'
import { createUserDocumentFromAuth, signInWithGooglePopup, SignInAuthUserWithEmailAndPassword } from "@/lib/firebase/firebase";

import React, { useState } from "react";

const defaultFields = {
  email: '',
  password: ''
}

export default function Page() {
  const [signIn, setSignIn] = useState(defaultFields)
  const { email, password } = signIn

  const resetFields = () => {
    setSignIn(defaultFields)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await SignInAuthUserWithEmailAndPassword(email, password)
      console.log(response)
      resetFields()
    } catch (error) {
      // feedback fali console.error
    }
  }

  const handleChange = (e: any) => {
    console.log(e.target.value)
    setSignIn({
      ...signIn,
      [e.target.name]: e.target.value
    });
  };


  const SignIn = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user)
    //'userDocRef' is declared but its value is never read.ts(6133)
    // 'userDocRef' is assigned a value but never used.eslint@typescript-eslint/no-unused-vars
    // feedback: ne bi trebalo nikada da ostavljamo warninge, mislim da je ovde skroz ok da se loguje ovaj object userDocRef
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* feedback: ali ako imam tailwind umesto custom class,a onda cu morati copy paste code?
      odgovor: ne, mozes napraviti react komponentu koja je recimo FormContainer, koja ima u sebi recimo ovaj div (ili sta god da vec sheruju sve forme u tvojoj aplikaciji)
      */}
      <div className="container-register-width flex justify-center mt-10">
        <div className="container-register">
          <label className="input input-bordered flex items-center gap-2">
            Email
            <input type="email" name="email" className="grow" onChange={handleChange} value={email} placeholder="milos@gmail.com" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Password
            <input type="password" name="password" className="grow" required onChange={handleChange} value={password} />
          </label>
          <button type='submit' className="btn">Log In</button>or
          <button onClick={SignIn} type="button" className="btn"> Log in With Google</button>
        </div>
      </div>
    </form>
  )
}