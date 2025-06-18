import axios from "axios";

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

export const GetPlaceDetails = (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-API-Key': import.meta.env.VITE_GOOGLE_API_KEY,
      'X-Goog-FieldMask': 'places.photos,places.displayName,places.id',
    },
  };

  return axios.post(BASE_URL, data, config);
};


export const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key='+ import.meta.env.VITE_GOOGLE_API_KEY; 