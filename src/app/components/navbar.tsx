import Link from 'next/link'

export default function Navbar() {
  const routerConfig={
    home:'/',
    login:'/log-in',
    register:'register'
  }
  return (
    <>
    <div className="navbar bg-base-100 border-b border-black">
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
    </>
    
  )
}