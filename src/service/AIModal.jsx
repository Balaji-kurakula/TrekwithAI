import { GoogleGenAI } from "@google/genai";


export const ChatSession = async (userPrompt) => {
    const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_AI_API_KEY,
    });

    const config = {
        thinkingConfig: {
            thinkingBudget: -1,
        },
        responseMimeType: 'application/json',
    };

    const model = 'gemini-2.5-pro';
    
    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: userPrompt,
                },
            ],
        },
        {
      role: 'model',
      parts: [
        {
          text: `**Planning Vegas Itinerary**

I'm currently structuring a detailed 3-day Las Vegas itinerary for a couple on a budget, formatted as a single JSON object. Key considerations include cost-effective activities, transportation, dining options, and accommodation strategies to minimize expenses. I'm focusing on balancing iconic Vegas experiences with budget-friendly alternatives.


**Drafting Las Vegas Options**

I've started building the JSON structure and identified key sections: hotels, itinerary, and activities. Now, I'm focusing on populating the hotel list with budget-friendly options, including estimated prices, descriptions, and representative images. Next, I'll structure the itinerary itself, ensuring a balance of cost-effective activities and iconic Vegas experiences within each day's plan.


**Refining Budget Itinerary**

I'm now focusing on filling out the "dailyPlans" array in my JSON object. I'm researching free or low-cost activities like the Bellagio Fountains, the Fall of Atlantis Show, and exploring Fremont Street. I'm also carefully structuring the day's events to minimize travel time between locations, ensuring a smooth and efficient itinerary for the couple. I'm also starting to flesh out the descriptions of each place.


**Outlining Budget-Friendly Activities**

I've established a structure for the JSON output and am now focused on curating budget-friendly activities and locations for the couple's itinerary. I'm prioritizing free experiences like the "Welcome to Fabulous Las Vegas" sign and the Bellagio Fountains, and evaluating cost-effective dining options. I'm aiming to create a balanced itinerary that offers iconic Las Vegas experiences within a reasonable budget.


**Developing Budget Hotel Choices**

I'm now prioritizing the "Hotel Options" section. I've compiled a list of budget-friendly hotels, gathering addresses, estimated price ranges per night, coordinates, representative images, ratings, and concise descriptions to highlight their value for a couple. This includes places like Flamingo, The LINQ, Excalibur, and some downtown options, ensuring a balance between location and cost-effectiveness.


**Developing Preliminary Structure**

I've started translating my pre-planning into a JSON object structure. I'm focusing on defining the nested arrays and objects for hotels, daily plans, and activities. The initial structure is set, and I'm ready to populate it with specific data. I'm prioritizing accuracy for hotel details and activity descriptions.


**Finalizing JSON Structure**

I've completed defining the structure of the JSON output, including the "hotelOptions" array and the "itinerary" array of daily plans. Within each daily plan, activities are structured with necessary details. I'm prioritizing accuracy for location coordinates and descriptions. Now, I'm ready to populate the data.


**Constructing the JSON Structure**

I've completed my initial research, including gathering necessary data on hotels, activities, and attractions. I'm now transitioning into the coding phase, structuring the JSON object with the "hotelOptions" array and the "itinerary" array of daily plans, including a plan for each day. I'm focusing on ensuring accuracy in my data and refining the descriptions and details. I'm prepared to move on to filling out the data.


**Refining the JSON Structure**

I've completed my initial research, including gathering necessary data on hotels, activities, and attractions. I'm now transitioning into the coding phase, structuring the JSON object with the "hotelOptions" array and the "itinerary" array of daily plans, including a plan for each day. I'm focusing on ensuring accuracy in my data and refining the descriptions and details. I'm prepared to move on to filling out the data.


`,
        },
        {
          text: `\`\`\`json
{
  "travelPlan": {
    "location": "Las Vegas",
    "duration": "3 Days",
    "theme": "Couple on a Cheap Budget",
    "hotelOptions": [
      {
        "hotelName": "Flamingo Las Vegas Hotel & Casino",
        "hotelAddress": "3555 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
        "price": "Approximately $40 - $150 per night (Varies greatly by season and day of the week)",
        "hotelImageUrl": "https://images.pexels.com/photos/2227775/pexels-photo-2227775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "geoCoordinates": {
          "latitude": 36.1162,
          "longitude": -115.1706
        },
        "rating": 3.5,
        "description": "A classic, centrally-located hotel on the Strip with a vibrant, retro vibe. Its main draw for budget travelers is its often competitive pricing, central location, and the beautiful, free-to-visit Flamingo Wildlife Habitat. A great base for exploring the Strip on foot."
      },
      {
        "hotelName": "The LINQ Hotel + Experience",
        "hotelAddress": "3535 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
        "price": "Approximately $50 - $170 per night (Modern option, prices can fluctuate)",
        "hotelImageUrl": "https://images.pexels.com/photos/17286498/pexels-photo-17286498/free-photo-of-the-linq-hotel-in-las-vegas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "geoCoordinates": {
          "latitude": 36.1176,
          "longitude": -115.1712
        },
        "rating": 4.0,
        "description": "Targeted at a younger crowd, The LINQ offers modern, compact rooms and an unbeatable central location. It's connected to the lively LINQ Promenade, putting dining and entertainment options right at your doorstep. Look for deals, as it can be a great value."
      },
      {
        "hotelName": "Excalibur Hotel & Casino",
        "hotelAddress": "3850 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
        "price": "Approximately $30 - $120 per night (Often one of the cheapest on the Strip)",
        "hotelImageUrl": "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "geoCoordinates": {
          "latitude": 36.1000,
          "longitude": -115.1755
        },
        "rating": 3.0,
        "description": "The castle-themed Excalibur is a great entry-level option for staying on the Strip. While the property is older, the rooms are clean and the prices are hard to beat. It's connected by a free tram to Luxor and Mandalay Bay, making it easy to explore the south end of the Strip."
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "theme": "South Strip Exploration & Iconic Free Shows",
        "plan": [
          {
            "placeName": "Welcome to Fabulous Las Vegas Sign",
            "placeDetails": "Start your trip with a classic photo opportunity. This iconic sign is a must-see for first-time visitors. There's usually a line for photos, but it moves quickly. It's free and captures the quintessential Vegas spirit.",
            "placeImageUrl": "https://images.pexels.com/photos/3225529/pexels-photo-3225529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "geoCoordinates": {
              "latitude": 36.0820,
              "longitude": -115.1728
            },
            "ticketPricing": "Free",
            "rating": 4.5,
            "bestTimeToVisit": "Morning (10:00 AM - 12:00 PM) to avoid the worst heat and crowds.",
            "travelTime": "N/A (Starting point of the day)"
          },
          {
            "placeName": "Explore South Strip Casinos (Excalibur, Luxor, New York-New York)",
            "placeDetails": "Walk north from the Vegas sign and explore the unique architecture of the south Strip. Wander through the castle halls of Excalibur, see the pyramid and sphinx at Luxor, and enjoy the replica cityscape at New York-New York. It's all free to look around.",
            "placeImageUrl": "https://images.pexels.com/photos/3731130/pexels-photo-3731130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "geoCoordinates": {
              "latitude": 36.0986,
              "longitude": -115.1762
            },
            "ticketPricing": "Free",
            "rating": 4.0,
            "bestTimeToVisit": "Afternoon (1:00 PM - 4:00 PM)",
            "travelTime": "Approx. 20-25 minute walk from the Las Vegas Sign"
          },
          {
            "placeName": "Bellagio Conservatory & Botanical Gardens",
            "placeDetails": "A stunning and completely free attraction inside the Bellagio Hotel. The conservatory features elaborate floral displays that change with the seasons. It's a peaceful and romantic escape from the casino floor.",
            "placeImageUrl": "https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "geoCoordinates": {
              "latitude": 36.1132,
              "longitude": -115.1765
            },
            "ticketPricing": "Free",
            "rating": 4.8,
            "bestTimeToVisit": "Evening (6:00 PM - 7:00 PM)",
            "travelTime": "Approx. 20-25 minute walk from New York-New York"
          },
          {
            "placeName": "Fountains of Bellagio Show",
            "placeDetails": "The most iconic free show in Las Vegas. A magnificent spectacle of water, light, and music. Shows run every 30 minutes in the afternoon and every 15 minutes in the evening. Find a spot along the rail for the best view.",
            "placeImageUrl": "https://images.pexels.com/photos/3472690/pexels-photo-3472690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "geoCoordinates": {
              "latitude": 36.1126,
              "longitude": -115.1746
            },
            "ticketPricing": "Free",
            "rating": 4.9,
            "bestTimeToVisit": "Night (After 8:00 PM for more frequent shows)",
            "travelTime": "Approx. 2 minute walk from the Bellagio Conservatory"
          }
        ]
      },
      {
        "day": 2,
        "theme": "Center Strip & Downtown Fremont Street",
        "plan": [
          {
            "placeName": "Flamingo Wildlife Habitat",
            "placeDetails": "A serene paradise located on the grounds of the Flamingo hotel. This free attraction is home to a flock of Chilean flamingos, as well as swans, ducks, turtles, and exotic birds. It's a wonderful, relaxing way to start the day.",
            "placeImageUrl": "https://images.pexels.com/photos/1296203/pexels-photo-1296203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "geoCoordinates": {
              "latitude": 36.1167,
              "longitude": -115.1704
            },
            "ticketPricing": "Free",
            "rating": 4.4,
            "bestTimeToVisit": "Morning (9:00 AM - 11:00 AM) when animals are active.",
            "travelTime": "N/A (Starting point of the day)"
          },
          {
            "placeName": "The LINQ Promenade",
            "placeDetails": "An open-air shopping, dining, and entertainment district. It's a fun place to walk, people-watch, and browse. While the High Roller observation wheel costs money, walking the promenade is free and has a great, energetic atmosphere.",
            "placeImageUrl": "https://images.pexels.com/photos/17286495/pexels-photo-17286495/free-photo-of-the-high-roller-in-las-vegas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "geoCoordinates": {
              "latitude": 36.1180,
              "longitude": -115.1700
            },
            "ticketPricing": "Free to walk around. High Roller ticket is approx. $25-40.",
            "rating": 4.5,
            "bestTimeToVisit": "Late Morning / Afternoon (11:00 AM - 2:00 PM)",
            "travelTime": "Approx. 5 minute walk from the Flamingo Wildlife Habitat"
          },
          {
            "placeName": "Grand Canal Shoppes at The Venetian",
            "placeDetails": "Transport yourselves to Venice, Italy. Stroll along the cobblestone walkways and canals, watch the gondolas float by, and enjoy the painted sky ceiling. It costs nothing to explore and offers amazing photo opportunities. You might catch a free 'Streetmosphere' performance.",
            "placeImageUrl": "https://images.pexels.com/photos/2845009/pexels-photo-2845009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "geoCoordinates": {
              "latitude": 36.1215,
              "longitude": -115.1697
            },
            "ticketPricing": "Free to browse. Gondola rides are extra.",
            "rating": 4.7,
            "bestTimeToVisit": "Afternoon (2:00 PM - 4:00 PM)",
            "travelTime": "Approx. 10-15 minute walk from The LINQ Promenade"
          },
          {
            "placeName": "Fremont Street Experience",
            "placeDetails": "Head to Downtown Las Vegas for a completely different vibe. This is 'Old Vegas'. The main attraction is the massive Viva Vision canopy light show. There are also free concerts on multiple stages, street performers, and much cheaper food and drinks than on the Strip. Take the 'Deuce' bus for a cheap transport option.",
            "placeImageUrl": "https://images.pexels.com/photos/2196611/pexels-photo-2196611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "geoCoordinates": {
              "latitude": 36.1706,
              "longitude": -115.1450
            },
            "ticketPricing": "Free",
            "rating": 4.6,
            "bestTimeToVisit": "Evening (After 6:00 PM for the light shows)",
            "travelTime": "Approx. 30-45 minute bus ride from the Strip"
          }
        ]
      },
      {
        "day": 3,
        "theme": "Unique Attractions & Lasting Impressions",
        "plan": [
          {
            "placeName": "Fall of Atlantis Show at The Forum Shops",
            "placeDetails": "Located inside the Forum Shops at Caesars Palace, this is a fun, animatronic show depicting the myth of Atlantis with fire, water, and talking statues. It's a classic, slightly kitschy Vegas show, and a great free thing to do indoors.",
            "placeImageUrl": "https://images.pexels.com/photos/15479905/pexels-photo-15479905/free-photo-of-fountain-in-the-forum-shops-at-caesars-palace.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "geoCoordinates": {
              "latitude": 36.1177,
              "longitude": -115.1747
            },
            "ticketPricing": "Free",
            "rating": 3.8,
            "bestTimeToVisit": "Show runs every hour, so check schedule. Aim for an early show (11:00 AM or 12:00 PM).",
            "travelTime": "N/A (Starting point of the day)"
          },
          {
            "placeName": "M&M's World and Hershey's Chocolate World",
            "placeDetails": "These multi-story candy stores are right next to each other and are a sensory overload in the best way. See the wall of M&M's in every color imaginable and the giant Statue of Liberty made of chocolate. You can spend a good hour exploring without buying anything.",
            "placeImageUrl": "https://images.pexels.com/photos/163016/colorful-sweet-candy-candy-shop-163016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "geoCoordinates": {
              "latitude": 36.1032,
              "longitude": -115.1729
            },
            "ticketPricing": "Free to enter",
            "rating": 4.2,
            "bestTimeToVisit": "Afternoon (1:00 PM - 3:00 PM)",
            "travelTime": "Approx. 15-20 minute walk from Caesars Palace"
          },
          {
            "placeName": "Window Shopping at The Shops at Crystals & The Cosmopolitan",
            "placeDetails": "Experience the high-end side of Vegas for free. The Shops at Crystals has stunning architecture and luxury storefronts. Then, walk into The Cosmopolitan hotel and find the Chandelier Bar – a multi-story bar built inside a giant chandelier. You don't have to buy a drink to admire its beauty.",
            "placeImageUrl": "https://images.pexels.com/photos/11094892/pexels-photo-11094892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "geoCoordinates": {
              "latitude": 36.1082,
              "longitude": -115.1751
            },
            "ticketPricing": "Free",
            "rating": 4.6,
            "bestTimeToVisit": "Late Afternoon (3:00 PM - 5:00 PM)",
            "travelTime": "Approx. 5-10 minute walk from M&M's World"
          },
          {
            "placeName": "Final Stroll and People-Watching on the Strip",
            "placeDetails": "For your last evening, take one final walk down the Strip at night. The sheer energy, the neon lights, and the diverse crowds are an attraction in itself. Grab a cheap slice of pizza or a hot dog from a street-side vendor and just soak it all in. It's the perfect, low-cost way to say goodbye to Vegas.",
            "placeImageUrl": "https://images.pexels.com/photos/1689945/pexels-photo-1689945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "geoCoordinates": {
              "latitude": 36.1147,
              "longitude": -115.1728
            },
            "ticketPricing": "Free",
            "rating": 4.5,
            "bestTimeToVisit": "Evening (After 7:00 PM)",
            "travelTime": "Just step outside your hotel or the last location"
          }
        ]
      }
    ]
  }
}
\`\`\``,
        },
      ],
        },
        {
          role: 'user',
          parts: [
            {
              text: `INSERT_INPUT_HERE`,
            },
          ],
        },
    ];


    const maxRetries = 3; // Maximum number of retries
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            const response = await ai.models.generateContentStream({
                model,
                config,
                contents,
            });
            let fullResponse = '';
            for await (const chunk of response) {
                fullResponse += chunk.text;
            }
            return fullResponse; 
        } catch (error) {
            if (error.code === 503) {
                attempt++;
                console.warn(`Attempt ${attempt} failed: ${error.message}. Retrying...`);
                await new Promise(resolve => setTimeout(resolve, 2000)); 
            } else {
                throw error; 
            }
        }
    }
    throw new Error('Max retries reached. Please try again later.');
};
