import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlaceToVisit from '../components/PlaceToVisit';

function Viewtrip() {

  const tripId= useParams();

  const [trip,settrip] = useState({});

 useEffect(() => {
  if (tripId) getTripDetails();
}, [tripId]);

const getTripDetails = async () => {
  const docRef = doc(db, 'AITrips', tripId.tripId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    settrip(docSnap.data());
  } else {
    console.log("No such document!");
  }
};



  return (
    <div className='w-full h-full flex flex-col items-center justify-center p-10 md:p-20 gap-10 lg:p-20 xl:p-30'>
      {/* Information Section */}
      <InfoSection  trip={trip}/>
      {/* Recommended Hotels */}
      <Hotels trip={trip} />
      {/* Daily plan */}
      <PlaceToVisit trip={trip} />
    </div>
  )
}

export default Viewtrip
