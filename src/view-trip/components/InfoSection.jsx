import React, { useEffect, useState } from 'react';
import { Calendar, Wallet, Users } from 'lucide-react'; // optional icons
import { Button } from '@/components/ui/button';
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';





function InfoSection({ trip }) {

  const [photourl, setPhotoUrl] = useState();

  useEffect(() => {
    trip&&GetPlacePhoto();
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




  const travelPlan = trip?.tripData?.travelPlan;

  if (!travelPlan) return null;

  return (
    <div className="space-y-6">
      {/* Cover Image */}
      <img
        src={photourl}
        alt="Trip Cover"
        className="w-full h-[300px] object-cover rounded-xl"
      />

      {/* Trip Summary Info */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">
          {travelPlan?.location || 'Unknown Location'}
        </h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {/* Duration */}
          <div className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 rounded-full">
            <Calendar size={16} className="text-red-500" />
            <span>{travelPlan?.duration || 'N/A'}</span>
          </div>

          {/* Budget */}
          <div className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 rounded-full">
            <Wallet size={16} className="text-yellow-500" />
            <span>{travelPlan?.budget || 'N/A'} Budget</span>
          </div>

          {/* Group Size */}
          <div className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 rounded-full">
            <Users size={16} className="text-blue-500" />
            <span>No. of Travelers: {travelPlan?.groupSize || 'N/A'}</span>
          </div>

          <Button><IoIosSend /></Button>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
