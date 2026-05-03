import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MassagesContainer from '../../components/massages/MassagesContainer'
const Home = () => {
  return (
    <div className='flex sm:h-112.5 md:h-137.5 rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar />
      <MassagesContainer />
    </div>
  )
}

export default Home