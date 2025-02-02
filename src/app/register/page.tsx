'use client'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "@/lib/firebase/firebase"
import { useForm } from "react-hook-form"


export interface registerFields {
  name: string,
  email: string,
  password: string,
  repassword: string
}

export default function Page() {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<registerFields>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      repassword: ''
    }
  });

  const validatePassword = watch('password')

  const onSubmit = async ({ name, email, password}: registerFields) => {
    try {
      const userCredential = await createAuthUserWithEmailAndPassword(email, password);
      if (userCredential && userCredential.user) {
        await createUserDocumentFromAuth(userCredential.user, { name });
        reset();
      } else {
        console.log("User credential not returned.");
      }
    } catch (error) {
      console.error("Failed to register", error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-register-width flex justify-center mt-10">
        <div className="container-register">

          <label className="input input-bordered flex items-center gap-2 bg-white">
            Name
            <input
              className="bg-white"
              type="text"
              {...register("name", {
                required: "Name is Required",
              })}
              placeholder="Milos Bulajic" />
          </label>
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <label className="input input-bordered flex items-center gap-2 mt-2 bg-white">
            Email
            <input
              type="email"
              {...register("email", {
                required: "Email is Required",

              })}
              placeholder="milosbulajic@gmail.com" />
          </label>
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <label className="input input-bordered flex items-center gap-2 mt-2 bg-white">
            Password
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters."
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[\W_])/,
                  message: "Password must contain at least 1 uppercase letter and 1 special character."
                },
              })}
              className="grow" />
          </label>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <label className="input input-bordered flex items-center gap-2 mt-2 bg-white">
            Confirm Password
            <input
              type="password"
              {...register("repassword", {
                required: "This field is Required",
                validate: value => value === validatePassword || "Passwords do not match"
              })}
              className="grow" />
          </label>
          {errors.repassword && <p className="text-red-500 text-sm">{errors.repassword.message}</p>}

          <button type='submit' className="btn mt-2 bg-white text-black">Register</button>
        </div>
      </div>
    </form>
  )
}

