/**
 * This function wraps the content of the page in a container with a background
 * color
 * @returns A div with a class of "py-1" and a child div with a class of "container
 * py-4 bg-light" and a child div with a class of "row"
 */
export default function ContentSelectorWrap({ children }) {
  return (
    <div className="py-1">
      <div className="container py-4 bg-light">
        <div className="row">
          {children && children}
          {!children && <div className="py-4 my-4"> &nbsp; </div>}
        </div>
      </div>
    </div>
  )
}
