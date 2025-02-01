'use client'
import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "@/lib/firebase/firebase"

export interface registerFields{
  name:string,
  email:string,
  password:string,
  repassword:string
}

const formFields:registerFields = {
  name: '',
  email: '',
  password: '',
  repassword: ''
}

export default function Page() {
  const [register, setRegister] = useState(formFields)
  const { name, email, password, repassword } = register

  const resetFields = () => {
    setRegister(formFields)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== repassword) {
      alert("Passwords do not match")
      return;
    }

    try {
      const userCredential = await createAuthUserWithEmailAndPassword(email, password);

      if (userCredential && userCredential.user) {
        await createUserDocumentFromAuth(userCredential.user, { name });
        resetFields()
      } else {
        console.log("User credential not returned.");
      }
    } catch (error) {
      console.error("Failed to log in",error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container-register-width flex justify-center mt-10">
        <div className="container-register">
          <label className="input input-bordered flex items-center gap-2 bg-white">
            Name
            <input
            className="bg-white"
              type="text"
              name='name'
              value={name}
              onChange={handleChange} placeholder="Milos Bulajic" />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-2 bg-white">
            Email
            <input
              type="email"
              name='email'
              value={email}
              onChange={handleChange} placeholder="milosbulajic@gmail.com" />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-2 bg-white">
            Password
            <input
              type="password"
              name='password'
              value={password}
              onChange={handleChange} className="grow" />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-2 bg-white">
            Confirm Password
            <input
              type="password"
              name='repassword'
              value={repassword}
              onChange={handleChange} className="grow" />
          </label>
          <button type='submit' className="btn mt-2 bg-white text-black">Register</button>
        </div>
      </div>
    </form>
  )
}