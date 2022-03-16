/**
 * `NavbarProfile` is a React component that renders a navbar profile
 * @returns A navbar profile.
 */
export default function NavbarProfile({ status, data }) {
  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        {status === 'idle' && <span>&nbsp;</span>}
        {status === 'error' && (
          <i className="fa fa-chain-broken text-white-50"></i>
        )}
        {status === 'fetching' && (
          <i className="fa fa-spinner fa-pulse fa-fw text-light"></i>
        )}
        {status === 'fetched' && (
          <a
            className="nav-link navbar-brand"
            onClick={(e) => e.preventDefault()}
            href="#/"
          >
            <i className="fa fa-md fa-user-circle-o" />
            <span className="text-capitalize small">
              <span>&nbsp;</span>
              {data.label
                ? data.label.replace('.', ' ').replace('agent', '')
                : 'NoLabel'}
            </span>
          </a>
        )}
      </li>
    </ul>
  )
}
