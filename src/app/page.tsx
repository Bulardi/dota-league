'use client'
import { useAuthUser } from "./react-query/react-query"

export default function Page() {
const {data:user}= useAuthUser()

console.log(user)
  return (
    <div>
      <p>Podaci o korisniku:{user?.email} </p>
      <p className='p-10 border-2 border-black m-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem error laboriosam, praesentium vero amet at! Impedit ea provident est accusantium, facere magni incidunt necessitatibus, ipsum dolor totam unde dolore molestias!</p>
    </div>
  )
}

