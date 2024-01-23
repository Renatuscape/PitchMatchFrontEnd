"use client";
import { useState } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    MapMouseEvent, // Import the MapMouseEvent type
} from '@vis.gl/react-google-maps';
import { Button } from "@mui/material";

interface LocationFinderProps {
    onRegisterAddress: (address: string) => void;
    onLatitudeChange: (longitude: number) => void;
    onLongitudeChange: (latitude: number) => void;
}

export function LocationFinder({ onRegisterAddress, onLatitudeChange, onLongitudeChange }: LocationFinderProps) {
    const initialPosition = { lat: 60.76696785977024, lng: 11.075835828837834 };
    const [markerPosition, setMarkerPosition] = useState(initialPosition);
    const [mapCenter, setMapCenter] = useState(initialPosition);
    const [address, setAddress] = useState('');
    const [inputAddress, setInputAddress] = useState('');

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputAddress(event.target.value);
    };

    const handleGoToAddress = async () => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                    inputAddress
                )}&key=AIzaSyCGCRxrgJ4nKcTNhTaXk3p0izYu_nes3qg`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch coordinates for the entered address");
            }

            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                const newMarkerPosition = {
                    lat: location.lat,
                    lng: location.lng,
                };

                setMarkerPosition(newMarkerPosition);
                setAddress(data.results[0].formatted_address); // Update the address state here

                setMapCenter(newMarkerPosition);
            } else {
                setAddress("Address not found");
            }
        } catch (error) {
            console.error("Error fetching coordinates for the entered address:", error);
            setAddress("Error fetching coordinates for the entered address");
        }
    };

    const handleRegisterAddress = () => {
        onRegisterAddress(address);
        onLatitudeChange(markerPosition.lat);
        onLongitudeChange(markerPosition.lng);
    };

    return (
        <APIProvider apiKey='AIzaSyCGCRxrgJ4nKcTNhTaXk3p0izYu_nes3qg'>
            <div style={{ display: 'flex', margin: '10px 0px 0px 0px' }}>
                <input style={{ flexGrow: '8', height: 20, padding: 10, fontSize: '100%', margin: '0px 10px 0px 0px' }}
                    type="text"
                    placeholder="Enter an address"
                    value={inputAddress}
                    onChange={handleInputChange}
                />
                <Button onClick={handleGoToAddress} sx={{ flexGrow: 1, padding: 0, backgroundColor: "rgb(26,126,127)", color: "lightgreen" }}>Go to Address</Button>
            </div>
            <div style={{ height: 350, width: '100%', margin: '15px 0px 15px 0px' }}>
                <Map
                    zoom={18}
                    center={mapCenter}
                    mapId={'9741a1a12a9f0608'}
                    onClick={handleMapClick}
                >
                    <AdvancedMarker position={markerPosition}>
                        <Pin background={"rgb(26,126,127)"} borderColor={"darkGreen"} glyphColor={"lightGreen"} />
                    </AdvancedMarker>
                </Map>
            </div>
            {/* <p>Lat: {markerPosition.lat}, Lng: {markerPosition.lng}</p> */}
            
            {address && <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
            <h2 style={{ margin: 'auto', marginBottom: 10 }}>{address}</h2>
                <Button
                    onClick={handleRegisterAddress}
                    sx={{ backgroundColor: "rgb(26,126,127)", color: "lightgreen" }}>Register this address
                </Button>
                </div>}
        </APIProvider>
    );
}