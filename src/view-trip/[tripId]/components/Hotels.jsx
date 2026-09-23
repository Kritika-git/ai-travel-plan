import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

function Hotels({trip}) {
  return (
    <section className="mt-8">
      <div className="mb-5 flex items-baseline justify-between border-b border-border pb-4">
        <h2 className='text-2xl font-semibold tracking-tight'>Stay nearby</h2>
        <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Curated hotels</span>
      </div>
      <div className='flex snap-x gap-5 overflow-x-auto pb-4'> 
        {trip?.tripData?.hotel_options?.map((hotel,index)=>(
            <HotelCardItem key={index} hotel={hotel}/>
                
            ))}
        </div>


    </section>
  )
}

export default Hotels