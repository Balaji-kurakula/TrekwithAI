import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlaceToVisit({ trip }) {
  const itinerary = trip?.tripData?.travelPlan?.itinerary;

  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="text-center text-gray-400 italic py-8">No places to visit in the itinerary.</div>
    );
  }

  return (
    <div className="py-12 px-4 md:px-10 bg-gradient-to-br from-white to-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">📍 Places to Visit</h2>

      <div className="space-y-12">
        {itinerary.map((day, dayIndex) => (
          <div key={dayIndex} className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-700 border-l-4 border-blue-500 pl-4">
              Day {day.day}
            </h3>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {day.plan.map((place, idx) => (
                <PlaceCardItem key={idx} place={place} />
              ))}
            </div>
          </div>))}
      </div>
    </div>
  );
}

export default PlaceToVisit;
