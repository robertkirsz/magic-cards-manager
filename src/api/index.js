export const fetchAllSets = () => {
  // json-server AllSets.json --port 3001

  return fetch('http://localhost:3001/db')
  // return fetch('https://mtgjson.com/json/AllSets.json')
}
