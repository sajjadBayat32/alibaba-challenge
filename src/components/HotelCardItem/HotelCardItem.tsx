import { memo } from "react";
import { Hotel } from "../../models";
import { Link } from "react-router-dom";
import Rate from "../Rate/Rate";

export const HotelCardItem = memo(({ hotel, highlighted }: ComponentProps) => {
  return (
    <div
      className={`border p-4 rounded-lg  bg-white ${
        highlighted ? "border-gray-600" : "border-neutral-200"
      }`}
    >
      <h2 className="text-lg font-semibold pb-2">{hotel.name}</h2>
      <Rate rate={hotel.stars} />
      <div className="mt-3 w-full">
        <p className="text-ellipsis overflow-hidden whitespace-nowrap">
          {hotel.description}
        </p>
      </div>
      <div className="flex justify-end mt-3">
        <Link to={`/hotels/${hotel.id}`} className="text-blue-500 block mt-2">
          مشاهده بیشتر
        </Link>
      </div>
    </div>
  );
});

interface ComponentProps {
  hotel: Hotel;
  highlighted: boolean;
}
