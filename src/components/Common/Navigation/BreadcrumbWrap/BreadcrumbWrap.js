/**
 * This function is used to render the breadcrumb for the Agent Holder pages
 * @returns A breadcrumb.
 */
import Breadcrumb from '../../../Breadcrumb'

export default function BreadcrumbWrap({ children, status, persona }) {
  return (
    <div className="col-md-8">
      <ul className="breadcrumb bg-light m-1 p-2">
        {children && children}
        {!children && status !== 'fetched' && (
          <li className="breadcrumb-item"> &nbsp; </li>
        )}
        {!children && status === 'fetched' && persona && (
          <>
            <Breadcrumb />
          </>
        )}
      </ul>
    </div>
  )
}
