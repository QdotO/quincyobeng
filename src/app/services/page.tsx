import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

/*
Services page will display the following things:
a section on consulation for building custom solutions for individuals and businesses
a section on current state ai technology being used in the industry
a section on prompt engineering
a section on custom websites for local business
a section on private custom tools for employees

Each section will be nearly a full page in height leaving a tenth 
of screen height left to preview the next section

Each section will have a graphic and a description and a button to pay the deposit 
before being redirected to a scheduling page


*/

const ServicesPage = (props: Props) => {
  return (
    <div className='flex flex-col text-gray-950 font-sans font-semibold'>
      <div className='flex flex-col gap-4 h-[40vh] justify-center'>
        <h1 className='self-center text-gray-800 bg-transparent dark:text-gray-100 text-6xl'>
          Services and Solutions
        </h1>
        <p className='text-xl self-center text-gray-600'>
          Consultation and custom tools
        </p>
      </div>

      <div className='min-h-96 w-full p-4 flex text-blue-400 justify-center gap-2'>
        <div className='flex flex-col gap-8 p-12'>
          <h2 className='text-4xl'>Solutions</h2>
          <div className='flex flex-col text-gray-200'>
            <p>Custom solutions for individuals and businesses</p>
            <p>Get access to AI technology being used in industry</p>
            <p>Private custom tools for employees</p>
            <p>Custom websites for local business</p>
          </div>
        </div>
        <div className='flex flex-col gap-8 p-12'>
          <h2 className='text-4xl'>Consultation</h2>
          <div className='flex flex-col text-gray-200'>
            <p>
              Get access to 10 years of enterprise grade solution engineering
            </p>
          </div>
        </div>
      </div>

      <div className='min-h-96 w-full text-gray-200 p-4 flex flex-col justify-center items-center'>
        <p className='text-5xl mb-8'>Ready to get started?</p>
        <div className='flex gap-8 justify-center'>
          <Link
            href={'/things'}
            className='border-2 border-blue-700 p-4 rounded-md'
          >
            Check out my work
          </Link>
          <button className='border-2 border-blue-700 p-4 rounded-md'>
            Schedule a call
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
