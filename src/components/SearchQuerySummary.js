import React, { PropTypes } from 'react'

const SearchQuerySummary = (props) => {
  return (
    <div>{`[colors] cards named "${props.queryName}", of "${props.queryTypes}" type and "" text`}</div>
  )
}

SearchQuerySummary.propTypes = {
  queryName: PropTypes.string,
  queryTypes: PropTypes.string,
  queryText: PropTypes.string
}

export default SearchQuerySummary
