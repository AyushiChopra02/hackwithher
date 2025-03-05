import React, { useState, useEffect } from "react";

interface Facility {
  id: number;
  name: string;
  type: "Hospital";
  rating: number;
  phone: string;
  distance: number;
  address: string;
  isOpen: boolean;
}

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState<string>("distance");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        setCoordinates({
          lat: 30.512873240966048,
          lon: 76.66207311123605,
        });
      }
    );
  }, []);

  const fetchCityCoordinates = async (city: string) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&format=json&limit=1`);
      const result = await response.json();
      if (result.length > 0) {
        setCoordinates({ lat: parseFloat(result[0].lat), lon: parseFloat(result[0].lon) });
      } else {
        alert("City not found. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching city coordinates:", error);
    }
  };

  useEffect(() => {
    if (!coordinates) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { lat, lon } = coordinates;
        const range = 0.2;
        const query = `[out:json];node["amenity"="hospital"](${lat - range},${lon - range},${lat + range},${lon + range});out;`;

        const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
        const result = await response.json();

        const mappedFacilities: Facility[] = result.elements.map((hospital: any, index: number) => ({
          id: hospital.id || index,
          name: hospital.tags["name"] || "Unknown Hospital",
          type: "Hospital",
          rating: Math.floor(Math.random() * 5) + 1,
          phone: hospital.tags["contact:phone"] || "",
          distance: Math.random() * 5,
          address: hospital.tags["addr:full"] || "",
          isOpen: hospital.tags["opening_hours"] ? !hospital.tags["opening_hours"].includes("closed") : true,
        }));

        setFacilities(mappedFacilities);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [coordinates]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      fetchCityCoordinates(searchQuery.trim());
    }
  };

  const sortedFacilities = [...facilities].sort((a, b) => {
    // First, prioritize hospitals with both a contact number and address
    const aHasBoth = a.phone && a.address;
    const bHasBoth = b.phone && b.address;
    
    if (aHasBoth !== bHasBoth) return bHasBoth ? 1 : -1;

    // Next, prioritize hospitals with at least one of them
    const aHasAny = a.phone || a.address;
    const bHasAny = b.phone || b.address;
    
    if (aHasAny !== bHasAny) return bHasAny ? 1 : -1;

    // Then, sort by selected criteria (distance or rating)
    if (sortBy === "distance") return a.distance - b.distance;
    if (sortBy === "rating") return b.rating - a.rating;
    
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <form onSubmit={handleSearch} className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 w-full rounded-lg"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Search</button>
        </form>

        <div className="flex justify-end mb-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option value="distance">Sort by Distance</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : sortedFacilities.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 mb-8">
            {sortedFacilities.map((facility) => (
              <div key={facility.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{facility.name}</h3>
                {facility.address ? (
                  <p className="text-gray-600 mb-2">📍 {facility.address}</p>
                ) : (
                  <p className="text-gray-400 italic">No address available</p>
                )}
                {facility.phone ? (
                  <p className="text-gray-700"><strong>📞 Contact:</strong> {facility.phone}</p>
                ) : (
                  <p className="text-gray-400 italic">No contact info available</p>
                )}
                <div className="flex items-center gap-6 mt-4">
                  <span className="font-semibold">⭐ {facility.rating}</span>
                  <span>📍 {facility.distance.toFixed(1)} miles</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No hospitals found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
