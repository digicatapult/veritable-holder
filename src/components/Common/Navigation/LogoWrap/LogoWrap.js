/**
 * This function is used to create the logo for the application
 * @returns A link with the logo component inside.
 */
import Logo from '../../../Logo'

export default function LogoWrap({ children }) {
  const brandName = <span>Drone Pilot</span>

  return (
    <a
      className="navbar-brand d-none d-md-block"
      href="#/"
      onClick={(e) => e.preventDefault()}
    >
      <Logo />
      <span>&nbsp; {brandName}</span>
      {children && children}
    </a>
  )
}
