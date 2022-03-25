/**
 * This function creates a
 * fixed overlay that covers the entire screen. It's used to indicate that the
 * application is loading data
 * @returns A div with a background color of rgba(46,46,46,1) and a text-center
 * text of "Loading data..."
 */
export default function AuthLoadingOverlay() {
  return (
    <div
      className={'d-block'}
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(46,46,46,1)',
        zIndex: 1100,
      }}
    >
      <div className="text-light text-center m-3 p-3">
        <b>Loading data...</b>
      </div>
    </div>
  )
}
