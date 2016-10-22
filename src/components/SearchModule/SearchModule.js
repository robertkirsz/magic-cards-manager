import React from 'react'
import './SearchModule.scss'

const searchCards = (e) => {
  e.preventDefault()
  console.log('submit')
}

export const SearchModule = () => (
  <div className="search-module">
    <form className="input-group" onSubmit={searchCards}>
      <input type="text" className="form-control" placeholder="Card name" />
      <span className="input-group-btn">
        <button className="btn btn-primary" type="submit">Search</button>
      </span>
    </form>
  </div>
)

export default SearchModule
