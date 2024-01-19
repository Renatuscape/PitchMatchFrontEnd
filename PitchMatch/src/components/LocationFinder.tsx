import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface LocationInputMapProps {
    onLocationChange: (location: google.maps.LatLng) => void;
}

const LocationInputMap: React.FC<LocationInputMapProps> = ({ onLocationChange }) => {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDsd71Tk1XISMfX7kukz62qlcaY3AvcZO4&libraries=places`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            const mapInstance = new window.google.maps.Map(document.getElementById('map') as HTMLElement, {
                center: { lat: 0, lng: 0 },
                zoom: 8,
            });

            const geocoderInstance = new window.google.maps.Geocoder();

            setMap(mapInstance);
            setGeocoder(geocoderInstance);
        };
    }, []);

    const handleLocationInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const address = event.target.value;
        if (geocoder && map) {
            geocoder.geocode({ address }, (results, status) => {
                if (results !== null) {
                    if (status === 'OK' && results.length > 0) {
                        const location = results[0].geometry?.location;
                        if (location) {
                            onLocationChange(location);
                            map.setCenter(location);
                        }
                    }
                }
            });
        }
    };
    return (
        <div>
            <input
                type="text"
                placeholder="Enter location (e.g., street name, town)"
                onChange={handleLocationInputChange}
            />
            <div id="map" style={{ height: '300px', width: '100%' }}></div>
        </div>
    );
};

export default LocationInputMap;