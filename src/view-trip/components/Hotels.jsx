import React from 'react';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
  const hotels = trip?.tripData?.travelPlan?.hotelOptions;

  if (!hotels || hotels.length === 0) {
    return (
      <div className="text-center text-gray-400 italic">No hotels found for this destination.</div>
    );
  }

  return (
    <div className="py-10 px-4 md:px-10 bg-gradient-to-br from-white to-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🏨 Hotel Recommendations</h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel, index) => (
          <HotelCardItem key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
