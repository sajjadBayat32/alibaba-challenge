import { useEffect, useRef } from "react";
import { Hotel } from "../../models";
import { HotelCardItem } from "../HotelCardItem/HotelCardItem";

function HotelCardList({
  hotelList,
  searchTerm,
  selectedHotelId,
  onSelectHotel,
}: ComponentProps) {
  const hotelRefs = useRef<{ [key: string]: HTMLLIElement }>({});

  useEffect(() => {
    if (selectedHotelId && hotelRefs.current[selectedHotelId]) {
      hotelRefs.current[selectedHotelId].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedHotelId]);

  return hotelList.length > 0 ? (
    <ul className="w-full pb-4">
      {hotelList.map(hotel => (
        <li
          className="py-1 first:pt-0 last:pb-0 cursor-pointer"
          key={hotel.id}
          onClick={() => onSelectHotel(hotel.id)}
          ref={el => {
            if (el) hotelRefs.current[hotel.id] = el;
          }}
        >
          <HotelCardItem
            hotel={hotel}
            highlighted={selectedHotelId === hotel.id}
          />
        </li>
      ))}
    </ul>
  ) : (
    <NullResult searchTerm={searchTerm} />
  );
}

interface ComponentProps {
  hotelList: Hotel[];
  searchTerm: string;
  selectedHotelId: number | null;
  onSelectHotel: (id: number) => void;
}

function NullResult({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="p-4 flex flex-col items-center gap-2 border border-neutral-300 rounded-lg">
      <div className="text-lg font-semibold">هتلی یافت نشد!</div>
      <div className="text-gray-400 text-sm text-center">
        هتلی با متن جستجوی <b>{searchTerm}</b> یافت نشد
      </div>
    </div>
  );
}

export default HotelCardList;
