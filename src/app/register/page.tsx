'use client'
import { useState } from "react"

export default function Page() {
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
    repassword: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(register),
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="container-register-width flex justify-center mt-10">
        <div className="container-register">
          <label className="input input-bordered flex items-center gap-2">
            Name
            <input
              type="text"
              name='name'
              value={register.name}
              onChange={handleChange} placeholder="Milos Bulajic" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Email
            <input
              type="email"
              name='email'
              value={register.email}
              onChange={handleChange} placeholder="milosbulajic@gmail.com" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Password
            <input
              type="password"
              name='password'
              value={register.password}
              onChange={handleChange} className="grow" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Confirm Password
            <input
              type="password"
              name='repassword'
              value={register.repassword}
              onChange={handleChange} className="grow" />
          </label>
          <button type='submit' className="btn">Register</button>
        </div>
      </div>
    </form>
  )
}