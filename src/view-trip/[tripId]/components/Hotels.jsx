import React from 'react'
import { Link } from 'react-router-dom'

function Hotels({trip}) {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'> 
            {trip?.tripData?.hotel_options?.map((hotel,index)=>(

                <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotel_name+','+hotel?.hotel_address} target='_blank'>
                
                
                <div className='hover:scale-105 transition-all cursor-pointer'>
                    <img src='/placeholder.jpg' className='rounded-xl'></img>
                    <div className='my-2 flex flex-col gap-2'>
                        <h2 className='font-medium text-black'>{hotel?.hotel_name}</h2>
                        <h2 className='text-xs text-gray-500'>📍{hotel?.hotel_address}</h2>
                        <h2 className='text-sm text-gray-700'>💰{hotel?.hotel_pricing}</h2>
                        <h2 className='text-sm text-gray-700'>⭐{hotel?.rating} stars</h2>
                    
                    </div>
                
                </div>
                </Link>
            ))}
        </div>


    </div>
  )
}

export default Hotels