export const SelectTravelsList = [
  {
    id: 1,
    title: 'Just Me',
    description: 'Exploring solo adventures',
    icon: '🧍‍♂️',
    people: '1',
  },
  {
    id: 2,
    title: 'With Family',
    description: 'A trip with your loved ones',
    icon: '👨‍👩‍👧‍👦',
    people: '2–5',
  },
  {
    id: 3,
    title: 'With Friends',
    description: 'Fun and memories with friends',
    icon: '🧑‍🤝‍🧑',
    people: '2–10',
  },
  {
    id: 4,
    title: 'With Colleagues',
    description: 'A group trip with colleagues',
    icon: '💼',
    people: '2–20',
  },
  {
    id: 5,
    title: 'With Partner',
    description: 'A romantic getaway for two',
    icon: '❤️',
    people: '2',
  }
];


export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Budget',
    description: 'Affordable and essential experiences',
    icon: '💸',
  },
  {
    id: 2,
    title: 'Standard',
    description: 'Balanced comfort and cost',
    icon: '💰',
  },
  {
    id: 3,
    title: 'Luxury',
    description: 'Premium travel experience',
    icon: '👑',
  },
];


export const AI_PROMPT = `Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} person with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format`;