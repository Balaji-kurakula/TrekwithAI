import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {


  const [photourl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.destination?.label,
    };

    try {
      const result = await GetPlaceDetails(data);
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', result.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    } catch (err) {
      console.error("API Error:", err);
    }
  };






  return (
    <Link to={`/view-trip/${trip?.id}`} className='w-full h-full p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
      <div>
        <img src={photourl ? photourl : '/placeholder.jpeg'} />
        <div>
          <h2>{trip?.userSelection?.destination?.label}</h2>
          <h2>{trip?.userSelection?.noofdays} days trip with {trip?.userSelection?.budget} budget</h2>
        </div>
      </div>
    </Link>
  )
}

export default UserTripCardItem;
