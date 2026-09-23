import React, { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { Clock3, Wallet } from "lucide-react";

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
      className="group relative mb-8 grid cursor-pointer gap-5 border-b border-border pb-8 last:mb-0 last:border-0 last:pb-0 md:grid-cols-[minmax(180px,38%)_1fr]"
    >
      <img
        src={photoUrl}
        alt={activity.place_name}
        className="aspect-video h-auto w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="flex flex-grow flex-col justify-between py-1">
        <h4 className="text-xl font-semibold">{activity.place_name}</h4>
        <p className="mt-2 text-sm text-muted-foreground">{activity.place_details}</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
            <Wallet className="h-4 w-4 text-primary" /> {activity.ticket_pricing}
          </p>
          <p className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
            <Clock3 className="h-4 w-4 text-primary" /> {activity.time_travel_from_prev}
          </p>
          {activity.best_time_to_visit && (
            <p className="mt-2 w-full text-xs uppercase tracking-wide text-warning">
              Best Time to Visit: {activity.best_time_to_visit}
            </p>
          )}
        </div>
      </div>
    </a>
  );
}

export default PlaceCardItem;
