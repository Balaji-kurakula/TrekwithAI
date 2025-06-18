import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-9'>
      <h1 className='font-extrabold text-[50px] flex flex-col items-center gap-0 h-40 -mt-10 justify-start'>
        <span className='text-blue-600'>Discover Your Next Adventure with Al:</span>
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className='text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
      <Link to={'/create-trip'}> 
        <Button >Get Started, It's Free</Button>
      </Link>
    </div>
  )
}

export default Hero
