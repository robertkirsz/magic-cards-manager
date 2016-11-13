import React, { PropTypes } from 'react'
import _ from 'lodash'

const AllNoneToggle = ({ colors, toggleAll, toggleNone }) => {
  const allChecked = _.every(colors, c => c)
  const noneChecked = _.every(colors, c => !c)

  return (
    <div className="all-none-checkboxes">
      <label>
        <input
          type="radio"
          name="allNone"
          value="all"
          checked={allChecked}
          onChange={toggleAll}
        />
          All
      </label>
      <label>
        <input
          type="radio"
          name="allNone"
          value="none"
          checked={noneChecked}
          onChange={toggleNone}
        />
          None
      </label>
    </div>
  )
}

AllNoneToggle.propTypes = {
  colors: PropTypes.object,
  toggleAll: PropTypes.func,
  toggleNone: PropTypes.func
}

export default AllNoneToggle
