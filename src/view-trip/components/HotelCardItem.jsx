import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';

function HotelCardItem({ hotel }) {



 const [photourl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel&&GetPlacePhoto();
  }, [hotel]);

 const GetPlacePhoto = async () => {
  const data = {
    textQuery: hotel?.hotelName,
  };

  try {
    const result = await GetPlaceDetails(data);
    const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', result.data.places[0].photos[3].name);
    setPhotoUrl(PhotoUrl);
  } catch (err) {
    console.error("API Error:", err);
  }
};





  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    hotel.hotelName + ' ' + hotel.hotelAddress
  )}`;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative rounded-2xl overflow-hidden shadow-xl bg-white/80 backdrop-blur border border-gray-200 transition-transform hover:-translate-y-1 hover:shadow-2xl"
    >
      <img
        src={photourl}
        alt={hotel.hotelName}
        className="w-full h-52 object-cover"
      />

      <div className="p-5 space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">{hotel.hotelName}</h3>
        <p className="text-gray-600 text-sm">{hotel.hotelAddress}</p>
        <p className="text-gray-500 text-sm line-clamp-3">{hotel.description}</p>

        <div className="flex justify-between items-center text-sm mt-4">
          <span className="text-yellow-500 font-medium">⭐ {hotel.rating}</span>
          <span className="text-green-600 font-semibold">{hotel.price}</span>
        </div>
      </div>
    </a>
  );
}

export default HotelCardItem;
