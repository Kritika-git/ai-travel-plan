// import React from "react";
// import { Link } from "react-router-dom";

// function PlacesToVisit({ trip }) {
//   // Safely access the itinerary and sort the days
//   const itineraryEntries = trip?.tripData?.itinerary
//     ? Object.entries(trip.tripData.itinerary).sort(([dayA], [dayB]) =>
//         dayA.localeCompare(dayB, undefined, { numeric: true })
//       )
//     : [];

//   return (
//     <div>
//       <h2 className="font-bold text-2xl mb-5 text-gray-800">Places to Visit</h2>
//       {itineraryEntries.map(([day, details], index) => (
//         <div key={index} className="mb-10">
//           <h3 className="font-bold text-lg mb-4 text-gray-700">
//             {day.replace("day_", "Day ")}: {details?.day_title || ""}
//           </h3>
//           <div className="grid md:grid-cols-2 gap-6">
//             {details?.activities?.map((activity, idx) => (
//               <ActivityCard key={idx} activity={activity} />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// function ActivityCard({ activity }) {
//   return (
//     <Link to={'https://www.google.com/maps/search/?api=1&query=' + activity.place_name} target='_blank'>
//       <div className="flex flex-col shadow-md rounded-lg p-4 hover:scale-105 transition-all cursor-pointer h-full">
//         <img
//           src="/placeholder.jpg"
//           alt={activity.place_name}
//           className="w-full h-40 object-cover rounded-lg"
//         />
//         <div className="flex flex-col justify-between flex-grow mt-4">
//           <h4 className="font-bold text-lg text-gray-800">{activity.place_name}</h4>
//           <p className="text-sm text-gray-600 mt-2">{activity.place_details}</p>
//           <div className="mt-3">
//             <p className="text-sm text-gray-700">
//               <span className="font-medium text-gray-700">💰</span>{" "}
//               {activity.ticket_pricing}
//             </p>
//             <p className="text-sm text-gray-700">
//               <span className="font-medium">🕒</span>{" "}
//               {activity.time_travel_from_prev}
//             </p>
//             {activity.best_time_to_visit && (
//               <p className="text-sm mt-2 text-yellow-700 bg-yellow-100 p-2 rounded-lg">
//                 Best Time to Visit: {activity.best_time_to_visit}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default PlacesToVisit;
import React from "react";
import { Link } from "react-router-dom";
import PlaceCardItem from "./PlaceCardItem"; // Import the new PlaceCardItem component

function PlacesToVisit({ trip }) {
  // Safely access the itinerary and sort the days
  const itineraryEntries = trip?.tripData?.itinerary
    ? Object.entries(trip.tripData.itinerary).sort(([dayA], [dayB]) =>
        dayA.localeCompare(dayB, undefined, { numeric: true })
      )
    : [];

  return (
    <div>
      <h2 className="font-bold text-2xl mb-5 text-gray-800">Places to Visit</h2>
      {itineraryEntries.map(([day, details], index) => (
        <div key={index} className="mb-10">
          <h3 className="font-bold text-lg mb-4 text-gray-700">
            {day.replace("day_", "Day ")}: {details?.day_title || ""}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {details?.activities?.map((activity, idx) => (
              <PlaceCardItem key={idx} activity={activity} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlacesToVisit;
