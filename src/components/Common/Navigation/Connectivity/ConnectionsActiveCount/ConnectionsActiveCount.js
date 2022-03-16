/**
 * It counts the number of active connections.
 * @returns A number of active connections.
 */
export default function ConnectionsActiveCount({ data }) {
  const arrReduceActive = (d) =>
    d.results.reduce((acc, obj) => acc + (obj.state === 'active'), 0)
  return <b className="text-primary">{arrReduceActive(data)}</b>
}
