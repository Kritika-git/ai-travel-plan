// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } = require("@google/generative-ai");

import { GoogleGenerativeAI } from "@google/generative-ai";

  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location: Las Vegas for 3 Days for Couple with Cheap budget.Give me Hotel options list with Hotelname, Hotel address, Hotel image URL, Hotel pricing, rating, geo coordinates , description and suggest itinarary with Place Name,Place details, place image url, geo coordinates, ticket pricing, rating, time travel each of location for 3 days with each day plan and best time to visit in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"trip_name\": \"Las Vegas Budget Getaway for Couples\",\n  \"location\": \"Las Vegas, Nevada\",\n  \"duration\": \"3 Days\",\n  \"budget\": \"Cheap\",\n    \"travelers\": \"Couple\",\n  \"hotel_options\": [\n    {\n      \"hotel_name\": \"Circus Circus Hotel, Casino & Theme Park\",\n      \"hotel_address\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"hotel_image_url\": \"https://example.com/circus_circus_hotel.jpg\",\n      \"hotel_pricing\": \"$40 - $80 per night\",\n      \"rating\": 3.5,\n      \"geo_coordinates\": {\n        \"latitude\": 36.1379,\n        \"longitude\": -115.1654\n      },\n      \"description\": \"A classic Las Vegas hotel with a circus theme, offering affordable rooms and family-friendly entertainment. Great for budget travelers looking for a fun experience.\"\n    },\n    {\n      \"hotel_name\": \"Excalibur Hotel & Casino\",\n      \"hotel_address\": \"3850 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"hotel_image_url\": \"https://example.com/excalibur_hotel.jpg\",\n       \"hotel_pricing\": \"$50 - $90 per night\",\n      \"rating\": 3.8,\n      \"geo_coordinates\": {\n        \"latitude\": 36.0973,\n        \"longitude\": -115.1710\n      },\n      \"description\": \"A medieval-themed hotel on the south end of the strip, offering budget-friendly rooms and a variety of dining and entertainment options.\"\n    },\n    {\n      \"hotel_name\": \"OYO Hotel and Casino Las Vegas\",\n       \"hotel_address\":\"115 E Tropicana Ave, Las Vegas, NV 89109\",\n      \"hotel_image_url\": \"https://example.com/oyo_hotel.jpg\",\n      \"hotel_pricing\": \"$35 - $75 per night\",\n      \"rating\": 3.0,\n      \"geo_coordinates\": {\n        \"latitude\": 36.1025,\n         \"longitude\": -115.1723\n      },\n        \"description\":\"A budget-friendly hotel offering basic rooms and a casino, located near the south end of the strip.\"\n\n    }\n  ],\n  \"itinerary\": {\n    \"day_1\": {\n       \"theme\":\"Exploring the Strip (South)\",\n      \"best_time_to_visit\":\"Late afternoon to evening for cooler temperatures\",\n      \"activities\": [\n        {\n          \"place_name\": \"Welcome to Fabulous Las Vegas Sign\",\n          \"place_details\": \"Iconic sign at the south end of the Strip. Perfect for photos.\",\n           \"place_image_url\": \"https://example.com/welcome_to_las_vegas_sign.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 36.0827,\n            \"longitude\": -115.1726\n          },\n          \"ticket_pricing\": \"Free\",\n          \"rating\": 4.5,\n           \"time_travel_from_prev\":\"10-15 min (Depending on hotel location)\"\n        },\n         {\n          \"place_name\": \"Excalibur Hotel & Casino\",\n           \"place_details\": \"Enjoy the free castle-themed experience, walk through the medieval-themed areas, maybe see a free show\",\n           \"place_image_url\": \"https://example.com/excalibur_hotel.jpg\",\n           \"geo_coordinates\": {\n            \"latitude\": 36.0973,\n            \"longitude\": -115.1710\n          },\n          \"ticket_pricing\": \"Free to enter, shows and dining extra\",\n          \"rating\": 4.0,\n             \"time_travel_from_prev\":\"10 min walk\"\n        },\n        {\n          \"place_name\": \"Bellagio Conservatory & Botanical Gardens\",\n          \"place_details\": \"Beautiful free botanical display that changes seasonally. Walk across the street and explore.\",\n           \"place_image_url\":\"https://example.com/bellagio_conservatory.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 36.1127,\n            \"longitude\": -115.1747\n          },\n          \"ticket_pricing\": \"Free\",\n          \"rating\": 4.7,\n           \"time_travel_from_prev\":\"15 min (walk + bus)\"\n        },\n         {\n          \"place_name\": \"Fountains of Bellagio\",\n          \"place_details\": \"Enjoy the free water show set to music at the Bellagio\",\n           \"place_image_url\":\"https://example.com/fountains_of_bellagio.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 36.1125,\n            \"longitude\": -115.1744\n          },\n           \"ticket_pricing\":\"Free\",\n           \"rating\": 4.8,\n             \"time_travel_from_prev\":\"5 min walk\"\n        },\n        {\n          \"place_name\":\"Walk the Strip at night\",\n           \"place_details\":\"Experience the vibrant atmosphere of the Las Vegas Strip at night. Enjoy free street performers, light shows, and the general atmosphere.\",\n            \"place_image_url\":\"https://example.com/night_strip.jpg\",\n             \"geo_coordinates\": {\n            \"latitude\": 36.1162,\n            \"longitude\": -115.1705\n          },\n           \"ticket_pricing\":\"Free\",\n           \"rating\": 4.5,\n           \"time_travel_from_prev\":\"10 min walk\"\n          }\n      ]\n    },\n    \"day_2\": {\n      \"theme\":\"Downtown Las Vegas & Fremont Experience\",\n      \"best_time_to_visit\": \"Evening for the Fremont Street light show.\",\n      \"activities\": [\n        {\n          \"place_name\": \"Fremont Street Experience\",\n          \"place_details\": \"A pedestrian mall with a light show on a giant canopy, free concerts, and street performers. Take the bus or car from the strip.\",\n           \"place_image_url\":\"https://example.com/fremont_street_experience.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 36.1706,\n            \"longitude\": -115.1400\n          },\n          \"ticket_pricing\": \"Free to enter, paid attractions within the area\",\n          \"rating\": 4.4,\n          \"time_travel_from_prev\":\"20 min drive or 30-40min bus from strip\"\n        },\n        {\n           \"place_name\": \"SlotZilla Zip Line\",\n           \"place_details\": \"Enjoy a zip line ride over Fremont Street. (Optional, paid activity if budget permits)\",\n           \"place_image_url\":\"https://example.com/slotzilla_zip_line.jpg\",\n             \"geo_coordinates\": {\n            \"latitude\": 36.1706,\n            \"longitude\": -115.1400\n           },\n          \"ticket_pricing\": \"$39-$59\",\n           \"rating\": 4.3,\n             \"time_travel_from_prev\":\"0 min walk\"\n        },\n         {\n          \"place_name\": \"Container Park\",\n          \"place_details\": \"Unique shopping and dining area constructed from shipping containers. Enjoy the architecture, street musicians, and free activities.\",\n           \"place_image_url\":\"https://example.com/container_park.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 36.1687,\n            \"longitude\": -115.1390\n           },\n          \"ticket_pricing\": \"Free to enter, food and shops extra\",\n          \"rating\": 4.2,\n           \"time_travel_from_prev\":\"5 min walk\"\n        },\n        {\n          \"place_name\": \"Downtown Las Vegas Murals\",\n          \"place_details\": \"Explore the vibrant street art scene throughout downtown Las Vegas.\",\n           \"place_image_url\":\"https://example.com/downtown_murals.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 36.1700,\n            \"longitude\": -115.1430\n           },\n          \"ticket_pricing\": \"Free\",\n          \"rating\": 4.0,\n            \"time_travel_from_prev\":\"10 min walk\"\n        }\n      ]\n    },\n    \"day_3\": {\n       \"theme\":\"Relaxation and Hidden Gems\",\n       \"best_time_to_visit\":\"Any time, avoid afternoon heat\",\n      \"activities\": [\n          {\n            \"place_name\":\"Explore your Hotel Amenities\",\n            \"place_details\":\"Spend the morning utilizing your hotel's amenities, such as swimming pools or games. Most hotels offer something free to their guests.\",\n             \"place_image_url\":\"https://example.com/hotel_amenities.jpg\",\n            \"geo_coordinates\": {\n             \"latitude\": 36.1379,\n              \"longitude\": -115.1654\n            },\n            \"ticket_pricing\":\"Free\",\n             \"rating\": 4.0,\n              \"time_travel_from_prev\":\"0 min walk\"\n\n          },\n          {\n          \"place_name\": \"The LINQ Promenade\",\n          \"place_details\": \"Enjoy the atmosphere of the LINQ promenade, with its shops, restaurants, and views of the High Roller observation wheel.\",\n           \"place_image_url\":\"https://example.com/linq_promenade.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 36.1168,\n            \"longitude\": -115.1690\n          },\n          \"ticket_pricing\": \"Free to enter, attractions and food extra\",\n          \"rating\": 4.3,\n          \"time_travel_from_prev\":\"15-20 min from hotel\"\n        },\n        {\n           \"place_name\": \"Take a free Tram or Bus ride\",\n           \"place_details\":\"Use the free tram systems or public bus systems to navigate parts of the Las Vegas Strip.\",\n            \"place_image_url\":\"https://example.com/free_tram.jpg\",\n            \"geo_coordinates\": {\n            \"latitude\": 36.1160,\n            \"longitude\": -115.1700\n          },\n             \"ticket_pricing\":\"Free\",\n            \"rating\":4.5,\n             \"time_travel_from_prev\":\"5 min walk\"\n        },\n           {\n          \"place_name\": \"Ethel M Chocolate Factory and Botanical Cactus Garden\",\n          \"place_details\": \"Enjoy free chocolate samples and walk through a beautiful cactus garden. A short taxi ride from the Strip\",\n           \"place_image_url\":\"https://example.com/ethel_m_chocolate.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 36.0676,\n            \"longitude\": -115.0900\n          },\n           \"ticket_pricing\":\"Free to enter, factory tours and chocolate purchases extra.\",\n           \"rating\": 4.4,\n            \"time_travel_from_prev\":\"20-30 min (Drive/Taxi) \"\n        },\n        {\n          \"place_name\": \"Departure\",\n          \"place_details\": \"Head to the airport for your departure\",\n            \"place_image_url\":\"https://example.com/airport_las_vegas.jpg\",\n          \"geo_coordinates\": {\n            \"latitude\": 36.0800,\n            \"longitude\": -115.1522\n          },\n             \"ticket_pricing\":\"Transportation cost varies\",\n              \"time_travel_from_prev\":\"15-20 min (drive/taxi)\"\n        }\n      ]\n    }\n  }\n}\n```"},
          ],
        },
      ],
    });
  
   