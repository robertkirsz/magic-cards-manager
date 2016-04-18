import React from 'react'
// import _ from 'lodash'

export const descendingBy = (key) => (a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0

export const ascendingBy = (key) => (a, b) => a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0

export const bracketsToArray = (string) => {
  const array = []
  string.replace(/\{(.*?)\}/g, function (g0, g1) {
    array.push(g1.replace('/', ''))
  })
  return array
}

// Komponent generujący ikony many na podstawie wartości 'manaCost'
export const ManaCost = ({manaArray}) => (
  <span className='manaCost'>
    {manaArray.map((mana, i) => {
      return <i key={i} className={'ms ms-cost ms-' + mana.toLowerCase()}></i>
    })}
  </span>
)
