'use client'
import React, { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

const Page = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const supabase = createClient()

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await supabase.auth.signInWithPassword({
      email: username,
      password: password
    })
    console.log({ response })
  }

  return (
    <div className='min-h-screen flex flex-col items-center gap-8 bg-gray-800 text-gray-200'>
      <h1 className='text-4xl'>Login</h1>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            className='bg-gray-700 text-gray-200 rounded p-2'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            className='bg-gray-700 text-gray-200 rounded p-2'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className='bg-gray-500 text-gray-200 rounded p-2' type='submit'>
          Login
        </button>
      </form>
    </div>
  )
}

export default Page