/**
 * This function creates a dropdown button with three lines of which
 * information about the backend endpoint or default information
 * if disconnected
 * @returns A div with a class of d-inline-block.
 */
export default function NavbarDropdownMultilineBtn({
  line01,
  line02,
  line03,
  icon,
}) {
  return (
    <div className="d-inline-block">
      <div className="d-table" style={{ height: '72px' }}>
        <div className="d-table-cell align-items-center align-middle">
          <div className="d-inline-block">
            <div className="d-block small">{line01}</div>
            <div className="d-block small">{line02}</div>
            <div className="d-block small">{line03}</div>
          </div>
          <div className="d-inline-block" style={{ height: '44px' }}>
            <div className="d-table-cell">
              <div className="d-inline-block align-middle">
                <i className={`small fa-md ${icon || 'fa fa-chevron-down'}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
