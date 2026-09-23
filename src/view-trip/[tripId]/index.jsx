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
    <main className='mx-auto max-w-7xl px-5 py-10 sm:px-10 lg:px-16 lg:py-14'>
     {/*Information Section*/}   
     <InfoSection trip={trip}/>

     {/* Hotel Recommendations */}
     <Hotels trip={trip}/>
     {/* Itinery */}
     <PlacesToVisit trip={trip}/>
    {/* Footer */}
    </main>
  )
}

export default ViewTrip