import React from 'react'
import things, { Thing } from './things'
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

const ThingsListPage = (props: Props) => {
  return (
    <div className='p-4 flex flex-col gap-8'>
      <h1 className='text-3xl'>Things</h1>
      <div className='flex gap-8 flex-wrap'>
        {things.map((thing: Thing) => (
          <div key={`thing-${thing.id}-${thing.name}`}>
            <Link href={`/things/${thing.id}`}>
              <Image
                src={thing.thumbnail}
                alt={thing.thumbnailAlt}
                width={200}
                height={200}
              />
              <p className='text-xl py-2'>{thing.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ThingsListPage
