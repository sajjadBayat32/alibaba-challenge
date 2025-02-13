import { useCallback, useEffect, useMemo, useState } from "react";
import { Hotel } from "../../models";
import { fetchHotels } from "../../services";
import { HotelCardList, HotelSearchBox, MapViewer } from "../../components";

function HomePage() {
	const [hotels, setHotels] = useState<Hotel[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);

	const filteredHotels = useMemo(() => {
		console.log("filtered hotels");
		return hotels.filter((hotel) =>
			`${hotel.name} ${hotel.description}`
				.toLowerCase()
				.includes(searchTerm.toLowerCase())
		);
	}, [hotels, searchTerm]);

	const handleSelectHotel = useCallback(
		(id: number) => setSelectedHotelId(id),
		[]
	);

	useEffect(() => {
		fetchHotels()
			.then((body) => setHotels(body))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <p>Loading...</p>;

	return (
		<div className="">
			<div className="flex justify-center mt-10 mb-10">
				<div className="w-full max-w-150">
					<HotelSearchBox
						callBack={(e) => setSearchTerm(e.target.value)}
						searchTerm={searchTerm}
					/>
				</div>
			</div>

			<div className="">
				<div className="grid grid-cols-[300px_1fr] gap-6 items-start">
					<div className="flex flex-col gap-4 items-start h-[480px]">
						<h1 className="text-2xl font-semibold pb-2">هتل های تهران</h1>
						<div className="flex-1 w-full overflow-auto pe-1">
							<HotelCardList
								hotelList={filteredHotels}
								selectedHotelId={selectedHotelId}
								searchTerm={searchTerm}
								onSelectHotel={handleSelectHotel}
							/>
						</div>
					</div>
					<div className="bg-shadow bg-white rounded-lg h-100 p-1">
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
