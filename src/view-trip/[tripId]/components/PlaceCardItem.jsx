import React, { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function PlaceCardItem({ activity }) {
  const [photoUrl, setPhotoUrl] = useState("/placeholder.jpg"); // Default placeholder

  useEffect(() => {
    activity && fetchPlacePhoto();
  }, [activity]);

  const fetchPlacePhoto = async () => {
    try {
      const data = { textQuery: activity.place_name };
      const response = await GetPlaceDetails(data);
      const photoReference = response?.data?.places?.[0]?.photos?.[0]?.name;
      

      if (photoReference) {
        const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoReference);
        setPhotoUrl(photoUrl);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  return (
    <a
      href={"https://www.google.com/maps/search/?api=1&query=" + activity.place_name}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col shadow-md rounded-lg p-4 hover:scale-105 transition-all cursor-pointer h-full"
    >
      <img
        src={photoUrl}
        alt={activity.place_name}
        className="w-full h-40 object-cover rounded-lg"
      />
      <div className="flex flex-col justify-between flex-grow mt-4">
        <h4 className="font-bold text-lg text-gray-800">{activity.place_name}</h4>
        <p className="text-sm text-gray-600 mt-2">{activity.place_details}</p>
        <div className="mt-3">
          <p className="text-sm text-gray-700">
            <span className="font-medium text-gray-700">💰</span> {activity.ticket_pricing}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">🕒</span> {activity.time_travel_from_prev}
          </p>
          {activity.best_time_to_visit && (
            <p className="text-sm mt-2 text-yellow-700 bg-yellow-100 p-2 rounded-lg">
              Best Time to Visit: {activity.best_time_to_visit}
            </p>
          )}
        </div>
      </div>
    </a>
  );
}

export default PlaceCardItem;
