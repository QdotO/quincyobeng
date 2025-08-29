'use client'

import { SimulatorStep, simulatorData } from '../data/simulatorData'

interface ChoiceStepProps {
  step: SimulatorStep
  onChoice: (choiceIndex: number) => void
  previousChoices: string[]
  simulatorData: SimulatorStep[]
}

const ChoiceStep = ({
  step,
  onChoice,
  previousChoices,
  simulatorData
}: ChoiceStepProps) => {
  return (
    <div className='space-y-6'>
      {/* Question */}
      <div className='bg-white rounded-lg shadow-sm border p-6'>
        <h2 className='text-xl font-semibold text-slate-900 mb-3'>
          {step.question}
        </h2>
        <p className='text-slate-600 text-sm leading-relaxed'>{step.context}</p>
      </div>

      {/* Options */}
      <div className='space-y-3'>
        {step.options.map((option, index) => (
          <button
            key={option.id}
            onClick={() => onChoice(index)}
            className='w-full text-left bg-white rounded-lg shadow-sm border p-5 hover:shadow-md hover:border-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group'
            aria-describedby={`option-${index}-rationale`}
            aria-label={`Option ${index + 1}: ${option.text}`}
          >
            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <h3 className='font-medium text-slate-900 mb-2 group-hover:text-blue-900 transition-colors'>
                  {option.text}
                </h3>
                <p className='text-slate-600 text-sm mb-2'>
                  {option.immediateEffect}
                </p>
                <div
                  id={`option-${index}-rationale`}
                  className='text-slate-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity'
                >
                  💡 {option.rationale}
                </div>
              </div>
              <div className='ml-4 text-slate-400 group-hover:text-blue-500 transition-colors'>
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Previous Choices Summary */}
      {previousChoices.length > 0 && (
        <div className='bg-slate-50 rounded-lg p-4'>
          <h4 className='text-sm font-medium text-slate-700 mb-2'>
            Your previous choices:
          </h4>
          <div className='flex flex-wrap gap-2'>
            {previousChoices.map((choice, index) => {
              const prevStep = simulatorData[index]
              const selectedOption = prevStep.options[parseInt(choice)]
              return (
                <span
                  key={index}
                  className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800'
                >
                  Step {index + 1}:{' '}
                  {selectedOption.text.split(' ').slice(0, 3).join(' ')}...
                </span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default ChoiceStep
