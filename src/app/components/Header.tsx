import Link from 'next/link'

export default ({ pathname }: { pathname?: any }) => (
  <header>
    <Link href="/">
      <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
    </Link>
    <Link href="/about">
      <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
    </Link>
    <Link href="/signin">
      <a className={pathname === '/signin' ? 'is-active' : ''}>SignIn</a>
    </Link>
  </header>
)
