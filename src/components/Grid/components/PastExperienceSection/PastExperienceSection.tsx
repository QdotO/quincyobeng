import React from 'react'

const PastExperienceSection: React.FC = () => {
  return (
    <div className='gap-4 flex flex-col border border-light rounded-md p-8'>
      <h2 className='text-light font-bold font-serif'>Past Experience</h2>
      <p className='text-light opacity-75'>{`Where I've worked so far`}</p>
      <div className='text-light flex flex-col gap-4'>
        <div className='text-light flex justify-between'>
          <p className='text-light'>Axios</p>
          <p className='text-light opacity-75'>2023 - Current </p>
        </div>
        <div className='flex justify-between'>
          <p className='text-light'>Carvana</p>
          <p className='text-light opacity-75'>2022 - 2023 </p>
        </div>
        <div className='flex justify-between'>
          <p className='text-light'>Endeavor</p>
          <p className='text-light opacity-75'>2021 - 2022 </p>
        </div>
        <div className='flex justify-between'>
          <p className='text-light'>USAA</p>
          <p className='text-light opacity-75'>2014 - 2021 </p>
        </div>
      </div>
    </div>
  )
}

export default PastExperienceSection
