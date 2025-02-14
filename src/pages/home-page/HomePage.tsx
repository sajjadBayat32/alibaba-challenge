import { lazy, useCallback, useEffect, useMemo, useState } from "react";
import { Hotel } from "../../models";
import { fetchHotels } from "../../services";
import { HotelCardList, HotelSearchBox, PageLoading } from "../../components";

const MapViewer = lazy(() => import("../../components/MapViewer/MapViewer"));

function HomePage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);

  const filteredHotels = useMemo(() => {
    setSelectedHotelId(null);
    return hotels.filter(hotel =>
      `${hotel.name} ${hotel.description}`
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase()),
    );
  }, [hotels, searchTerm]);

  const handleSelectHotel = useCallback(
    (id: number) => setSelectedHotelId(id),
    [],
  );

  useEffect(() => {
    fetchHotels()
      .then(body => setHotels(body))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoading />;

  return (
    <div className="relative flex flex-col">
      <div className="flex justify-center py-10">
        <div className="w-full md:max-w-150">
          <HotelSearchBox
            callBack={e => setSearchTerm(e.target.value)}
            searchTerm={searchTerm}
          />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex max-md:flex-col gap-6 items-start">
          <div className="flex flex-col gap-4 items-start w-full md:w-100">
            <h1 className="text-2xl font-semibold pb-2">هتل های تهران</h1>
            <div className="md:h-[calc(100vh-270px)] w-full md:overflow-y-auto pe-1">
              <HotelCardList
                hotelList={filteredHotels}
                selectedHotelId={selectedHotelId}
                searchTerm={searchTerm}
                onSelectHotel={handleSelectHotel}
              />
            </div>
          </div>

          <div className="bg-shadow bg-white rounded-lg h-100 max-md:w-full p-1 md:flex-1">
            <MapContainer
              hotelList={filteredHotels}
              selectedHotelId={selectedHotelId}
              onMarkerClick={handleSelectHotel}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MapContainer({
  hotelList,
  selectedHotelId,
  onMarkerClick,
}: {
  hotelList: Hotel[];
  selectedHotelId: number | null;
  onMarkerClick: (id: number) => void;
}) {
  return (
    <MapViewer
      selectedHotelId={selectedHotelId}
      hotels={hotelList}
      onMarkerClick={onMarkerClick}
    />
  );
}

export default HomePage;
