import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {
    const[photoUrl,setPhotoUrl]=useState();
        useEffect(()=>{
            trip&&GetPlacePhoto();
        },[trip])
      const GetPlacePhoto=async()=>{
        const data={
            textQuery:trip?.userSelection?.location?.label
        }
        const result=await GetPlaceDetails(data).then(resp=>{
            
            const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[1].name)
            setPhotoUrl(PhotoUrl);
    
        })
      }
  return (
    <Link to={'/view-trip/'+trip?.id} className='group text-foreground'>
    <div className='overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl'>
      <img src={photoUrl?photoUrl:"/placeholder.jpg"} alt={trip?.userSelection?.location?.label} className='h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-105'/>
      <div className="p-4">
        <h2 className='font-bold text-lg'>
          {trip?.userSelection?.location?.label}  
          
        </h2>
        <h2 className='text-sm text-muted-foreground'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget for {trip?.userSelection?.noOfPeople}.</h2>
        </div>
       
    </div>
    </Link>
  )
}

export default UserTripCardItem