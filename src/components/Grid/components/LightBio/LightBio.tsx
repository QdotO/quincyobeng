import React from 'react'
import Image, { StaticImageData } from 'next/image'

interface LightBioProps {
  imageSrc: StaticImageData
  altText: string
  name: string
  age: number
  pronouns: string
}

const LightBio: React.FC<LightBioProps> = ({
  imageSrc,
  altText,
  name,
  age,
  pronouns
}) => {
  return (
    <div className='flex flex-col gap-8 rounded-md border border-light p-8'>
      <div className='h-16 w-16'>
        <Image src={imageSrc} alt={altText} />
      </div>
      <h2 className='text-light font-serif font-semibold text-xl'>{name}</h2>
      <ul className='text-light opacity-75'>
        <li className='list-item'>{age} years old</li>
        <li className='list-item'>{pronouns}</li>
      </ul>
    </div>
  )
}

export default LightBio
