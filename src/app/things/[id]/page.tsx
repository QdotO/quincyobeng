import React from 'react'
import useThings from '../useThings'

const ThingPage = ({ params: { id } }: { params: { id: string } }) => {
  const { thing, error } = useThings({ id })
  if (!!error || !thing) return <div>Error: {error}</div>
  return (
    <div>
      <p>ThingPage ID: {id}</p>
      <>{thing.component}</>
    </div>
  )
}

export default ThingPage
