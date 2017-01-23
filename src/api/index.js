export const fetchAllSets = () => {
  // TODO: replace with Axios?
  if (__DEV__) return fetch('/AllSets.json')
  if (__PROD__) return fetch('https://mtgjson.com/json/AllSets.json')
}
