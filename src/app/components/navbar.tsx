import Link from 'next/link'
import routerConfig from '../config/routes'
import { AuthContextType, useAuth } from '@/lib/context/authContext'

export default function Navbar() {
  const { user, loading, logout } = useAuth() as AuthContextType

  if (loading) {
    return (
      <div className="navbar border-b border-black">
        <div className="flex-1">
          <Link href={routerConfig.home} className='font-bold'>Landing Page</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {user ? (
        <div className="navbar border-b border-black">
          <div className="flex-1">
            <Link href={routerConfig.home} className='font-bold'>Landing Page</Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href={routerConfig.crud} className='font-bold'>CRUD</Link>
              </li>
              <li>
                <Link onClick={(logout)} href={routerConfig.home} className='font-bold'>Log Out</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="navbar border-b border-black">
          <div className="flex-1">
            <Link href={routerConfig.home} className='font-bold'>Landing Page</Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href={routerConfig.login} className='font-bold'>Log in</Link>
              </li>
              <li>
                <Link href={routerConfig.register} className='font-bold'>Register</Link>
              </li>
            </ul>
          </div>
        </div>

      )}
    </>

  )
}