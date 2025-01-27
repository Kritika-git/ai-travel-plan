import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';

function ViewTrip() {
    const {tripId}=useParams();
    const[trip,setTrip]=useState();

    useEffect(()=>{
        tripId && GetTripData();
},[tripId])


    const GetTripData=async()=>{
        const docRef=doc(db,'AITrips',tripId);
        const docSnap=await getDoc(docRef);
        if(docSnap.exists()){
            console.log("Documnet:",docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("No such Documnet")
            toast("No trip found")
        }
    }


  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
     {/*Information Section*/}   
     <InfoSection trip={trip}/>

     {/* Hotel Recommendations */}
    <Hotels trip={trip}/>
     {/* Itinery */}
     <PlacesToVisit trip={trip}/>
    {/* Footer */}
    </div>
  )
}

export default ViewTrip