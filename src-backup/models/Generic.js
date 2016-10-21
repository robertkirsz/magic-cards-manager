export default class Generic {
  constructor (raw) {
    this.id = raw.id || new Date().getTime().toString()
    this.createdAt = raw.createdAt ? new Date(raw.createdAt) : new Date()
    this.updatedAt = raw.updatedAt ? new Date(raw.updatedAt) : new Date()
  }

  sortAscendingBy (key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1
      if (a[key] > b[key]) return 1
      return 0
    }
  }

  sortDescendingBy (key) {
    return function (a, b) {
      if (a[key] < b[key]) return 1
      if (a[key] > b[key]) return -1
      return 0
    }
  }
}
