export const fetchAllSets = () => {
  if (__DEV__) return fetch('http://localhost:3001/db') // From 'src/api' -> json-server AllSets.json --port 3001
  if (__PROD__) return fetch('https://mtgjson.com/json/AllSets.json')
}
