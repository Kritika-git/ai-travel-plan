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
    <section className="mt-12">
      <div className="mb-8 border-b border-border pb-4">
        <h2 className="text-2xl font-semibold tracking-tight">The itinerary</h2>
      </div>
      {itineraryEntries.map(([day, details], index) => (
        <div key={index} className="mb-14 grid gap-6 md:grid-cols-[120px_1fr]">
          <h3 className="top-8 h-fit text-xl font-semibold text-primary md:sticky">
            Day {String(index + 1).padStart(2, "0")}
            <span className="mt-1 block text-xs font-sans font-medium uppercase tracking-wider text-muted-foreground">{details?.day_title || ""}</span>
          </h3>
          <div className="relative border-l border-border pl-6">
            {details?.activities?.map((activity, idx) => (
              <PlaceCardItem key={idx} activity={activity} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default PlacesToVisit;
