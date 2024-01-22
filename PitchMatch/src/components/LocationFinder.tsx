"use client";
import { useState } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    MapMouseEvent, // Import the MapMouseEvent type
} from '@vis.gl/react-google-maps';

export function LocationFinder() {
    const initialPosition = { lat: 60.76696785977024, lng: 11.075835828837834 };
    const [markerPosition, setMarkerPosition] = useState(initialPosition);
    const [address, setAddress] = useState('');

    const handleMapClick = (event: MapMouseEvent) => {
        if (event.detail && event.detail.latLng) {
            const clickedPosition = {
                lat: event.detail.latLng.lat,
                lng: event.detail.latLng.lng,
            };

            setMarkerPosition(clickedPosition);
            getAddressFromCoordinates(clickedPosition);
        }
    };

    const getAddressFromCoordinates = async (coordinates: { lat: number; lng: number }) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&result_type=street_address&key=AIzaSyCGCRxrgJ4nKcTNhTaXk3p0izYu_nes3qg`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch address");
            }

            const data = await response.json();

            if (data.results && data.results.length > 0) {
                setAddress(data.results[0].formatted_address);
            } else {
                setAddress("Address not found");
            }
        } catch (error) {
            console.error("Error fetching address:", error);
            setAddress("Error fetching address");
        }
    };

    return (
        <APIProvider apiKey='AIzaSyCGCRxrgJ4nKcTNhTaXk3p0izYu_nes3qg'>
            <div style={{ height: 350, width: 800 }}>
                <Map
                    zoom={18}
                    center={initialPosition}
                    mapId={'9741a1a12a9f0608'}
                    onClick={handleMapClick}
                >
                    <AdvancedMarker position={markerPosition}>
                        <Pin background={"green"} borderColor={"darkGreen"} glyphColor={"lightGreen"} />
                    </AdvancedMarker>
                </Map>
            </div>
            <p>Lat: {markerPosition.lat}, Lng: {markerPosition.lng}</p>
            <p>Address: {address}</p>
        </APIProvider>
    );
}