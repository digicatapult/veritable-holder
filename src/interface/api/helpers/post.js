/**
 * It makes a POST request to the server with custom parameters.
 * @param origin - the base URL of the API.
 * @param path - The path to the API endpoint.
 * @param params - The query string parameters to be sent to the server.
 * @param body - The body of the request.
 * @param setStatus - a function that sets the status of the component.
 * @param setError - a function that takes an error message.
 * @param setStoreData - a function that takes the data from the server and stores it.
 * @param transformData - a function that takes the data from the server and transforms it.
 */
export default async function post(
  origin,
  path,
  params,
  body,
  setStatus,
  setError,
  setStoreData,
  transformData
) {
  params = new URLSearchParams(params).toString()
  const url = origin + path + '?' + params
  body = JSON.stringify(body)
  const method = 'POST'
  const headers = { 'Content-Type': 'application/json' }
  try {
    setStatus('fetching')
    const res = await fetch(url, { body, method, headers })
    if (res.ok) {
      const data = await res.json()
      await new Promise((res) => setTimeout(res, 1000))
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
