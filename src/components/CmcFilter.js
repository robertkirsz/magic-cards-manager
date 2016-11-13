import React, { PropTypes } from 'react'

const CmcTypeInput = ({ thisType, activeType, onChange }) => (
  <label className="cmc-filter__type__label">
    <input
      className="cmc-filter__type__input"
      type="radio"
      name="activeType"
      value={thisType}
      checked={activeType === thisType}
      onChange={() => { onChange(thisType) }}
    />
    {thisType}
  </label>
)

CmcTypeInput.propTypes = {
  thisType: PropTypes.string,
  activeType: PropTypes.string,
  onChange: PropTypes.func
}

const CmcFilter = ({ cmcValue, cmcType, changeCmcValue, changeCmcType }) => (
  <div className="cmc-filter">
    <input
      className="cmc-filter__value-input"
      type="number"
      min="0"
      step="1"
      max="20"
      value={cmcValue}
      onChange={e => { changeCmcValue(parseInt(e.target.value || 0, 10)) }}
    />
    <CmcTypeInput thisType="minimum" activeType={cmcType} onChange={changeCmcType} />
    <CmcTypeInput thisType="exactly" activeType={cmcType} onChange={changeCmcType} />
    <CmcTypeInput thisType="maximum" activeType={cmcType} onChange={changeCmcType} />
  </div>
)

CmcFilter.propTypes = {
  cmcValue: PropTypes.number,
  cmcType: PropTypes.string,
  changeCmcValue: PropTypes.func,
  changeCmcType: PropTypes.func
}

export default CmcFilter
