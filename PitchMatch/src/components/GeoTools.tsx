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