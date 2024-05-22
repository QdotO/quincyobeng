'use client'
import React, { use, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Event } from './WeedTracker.types'
import getAmountMessage from './utils/getAmountMessage'
const supabase = createClient()

const WeedTracker = () => {
  const [name, setName] = React.useState('')
  const [eventType, setEventType] = useState<'bought' | 'consumed'>('consumed')
  const [events, setEvents] = useState<Event[]>([])
  const [amount, setAmount] = useState(15)

  useEffect(() => {
    const fetchEvents = async () => {
      const { data: eventsData } = await supabase.from('events').select('*')
      setEvents(eventsData as Event[])
      console.log({ eventsData })
    }
    const fetchUsers = async () => {
      const { data: usersData } = await supabase.from('users').select('*')
      console.log({ usersData })
    }
    fetchUsers()
    fetchEvents()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ name, eventType, timestamp: new Date() })
    setEvents([...events, { name, eventType, timestamp: new Date(), amount }])
    const { data, error } = await supabase
      .from('events')
      .insert([{ name, eventType, timestamp: new Date(), amount }])
      .select()
    if (error) {
      console.error(error)
    }
    console.log({ insertedDataResponse: data })
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value))
  }

  const handleEventTypeSelection = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEventType(e.target.value as 'bought' | 'consumed')
  }

  return (
    <div className='flex flex-col items-center min-h-[85vh]'>
      <h1 className='text-center self-end'>Weed Tracker</h1>
      <form
        onSubmit={handleSubmit}
        className='text-center flex flex-col gap-4 text-gray-200'
      >
        <label className='self-start' htmlFor='weed-name'>
          Weed Name
        </label>
        <input
          id='weed-name'
          type='text'
          className='text-gray-200 bg-gray-700 p-2 rounded'
          value={name}
          onChange={handleChange}
        />
        <label className='self-start' htmlFor='event-type'>
          Event Type
        </label>
        <select
          className='text-gray-200 bg-gray-700 p-2 rounded'
          onChange={handleEventTypeSelection}
          name='event-type'
          id='event-type'
          value={eventType}
        >
          <option value='bought'>Bought</option>
          <option value='consumed'>Consumed</option>
        </select>
        <div className='flex flex-col'>
          <div className='flex justify-between'>
            <p className=''>{amount}</p>
            {amount && <p className=''>{getAmountMessage(amount)}</p>}
          </div>
          <input
            type='range'
            min='1'
            max='100'
            value={amount}
            onChange={handleAmountChange}
            className='w-full'
          />
        </div>
        <button
          className='self-end p-2 border border-gray-200 rounded'
          type='submit'
        >
          Submit
        </button>
      </form>
      <section className='mt-4'>
        <h2 className=''>Events</h2>
        <ul className='flex gap-4'>
          {events.map((event) => (
            <li
              className='flex flex-col gap-2 p-4 rounded bg-gray-700 text-gray-200'
              key={`event-${event.name}-${event.eventType}-${event.timestamp}`}
            >
              <p>Name:</p>
              <p className='self-end'>{event.name}</p>
              <p>Event Type:</p>
              <p className='seld-end  text-end'>{event.eventType}</p>
              <p>Amount:</p>
              <p className='seld-end text-end'>{event.amount}</p>
              <p>Timestamp:</p>
              <p className='seld-end'>{event.timestamp.toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default WeedTracker
