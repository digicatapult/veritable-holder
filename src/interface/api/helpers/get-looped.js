/**
 * It fetches data with GET from the server continuously and returns it.
 * @param origin - The origin of the API.
 * @param path - The path to the API endpoint.
 * @param params - The parameters to be sent to the API.
 * @param setStatus - a function that sets the status of the call.
 * @param setError - a function that takes an error message.
 * @param setStoreData - a function that takes the data from the result stores it.
 * @param transformData - a function that takes the data from the server and transforms it.
 */
export default async function getLooped(
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
    const res = await fetch(url, { method, headers })
    if (res.ok) {
      const data = await res.json()
      await new Promise((res) => setTimeout(res, 100))
      setStoreData(transformData(data))
    } else if (!res.ok) {
      setError(`${res.status}:${res.statusText}`)
      setStatus('error')
    }
  } catch (e) {
    setError(e.message || 'Error after fetch data try!')
    setStatus('error')
  }
}
