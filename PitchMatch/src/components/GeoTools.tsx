import { Pitch, User } from './types'; // Assuming you have a 'Pitch' type defined

export const calculateDistance = (
    latitudeA: number,
    longitudeA: number,
    latitudeB: number,
    longitudeB: number
  ): number => {
    const R = 6371; // Radius of the Earth in kilometers
  
    const deg2rad = (deg: number) => deg * (Math.PI / 180);
    const dLat = deg2rad(latitudeB - latitudeA);
    const dLon = deg2rad(longitudeB - longitudeA);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(latitudeA)) * Math.cos(deg2rad(latitudeB)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
  
    return distance;
  };

export const sortPitchesByDistance = (
  pitches: Pitch[],
  userLatitude: number,
  userLongitude: number
  ): Pitch[] => {
    // Exclude pitches where latitude or longitude is 0
    const validPitches = pitches.filter((pitch) => pitch.latitude !== 0 && pitch.longitude !== 0);
  
    // Sort valid pitches based on their distance from the user's location
    validPitches.sort((pitchA, pitchB) => {
      const distanceA = calculateDistance(userLatitude, userLongitude, pitchA.latitude, pitchA.longitude);
      const distanceB = calculateDistance(userLatitude, userLongitude, pitchB.latitude, pitchB.longitude);
  
      return distanceA - distanceB;
    });
  
    return validPitches;
  };

export const sortUsersByDistance = (
  users: User[],
  userLatitude: number,
  userLongitude: number
): User[] => {

  const usersWithPersonalData = users.filter((user) => user.personalData !== null);
  const validUsers = usersWithPersonalData.filter((user) => user.personalData.latitude !== 0 && user.personalData.longitude !== 0);

  validUsers.sort((userA, userB) => {
    const distanceA = calculateDistance(userLatitude, userLongitude, userA.personalData.latitude, userA.personalData.longitude);
    const distanceB = calculateDistance(userLatitude, userLongitude, userB.personalData.latitude, userB.personalData.longitude);

    return distanceA - distanceB;
  });
  return validUsers;
};

interface GeocodeResult {
  latitude: number;
  longitude: number;
}

interface GeocodeProps {
  address: string;
  onGeocodeResult: (result: GeocodeResult | null) => void;
}


type Coordinates = {
  latitude: number;
  longitude: number;
};

export async function GetCoordinates(address: string): Promise<Coordinates> {
  // Replace with your actual Geocoding API key
  const apiKey = 'AIzaSyCGCRxrgJ4nKcTNhTaXk3p0izYu_nes3qg';

  // Construct the Geocoding API URL
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    // Asynchronously fetch data from the Geocoding API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Check if the API returned a valid response
    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
  }

  // Return null if coordinates couldn't be obtained
  return {
    latitude: 0,
    longitude: 0,
  }
};