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
    <div className=''>
      <div className='text-center lg:text-left mb-8'>
        <h2 className='text-4xl lg:text-3xl md:text-5xl font-display font-bold text-light mb-4'>
          Tech <span className='text-electric'>Stack</span>
        </h2>
        <p className='text-muted text-xl lg:text-lg'>
          Tools and technologies I&apos;m building with
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-4'>
        <TechSectionItem
          imageSrc={CodePhotoSrc}
          altText='Code'
          title='Next.js'
          description='Full-stack React framework'
        />
        <TechSectionItem
          imageSrc={TypescriptPhotoSrc}
          altText='Typescript'
          title='TypeScript'
          description='Type-safe development'
        />
        <TechSectionItem
          imageSrc={ReactPhotoSrc}
          altText='React.js'
          title='React.js'
          description='UI component library'
        />
        <TechSectionItem
          imageSrc={TailwindPhotoSrc}
          altText='Tailwind'
          title='Tailwind CSS'
          description='Utility-first CSS framework'
        />
        <TechSectionItem
          imageSrc={'/assets/cypress.svg'}
          altText='Cypress'
          title='Cypress'
          description='E2E and component testing'
        />
        <TechSectionItem
          imageSrc={GithubPhotoSrc}
          altText='Github Copilot'
          title='GitHub Copilot'
          description='AI-powered development'
        />
        <TechSectionItem
          imageSrc={GroqPhotoSrc}
          altText='Groq cloud'
          title='Groq Cloud'
          description='High-performance AI inference'
        />
        <TechSectionItem
          imageSrc={'/assets/mcp.svg'}
          altText='Model Context Protocol'
          title='MCP'
          description='Extensible tool protocol for AI apps'
        />
      </div>
    </div>
  )
}

export default TechSection
