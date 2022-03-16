/**
 * This function wraps the children of the ConnectivityAndBreadcrumb component in a
 * div with a background color of light gray and a container
 * @returns A div with a class of bg-light py-2.
 */
export default function ConnectivityAndBreadcrumbWrap({ children }) {
  return (
    <div className="bg-light py-2">
      <div className="container">
        <div className="row">{children}</div>
      </div>
    </div>
  )
}
