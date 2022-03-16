/**
 * This function returns a list of navigation items, home etc.
 * @returns A list of navigation items.
 */
export default function NavbarNavigationMenu({ status }) {
  return (
    <ul className="navbar-nav mx-auto">
      <li className="nav-item">
        {status === 'idle' && <span>&nbsp;</span>}
        {status === 'error' && (
          <i className="fa fa-chain-broken text-white-50"></i>
        )}
        {status === 'fetching' && (
          <i className="fa fa-spinner fa-pulse fa-fw text-light"></i>
        )}
        {status === 'fetched' && (
          <a className="nav-link" onClick={(e) => e.preventDefault()} href="#/">
            HOME
          </a>
        )}
      </li>
    </ul>
  )
}
