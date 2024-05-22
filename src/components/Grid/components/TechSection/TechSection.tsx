import React from 'react'
import TechSectionItem from '../TechSectionItem'
import CodePhotoSrc from '../../../../../public/assets/code-icon.png'
import TypescriptPhotoSrc from '../../../../../public/assets/typescript.png'
import ReactPhotoSrc from '../../../../../public/assets/react.png'
import TailwindPhotoSrc from '../../../../../public/assets/tailwind.png'
import GithubPhotoSrc from '../../../../../public/assets/github-copilot.jpeg'
import GroqPhotoSrc from '../../../../../public/assets/groq.png'

const TechSection: React.FC = () => {
  return (
    <div className='flex flex-col gap-4 p-8 border border-light rounded-md'>
      <h2 className='text-light font-serif font-bold'>Tech Stack</h2>
      <p className='text-light opacity-75'>{`I'm currently building with these`}</p>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col md:flex-row justify-between w-full'>
          <TechSectionItem
            imageSrc={CodePhotoSrc}
            altText='Code'
            title='Next.js'
            description='Web development'
          />
          <TechSectionItem
            imageSrc={TypescriptPhotoSrc}
            altText='Typescript'
            title='Typescript'
            description='Web development'
          />
          <TechSectionItem
            imageSrc={ReactPhotoSrc}
            altText='React.js'
            title='React.js'
            description='Web development'
          />
        </div>
        <div className='flex flex-col md:flex-row justify-between w-full'>
          <TechSectionItem
            imageSrc={TailwindPhotoSrc}
            altText='Tailwind'
            title='Tailwind'
            description='Web development'
          />
          <TechSectionItem
            imageSrc={GithubPhotoSrc}
            altText='Github Copilot'
            title='Github Copilot'
            description='AI development tool'
          />
          <TechSectionItem
            imageSrc={GroqPhotoSrc}
            altText='Groq cloud'
            title='Groq cloud'
            description='Web development'
          />
        </div>
      </div>
    </div>
  )
}

export default TechSection
