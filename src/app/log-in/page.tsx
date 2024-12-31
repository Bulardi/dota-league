import React from "react";

export default function Page() {
  return (
    <div className="container-register-width flex justify-center mt-10">
      <div className="container-register">
        <label className="input input-bordered flex items-center gap-2">
        Email
          <input type="email" className="grow" placeholder="milos@gmail.com" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Password
          <input type="password" className="grow" required />
        </label>
        <button type='submit' className="btn">Log In</button>
      </div>
    </div>
  )
}