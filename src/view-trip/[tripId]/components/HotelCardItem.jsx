import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({ hotel }) {

 const[photoUrl,setPhotoUrl]=useState();
     useEffect(()=>{
         hotel&&GetPlacePhoto();
     },[hotel])

   const GetPlacePhoto=async()=>{
     const data={
         textQuery:hotel?.hotel_name
     }
     const result=await GetPlaceDetails(data).then(resp=>{
         
         const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[1].name)
         setPhotoUrl(PhotoUrl);
 
     })
   }   
  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.hotel_name +
        "," +
        hotel?.hotel_address
      }
      target="_blank"
    >
      <div className="group w-[260px] shrink-0 snap-start cursor-pointer transition-transform hover:-translate-y-1 sm:w-[300px]">
        <div className="overflow-hidden rounded-2xl">
          <img src={photoUrl?photoUrl:"/placeholder.jpg"} alt={hotel?.hotel_name} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"></img>
        </div>
        <div className="flex flex-col gap-1 border-b border-border py-4">
          <h2 className="font-semibold">{hotel?.hotel_name}</h2>
          <h2 className="truncate text-xs text-muted-foreground">{hotel?.hotel_address}</h2>
          <h2 className="text-xs uppercase tracking-wider text-muted-foreground">{hotel?.hotel_pricing} <span className="mx-1">·</span> {hotel?.rating} rating</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
