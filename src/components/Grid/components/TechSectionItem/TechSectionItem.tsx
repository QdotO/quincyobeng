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
    <div className='group bg-surface border border-border rounded-2xl p-6 hover:border-electric/50 transition-all duration-300 hover:scale-105'>
      <div className='flex items-start gap-4'>
        <div className='w-16 h-16 bg-gradient-to-r from-electric/20 to-electric-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-electric/40 group-hover:to-electric-secondary/40 transition-all duration-300'>
          <Image
            src={imageSrc}
            alt={altText}
            width={32}
            height={32}
            className='object-contain'
          />
        </div>

        <div className='flex-1 min-w-0'>
          <h3 className='text-light font-display font-semibold text-lg mb-1 group-hover:text-electric transition-colors duration-300'>
            {title}
          </h3>
          <p className='text-muted text-sm leading-relaxed'>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default TechSectionItem
