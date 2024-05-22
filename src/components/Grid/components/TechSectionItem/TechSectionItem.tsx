import React from 'react'
import Image, { StaticImageData } from 'next/image'

interface TechSectionItemProps {
  imageSrc: StaticImageData
  altText: string
  title: string
  description: string
}

const TechSectionItem: React.FC<TechSectionItemProps> = ({
  imageSrc,
  altText,
  title,
  description
}) => {
  return (
    <div className='flex p-2 h-fit w-full md:w-1/3'>
      <div className='w-1/3'>
        <div className='border border-light rounded-md shadow-md w-12 h-12 p-2 border-dashed'>
          <Image src={imageSrc} alt={altText} />
        </div>
      </div>
      <div className='w-2/3 flex flex-col'>
        <h3 className='text-light whitespace-nowrap'>{title}</h3>
        <p className='text-light whitespace-nowrap opacity-75'>{description}</p>
      </div>
    </div>
  )
}

export default TechSectionItem
