'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ChoiceStep from './components/ChoiceStep'
import SummaryStep from './components/SummaryStep'
import { simulatorData } from './data/simulatorData'

function SimulatorContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [choices, setChoices] = useState<string[]>([])

  // Load choices from URL on mount
  useEffect(() => {
    const choicesParam = searchParams.get('choices')
    if (choicesParam) {
      const loadedChoices = choicesParam.split(',')
      setChoices(loadedChoices)
      setCurrentStep(loadedChoices.length)
    }
  }, [searchParams])

  const handleChoice = (choiceIndex: number) => {
    const selectedOption = simulatorData[currentStep].options[choiceIndex]
    const newChoices = [...choices, selectedOption.id]
    setChoices(newChoices)
    setCurrentStep(currentStep + 1)

    // Update URL
    const params = new URLSearchParams(searchParams)
    params.set('choices', newChoices.join(','))
    router.replace(`?${params.toString()}`)
  }

  const resetSimulator = () => {
    setChoices([])
    setCurrentStep(0)
    router.replace('/play/simulator')
  }

  const isComplete = currentStep >= simulatorData.length

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4'>
      <div className='max-w-2xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>
            Product Sense Simulator
          </h1>
          <p className='text-slate-600'>
            Experience real product decisions under pressure. Choose wisely.
          </p>
        </div>

        {/* Progress Bar */}
        <div className='mb-8'>
          <div className='flex justify-between text-sm text-slate-500 mb-2'>
            <span>
              Step {Math.min(currentStep + 1, simulatorData.length)} of{' '}
              {simulatorData.length}
            </span>
            <span>
              {Math.round((currentStep / simulatorData.length) * 100)}% Complete
            </span>
          </div>
          <div className='w-full bg-slate-200 rounded-full h-2'>
            <div
              className='bg-blue-600 h-2 rounded-full transition-all duration-300'
              style={{
                width: `${(currentStep / simulatorData.length) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Content */}
        {!isComplete ? (
          <ChoiceStep
            step={simulatorData[currentStep]}
            onChoice={handleChoice}
            previousChoices={choices}
            simulatorData={simulatorData}
          />
        ) : (
          <SummaryStep choices={choices} onReset={resetSimulator} />
        )}

        {/* Footer */}
        <div className='text-center mt-8 text-sm text-slate-500'>
          <p>A simulation of product decision-making under constraints</p>
        </div>
      </div>
    </div>
  )
}

export default function ProductSenseSimulator() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4'>
          <div className='max-w-2xl mx-auto'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4'></div>
              <p className='text-slate-600'>Loading simulator...</p>
            </div>
          </div>
        </div>
      }
    >
      {/* Back to Work */}
      <div className='fixed top-3 left-3 md:top-6 md:left-6 z-50'>
        <Link
          href='/work'
          className='inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-black/40 text-white border border-white/20 backdrop-blur-md hover:bg-black/50 transition'
        >
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            className='h-5 w-5'
            aria-hidden
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 19l-7-7 7-7'
            />
          </svg>
          <span className='hidden sm:inline'>Back to Work</span>
        </Link>
      </div>
      <SimulatorContent />
    </Suspense>
  )
}
