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
  }

  return (
    <form onSubmit={handleSubmit}>
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