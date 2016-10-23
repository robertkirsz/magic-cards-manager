import React from 'react'

const searchCards = (e) => {
  e.preventDefault()
  console.log('submit')
}

export const SearchModule = () => (
  <div className="search-module row">
    <div className="col-sm-6">
      <form className="input-group" onSubmit={searchCards}>
        <input type="text" className="form-control" placeholder="Card name" />
        <span className="input-group-btn">
          <button className="btn btn-primary" type="submit">Search</button>
        </span>
      </form>
    </div>
  </div>
)

export default SearchModule
