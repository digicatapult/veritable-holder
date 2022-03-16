/**
 * It uses the DELETE call to delete data from the server and updates the store.
 * @param origin - the base URL of the API
 * @param path - The path to the API endpoint.
 * @param params - The parameters to be sent with the request.
 * @param setStatus - a function that sets the status of the call.
 * @param setError - a function that takes an error message.
 * @param setStoreData - a function that takes the data from the response and stores it.
 * @param transformData - a function that takes the response data and transforms it.
 */
export default async function del(
  origin,
  path,
  params,
  setStatus,
  setError,
  setStoreData,
  transformData
) {
  params = new URLSearchParams(params).toString()
  const url = origin + path + '?' + params
  const method = 'DELETE'
  const headers = { Accept: 'application/json' }
  try {
    setStatus('fetching')
    const res = await fetch(url, { method, headers })
    if (res.ok) {
      const data = await res.json()
      await new Promise((res) => setTimeout(res, 500))
      setStoreData(transformData(data))
      setStatus('fetched')
    } else if (!res.ok) {
      setError(`${res.status}:${res.statusText}`)
      setStatus('error')
    }
  } catch (e) {
    setError(e.message || 'Error after fetch data try!')
    setStatus('error')
  }
}
