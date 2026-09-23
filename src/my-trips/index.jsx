import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {

    const navigation=useNavigation();
    const [userTrips,setUserTrips]=useState([]);
    useEffect(()=>{
        GetUserTrip();
    },[])
    const GetUserTrip=async()=>{
        const user=JSON.parse(localStorage.getItem('user'));
        
        if(!user){
            navigation('/');
            return;
        }
        setUserTrips([]);
        const q=query(collection(db,'AITrips'),where('userEmail','==',user?.email));
        const querySnapshot = await getDocs(q);
        setUserTrips([]);
    querySnapshot.forEach((doc) => {
 
  console.log(doc.id, " => ", doc.data());
  setUserTrips(prevVal=>[...prevVal,doc.data()]);
});
    }
  return (
    <main className='mx-auto max-w-6xl px-5 py-12 sm:px-10 lg:py-16'>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Your journeys</p>
      <h2 className='font-bold text-4xl tracking-tight'>My Trips</h2>

        <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>

          {userTrips?.length>0?userTrips.map((trip,index)=>(
            <UserTripCardItem trip={trip} key={index}/>
          ))
        :[1,2,3,4,5,6].map((item,index)=>(
          <div key={index} className='h-[280px] w-full animate-pulse rounded-2xl border border-border bg-muted'>

          </div>

        ))
        }
        </div>
    </main>
  )
}

export default MyTrips