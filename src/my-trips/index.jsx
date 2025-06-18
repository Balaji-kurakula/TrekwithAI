import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { User } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {

  const navigation = useNavigate();

  const [usertrips, setuserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, [])

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigation('/');
      return;
    }
    const q = query(collection(db, "AITrips"), where("user.email", "==", user.email));

    const querySnapshot = await getDocs(q);
        setuserTrips([]);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setuserTrips(prevTrips => [...prevTrips, doc.data()]);
    });
  }
  
   return (
      <div className='w-full h-full p-4'>
        <h1>my trips</h1>
        <h2>kdshbgvjfgn</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {usertrips.length>0?usertrips.map((trip, index) => (
            <UserTripCardItem trip={trip} />
          )):[1,2,3,4,5,6].map((Trip, index) => (<div key={index} className='w-full h-full p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center height-[200px]'>
          </div>
          ))
          }
        </div>
      </div>
    )

}


  export default MyTrips
