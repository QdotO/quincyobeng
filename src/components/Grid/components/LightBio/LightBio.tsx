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
    <div className='bg-surface border border-border rounded-2xl p-8 hover:border-electric/30 transition-all duration-200'>
      <div className='flex items-start gap-6'>
        <div className='w-20 h-20 bg-gradient-to-r from-electric to-electric-secondary rounded-2xl p-4 flex-shrink-0'>
          <Image
            src={imageSrc}
            alt={altText}
            className='w-full h-full object-contain brightness-0 invert'
          />
        </div>

        <div className='flex-1'>
          <h2 className='text-light font-display font-bold text-3xl mb-4'>
            {name}
          </h2>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <span className='text-electric'>🎂</span>
              <span className='text-muted text-lg'>{age} years old</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-electric'>👤</span>
              <span className='text-muted text-lg'>{pronouns}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-electric'>📍</span>
              <span className='text-muted text-lg'>
                Available for opportunities
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LightBio
