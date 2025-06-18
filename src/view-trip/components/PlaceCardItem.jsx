import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState(place.placeImageUrl); // fallback image

  useEffect(() => {
    if (place?.placeName) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName,
    };

    try {
      const result = await GetPlaceDetails(data);
      const photoRef = result?.data?.places?.[0]?.photos?.[3]?.name;

      if (photoRef) {
        const finalPhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoRef);
        setPhotoUrl(finalPhotoUrl);
      }
    } catch (err) {
      console.error('API Error:', err);
    }
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${place.placeName} ${place.geoCoordinates.latitude},${place.geoCoordinates.longitude}`
  )}`;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl hover:-translate-y-1 transition-transform border border-gray-200"
    >
      <img
        src={photoUrl?photoUrl:'/placeholder.jpeg'}
        alt={place.placeName}
        className="w-full h-52 object-cover group-hover:scale-105 transition-transform"
      />
      <div className="p-5 space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">{place.placeName}</h4>
        <p className="text-sm text-gray-600 line-clamp-3">{place.placeDetails}</p>
        <div className="flex justify-between text-sm pt-2">
          <span className="text-yellow-500 font-medium">⭐ {place.rating}</span>
          <span className="text-blue-600 font-semibold">{place.ticketPricing}</span>
        </div>
      </div>
    </a>
  );
}

export default PlaceCardItem;
