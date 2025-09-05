import React from 'react'

const PastExperienceSection: React.FC = () => {
  const experiences = [
    {
      company: 'Axios',
      period: '2023 - Current',
      role: 'Senior Software Engineer',
      highlight: true
    },
    {
      company: 'Carvana',
      period: '2022 - 2023',
      role: 'Senior Software Engineer'
    },
    { company: 'Endeavor', period: '2021 - 2022', role: 'Software Engineer' },
    { company: 'USAA', period: '2014 - 2021', role: 'Software Engineer' }
  ]

  return (
    <div className='bg-surface border border-border rounded-2xl p-6 hover:border-electric/30 transition-all duration-200'>
      <div className='flex items-center gap-2 mb-4'>
        <span className='text-xl'>💼</span>
        <h2 className='text-light font-display font-bold text-xl'>
          Experience
        </h2>
      </div>

      <div className='space-y-3'>
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`group p-3 rounded-lg transition-all duration-200 ${
              exp.highlight
                ? 'bg-gradient-to-r from-electric/10 to-electric-secondary/10 border border-electric/30'
                : 'bg-dark-secondary/30 hover:bg-dark-secondary/50'
            }`}
          >
            <div className='flex justify-between items-start'>
              <div className='min-w-0 flex-1'>
                <h3
                  className={`font-semibold text-sm ${
                    exp.highlight ? 'text-electric' : 'text-light'
                  }`}
                >
                  {exp.company}
                  {exp.highlight && (
                    <span className='ml-1 text-xs bg-electric text-dark px-1.5 py-0.5 rounded-full'>
                      Current
                    </span>
                  )}
                </h3>
                <p className='text-muted text-xs'>{exp.role}</p>
              </div>
              <span className='text-muted text-xs font-mono ml-2 flex-shrink-0'>
                {exp.period}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PastExperienceSection
