import Form from 'next/form'

export default function Page() {
  return (
    <Form action="">
      <div className="container-register-width flex justify-center mt-10">
        <div className="container-register">
          <label className="input input-bordered flex items-center gap-2">
            Name
            <input type="text" name='name' className="grow" placeholder="Milos Bulajic" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Email
            <input type="text" name='email' className="grow" placeholder="milosbulajic@gmail.com" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Password
            <input type="password" name='password' className="grow" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Confirm Password
            <input type="password" name='repassword' className="grow" />
          </label>
          <button type='submit' className="btn">Register</button>
        </div>
      </div>
    </Form>
  )
}