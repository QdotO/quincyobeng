import Image from 'next/image'
import React from 'react'
import photoSrc from '../../../public/assets/quincy.jpeg'
import CodePhotoSrc from '../../../public/assets/code-icon.png'
import PastExperienceSection from './components/PastExperienceSection'
import Bio from './components/Bio'
import LightBio from './components/LightBio'
import TechSection from './components/TechSection'

type Props = {}

const Grid = (props: Props) => {
  return (
    <div className='py-16 px-8 max-w-7xl mx-auto'>
      {/* About Section */}
      <div className='mb-20'>
        <h2 className='text-4xl md:text-5xl font-display font-bold text-light mb-12 text-center'>
          About <span className='text-electric'>Me</span>
        </h2>

        {/* Asymmetrical layout */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
          {/* Left column - Photo and Tech Stack */}
          <div className='lg:col-span-1 space-y-8'>
            <div className='group'>
              <div className='absolute inset-0 bg-gradient-to-r from-electric to-electric-secondary rounded-2xl blur-xl opacity-20 group-hover:opacity-35 transition-opacity duration-200'></div>
              <div className='relative bg-surface border border-border rounded-2xl p-6 hover:border-electric/30 transition-all duration-200'>
                <Image
                  className='rounded-xl w-full h-auto'
                  src={photoSrc}
                  alt='Quincy Obeng'
                  priority
                />
              </div>
            </div>

            {/* Tech Stack in left column on desktop */}
            <div className='hidden lg:block'>
              <TechSection />
            </div>
          </div>

          {/* Right column content */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Bio Info */}
            <LightBio
              imageSrc={CodePhotoSrc}
              altText='Code'
              name='Quincy Obeng'
              age={34}
              pronouns='He / him'
            />

            {/* Main Bio */}
            <Bio />

            {/* Bottom row - Education and Experience */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='bg-surface border border-border rounded-2xl p-8 hover:border-electric/30 transition-all duration-200'>
                <h3 className='text-light font-display font-bold text-2xl mb-4 flex items-center gap-3'>
                  🎓 Education
                </h3>
                <p className='text-muted text-lg leading-relaxed'>
                  Texas A&M University
                  <br />
                  <span className='text-electric'>Corpus Christi</span>
                </p>
              </div>

              <PastExperienceSection />
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack for mobile - show below everything on mobile */}
      <div className='block lg:hidden'>
        <TechSection />
      </div>
    </div>
  )
}

export default Grid
