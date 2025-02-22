'use client'

import { AuthContextType, useAuth } from "@/lib/context/authContext"



export default function Page() {
  const { user, loading } = useAuth() as AuthContextType
  console.log(loading)
  if (loading) {
    return <div className='p-10 border-2 border-black m-2'>
      <p>Podaci se ucitavaju</p>
      <span className="loading loading-spinner loading-xs"></span>
    </div>
  }
  return (
    <div>
      {user ? (<>
        <p className='p-10 border-2 border-black m-2'>Korisnicki mail: {user?.email}</p>
        <p className='p-10 border-2 border-black m-2'>Korisnicki uid: {user?.uid}</p>
      </>

      ) : (<>
        <p className='p-10 border-2 border-black m-2'>Korisnik nije ulogovan!!!</p>

      </>)
      }

    </div >
  )
}

