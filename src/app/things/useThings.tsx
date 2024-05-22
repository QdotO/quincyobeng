import things from './things'

const useThings = ({ id }: { id: string }) => {
  const thing = things.find((thing) => thing.id === id)

  if (thing) return { thing, error: null }

  return { thing: null, error: 'Thing not found' }
}

export default useThings
