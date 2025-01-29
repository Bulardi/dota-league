'use client'
import { createUserDocumentFromAuth, signInWithGooglePopup, SignInAuthUserWithEmailAndPassword } from "@/lib/firebase/firebase";

import React, { useState } from "react";

export interface logInFields{
  email:string,
  password:string
}

const defaultFields:logInFields = {
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
      console.error
    }
  }

  const handleChange = (e: any) => {
    setSignIn({ 
      ...signIn,
      [e.target.name]: e.target.value
    });
  };


  const SignIn = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user)
    console.log(userDocRef,"UserDocRef")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center mt-10">
        <div>
          <label className="input input-bordered flex items-center gap-2 bg-white">
            Email
            <input 
            type="email" 
            name="email" 
            className="grow bg-white" 
            onChange={handleChange} 
            value={email} 
            placeholder="milos@gmail.com" />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-2 bg-white">
            Password
            <input 
            type="password" 
            name="password" 
            className="grow"
            required 
            onChange={handleChange} 
            value={password} />
          </label>
          <button type='submit' className="btn mt-2 mr-2 bg-white text-black">Log In</button>
          <span className="font-bold">or</span>
          <button onClick={SignIn} type="button" className="btn ml-2 bg-white text-black"> Log in With Google</button>
        </div>
      </div>
    </form>
  )
}