'use client'
import { createUserDocumentFromAuth, signInWithGooglePopup, SignInAuthUserWithEmailAndPassword } from "@/lib/firebase/firebase";
import { useForm } from "react-hook-form";
import routerConfig from "../config/routes";
import { useRouter } from "next/navigation";
import { AuthContextType, useAuth } from "@/lib/context/authContext";

export interface logInFields {
  email: string,
  password: string
}

export default function Page() {
  const { login } = useAuth() as AuthContextType
  const router = useRouter();
  const { register, handleSubmit } = useForm<logInFields>({
    defaultValues: {
      email: '',
      password: ''
    }
  })


  const signInSubmit = async ({ email, password }: logInFields) => {
    try {
      await login(email, password)
      router.push(routerConfig.home);
    } catch (error) {
      console.error("Login failed", error)
    }
  }


  const SignIn = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user)
    router.push(routerConfig.home);
    console.log(userDocRef, "UserDocRef")
  }

  return (
    <form onSubmit={handleSubmit(signInSubmit)}>
      <p></p>
      <div className="flex justify-center mt-10">
        <div>
          <label className="input input-bordered flex items-center gap-2 bg-white">
            Email
            <input
              type="email"
              {...register("email")}
              className="grow bg-white"
              placeholder="example@gmail.com" />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-2 bg-white">
            Password
            <input
              type="password"
              {...register("password")}
              className="grow"
              required
            />
          </label>
          <button type='submit' className="btn mt-2 mr-2 bg-white text-black">Log In</button>
          <span className="font-bold">or</span>
          <button onClick={SignIn} type="button" className="btn ml-2 bg-white text-black"> Log in With Google</button>
        </div>
      </div>
    </form>
  )
}