import { memo } from "react";
import { Hotel } from "../../models";
import { Link } from "react-router-dom";

export const HotelCardItem = memo(
	({ hotel, highlighted }: { hotel: Hotel; highlighted: boolean }) => {
		return (
			<div
				className={`border p-4 rounded-lg  bg-white ${
					highlighted ? "border-color-primary" : "border-neutral-200"
				}`}
			>
				<h2 className="text-lg font-semibold pb-2">{hotel.name}</h2>
				<span className="text-white w-fit text-[12px] bg-yellow-500 rounded-md h-5 flex items-center px-3">
					{hotel.stars} ستاره
				</span>
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
	}
);
