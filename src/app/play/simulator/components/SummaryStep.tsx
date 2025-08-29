'use client'

import {
  calculateFinalScore,
  getStrategySummary,
  simulatorData
} from '../data/simulatorData'

interface SummaryStepProps {
  choices: string[]
  onReset: () => void
}

const SummaryStep = ({ choices, onReset }: SummaryStepProps) => {
  const score = calculateFinalScore(choices)
  const strategy = getStrategySummary(score)

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/play/simulator?choices=${choices.join(',')}`
      : ''

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Product Strategy Results',
          text: `I got "${strategy}" in the Product Sense Simulator!`,
          url: shareUrl
        })
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareUrl)
      }
    } else {
      navigator.clipboard.writeText(shareUrl)
    }
  }

  return (
    <div className='space-y-6'>
      {/* Results Header */}
      <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 text-center'>
        <h2 className='text-2xl font-bold text-slate-900 mb-2'>
          Your Strategy: {strategy}
        </h2>
        <p className='text-slate-600'>
          Based on your decisions, here&apos;s how your product launch would
          play out
        </p>
      </div>

      {/* Score Breakdown */}
      <div className='grid grid-cols-2 gap-4'>
        <div className='bg-white rounded-lg p-4 text-center'>
          <div className='text-2xl font-bold text-green-600'>
            {score.userSatisfaction}
          </div>
          <div className='text-sm text-slate-600'>User Satisfaction</div>
        </div>
        <div className='bg-white rounded-lg p-4 text-center'>
          <div className='text-2xl font-bold text-blue-600'>
            {score.businessValue}
          </div>
          <div className='text-sm text-slate-600'>Business Value</div>
        </div>
        <div className='bg-white rounded-lg p-4 text-center'>
          <div className='text-2xl font-bold text-purple-600'>
            {score.technicalHealth}
          </div>
          <div className='text-sm text-slate-600'>Technical Health</div>
        </div>
        <div className='bg-white rounded-lg p-4 text-center'>
          <div className='text-2xl font-bold text-orange-600'>
            {score.timeline}
          </div>
          <div className='text-sm text-slate-600'>Timeline Impact</div>
        </div>
      </div>

      {/* Decision Summary */}
      <div className='bg-white rounded-lg shadow-sm border p-6'>
        <h3 className='text-lg font-semibold text-slate-900 mb-4'>
          Your Decisions
        </h3>
        <div className='space-y-3'>
          {choices.map((choice, index) => {
            const step = simulatorData[index]
            const selectedOption = step.options.find((opt) => opt.id === choice)
            return (
              <div key={index} className='flex items-start space-x-3'>
                <div className='flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-800'>
                  {index + 1}
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-medium text-slate-900'>
                    {selectedOption?.text || 'Unknown choice'}
                  </p>
                  <p className='text-xs text-slate-500 mt-1'>
                    {selectedOption?.immediateEffect || ''}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Strategy Insights */}
      <div className='bg-slate-50 rounded-lg p-6'>
        <h3 className='text-lg font-semibold text-slate-900 mb-3'>
          What This Says About You
        </h3>
        <div className='space-y-2 text-sm text-slate-700'>
          {strategy === 'Balanced Innovator' && (
            <>
              <p>
                • You excel at finding the sweet spot between competing
                priorities
              </p>
              <p>
                • Your decisions show strong product intuition and risk
                management
              </p>
              <p>
                • You understand that great products balance user needs,
                business goals, and technical sustainability
              </p>
            </>
          )}
          {strategy === 'User-First Champion' && (
            <>
              <p>• User experience is your north star</p>
              <p>
                • You prioritize long-term satisfaction over short-term gains
              </p>
              <p>
                • Your decisions reflect deep empathy for user needs and pain
                points
              </p>
            </>
          )}
          {strategy === 'Business Driver' && (
            <>
              <p>• You have a strong commercial mindset</p>
              <p>• Your decisions maximize business impact and ROI</p>
              <p>
                • You understand the importance of market timing and competitive
                advantage
              </p>
            </>
          )}
          {strategy === 'Technical Steward' && (
            <>
              <p>• You value long-term code quality and maintainability</p>
              <p>• Your decisions prevent technical debt from accumulating</p>
              <p>
                • You understand that technical excellence enables future
                innovation
              </p>
            </>
          )}
          {strategy === 'Speed Demon' && (
            <>
              <p>• You thrive in fast-paced environments</p>
              <p>
                • Your decisions prioritize speed and iteration over perfection
              </p>
              <p>
                • You understand that shipping early allows for learning and
                adaptation
              </p>
            </>
          )}
          {strategy === 'Pragmatic Leader' && (
            <>
              <p>• You make practical decisions based on context</p>
              <p>
                • Your approach adapts to the specific situation and constraints
              </p>
              <p>
                • You understand that there&apos;s no one-size-fits-all solution
              </p>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className='flex flex-col sm:flex-row gap-3'>
        <button
          onClick={handleShare}
          className='flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          aria-label='Share your simulator results'
        >
          Share Results
        </button>
        <button
          onClick={onReset}
          className='flex-1 bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2'
          aria-label='Start the simulator again'
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

export default SummaryStep
