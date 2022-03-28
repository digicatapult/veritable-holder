/**
 * It fetches data with GET from a server and returns it.
 * @param origin - the base URL of the API.
 * @param path - The path to the API endpoint.
 * @param params - The parameters to be sent to the API.
 * @param setStatus - a function that takes status of the fetch.
 * @param setError - a function that takes an error message if error.
 * @param setStoreData - a function that takes the data from the response and stores it.
 * @param transformData - a function that takes the data transforms it.
 */
export default async function get(
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
  const method = 'GET'
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
