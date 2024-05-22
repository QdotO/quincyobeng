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
    <div className='py-8 px-8 flex flex-col gap-4 font-sans'>
      <div className='flex flex-col md:flex-row pt-16 gap-8 bg-dark'>
        <div className='w-full md:w-1/2'>
          <div className='bg-dark flex flex-col gap-4 h-auto'>
            <div className='p-4 border border-light rounded-md shadow-md'>
              <Image className='rounded-md' src={photoSrc} alt='Quincy Obeng' />
            </div>
            <PastExperienceSection />
          </div>
        </div>
        <div className='w-full md:w-1/2'>
          <div className='bg-dark h-auto flex flex-col gap-4'>
            <LightBio
              imageSrc={CodePhotoSrc}
              altText='Code'
              name='Quincy Obeng'
              age={34}
              pronouns='He / him'
            />
            <Bio />
            <div className='flex flex-col p-8 gap-8 rounded-md border border-light'>
              <h3 className='text-light font-bold font-serif'>Education</h3>
              <p className='text-light opacity-75'>
                Texas A&M University - Corpus Christi
              </p>
            </div>
          </div>
        </div>
      </div>
      <TechSection />
    </div>
  )
}

export default Grid
