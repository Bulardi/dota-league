import Link from 'next/link'

export default function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100 border-b border-black">
        <div className="flex-1">
          <Link href={"/"} className='font-bold'>Landing Page</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              {/* feedback: opet umesto ovih stringova je bolje imati neki object koji zovemo recimo
           routerConfig = {login: "/log-in", register: "/register"} itd.. jer se cesto desava da vise buttona na appu vode na 1 istu tranicu, pa je bitno imati na jednom mestu za lakse odrzavanje */}
              <Link href={"/log-in"} className='font-bold'>Log in</Link>
            </li>
            <li>
              <Link href={"/register"} className='font-bold'>Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </>

  )
}