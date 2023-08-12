import React from 'react'
import Header from './components/header'
import Filter from './components/Filter'
import Card from './components/Card'
import SignUp from './components/SignUp'

export default function App() {
  return (
    <div className='relative'>
      <Header/>
      <Filter/>
      <Card/>
      <SignUp/>
    </div>
  )
}

