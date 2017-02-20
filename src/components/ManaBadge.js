import React, { PropTypes } from 'react'
import { manaLettersToArray } from 'utils'

const propTypes = { manaCost: PropTypes.string }

const ManaBadge = ({ manaCost }) => {
  return manaCost !== undefined
    ? (
      <span className="mana-badge">
        {
          manaLettersToArray(manaCost).map((className, i) => (
            <i
              key={i}
              className={className}
            />
          ))
        }
      </span>
    )
    : null
}

ManaBadge.propTypes = propTypes

export default ManaBadge
