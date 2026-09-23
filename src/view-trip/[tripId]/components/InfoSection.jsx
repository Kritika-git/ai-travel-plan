import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Share2 } from "lucide-react";


function InfoSection({trip}) {

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
    <section>
        
        <div className="group relative overflow-hidden rounded-3xl">
          <img src={photoUrl?photoUrl:"/placeholder.jpg"} alt={trip?.userSelection?.location?.label || "Trip destination"} className='h-[360px] w-full object-cover transition-transform duration-1000 group-hover:scale-[1.03] sm:h-[480px]'/>
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />
          <h2 className="absolute bottom-7 left-6 max-w-3xl text-4xl font-semibold leading-tight text-primary-foreground sm:bottom-10 sm:left-10 sm:text-6xl">{trip?.userSelection?.location?.label}</h2>
        </div>

        <div className='flex flex-col items-start justify-between gap-5 py-6 sm:flex-row sm:items-center'>

       
        <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.16em] text-muted-foreground'>
          <span><strong className="mr-1 font-medium text-foreground">{trip?.userSelection?.noOfDays}</strong> Days</span>
          <span className="h-1 w-1 rounded-full bg-primary" />
          <span><strong className="mr-1 font-medium text-foreground">{trip?.userSelection?.budget}</strong> Budget</span>
          <span className="h-1 w-1 rounded-full bg-primary" />
          <span><strong className="mr-1 font-medium text-foreground">{trip?.userSelection?.noOfPeople}</strong> Travellers</span>
                
            </div>
        <Button variant="ghost" size="icon" title="Share trip" aria-label="Share trip"><Share2 className="h-5 w-5" /></Button>
        </div>
    </section>
  )
}

export default InfoSection