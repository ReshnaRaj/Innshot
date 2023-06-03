import React from 'react'

const Headerr = ({name}) => {
  return (
     <div className='flex-1'>
      <header className="bg-white p-4 shadow-md">
          <h2 className="text-2xl font-bold">{name}</h2>
        </header>
      </div>
  )
}

export default Headerr