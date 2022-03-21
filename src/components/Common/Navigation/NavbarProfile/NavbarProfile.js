export default function NavbarProfile({ status, data, onClickLogout, user }) {
  return (
    <ul className="navbar-nav">
      <li className={'nav-item dropdown'}>
        {status === 'idle' && <span>&nbsp;</span>}
        {status === 'error' && (
          <i className="fa fa-chain-broken text-white-50"></i>
        )}
        {status === 'fetching' && (
          <i className="fa fa-spinner fa-pulse fa-fw text-light"></i>
        )}
        {status === 'fetched' && (
          <>
            <a
              className="nav-item nav-link navbar-brand dropdown-toggle"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
            >
              <span>
                <i className="fa fa-md fa-user-circle-o" />
                <span className="text-capitalize small">
                  <span>&nbsp;</span>
                  {data.label
                    ? data.label.replace('.', ' ').replace('agent', '')
                    : 'NoLabel'}
                </span>
              </span>
            </a>
            <div className="dropdown-menu">
              <div className="dropdown-divider my-1" />
              <a
                className="dropdown-item"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                User: <span>{user.name}</span>
              </a>
              <div className="dropdown-divider my-1" />
              <a
                className="dropdown-item"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Id: <span className="small">{user.sub}</span>
              </a>
              <div className="dropdown-divider my-1" />
              <a className="dropdown-item" href="#" onClick={onClickLogout}>
                Logout
              </a>
              <div className="dropdown-divider my-1" />
            </div>
          </>
        )}
      </li>
    </ul>
  )
}
