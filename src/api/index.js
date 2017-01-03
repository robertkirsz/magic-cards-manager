export const fetchAllSets = () => {
  // TODO: replace with Axios?
  if (__DEV__) return fetch('http://localhost:3001/db') // From 'src/api' -> json-server AllSets.json --port 3001
  if (__PROD__) return fetch('https://mtgjson.com/json/AllSets.json')
}

// I'm not using it anywhere at this moment
export const getGoogleUserData = (token) => {
  // TODO: replace with Axios??
  return fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`)
}
