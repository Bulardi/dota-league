import Link from 'next/link'
import routerConfig from '../config/routes'

export default function Navbar() {
  return (
    <>
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
          <li>
            <Link href={routerConfig.crud} className='font-bold'>CRUD</Link>
          </li>
        </ul>
      </div>
    </div>
    </>

  )
}