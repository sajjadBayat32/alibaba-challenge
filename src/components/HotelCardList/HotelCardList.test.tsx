import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HotelCardList from "./HotelCardList";
import { expect, test, vi } from "vitest";

const mockHotels = [
	{
		id: 1,
		name: "Hotel Tehran",
		stars: 5,
		description: "Luxury hotel in Tehran",
		location: { long: 51.411756, lat: 35.748481 },
	},
	{
		id: 2,
		name: "Hotel Shiraz",
		stars: 4,
		description: "Comfortable stay in Shiraz",
		location: { long: 48.411756, lat: 32.748481 },
	},
];

test("renders hotel list when hotels are available", () => {
	render(
		<MemoryRouter>
			<HotelCardList
				hotelList={mockHotels}
				searchTerm=""
				selectedHotelId={null}
				onSelectHotel={() => {}}
			/>
		</MemoryRouter>
	);

	expect(screen.getByText("Hotel Tehran")).toBeTruthy();
	expect(screen.getByText("Hotel Shiraz")).toBeTruthy();
});

test("renders 'no hotels found' message when list is empty", () => {
	render(
		<MemoryRouter>
			<HotelCardList
				hotelList={[]}
				searchTerm="Luxury"
				selectedHotelId={null}
				onSelectHotel={() => {}}
			/>
		</MemoryRouter>
	);

	expect(screen.getByText("هتلی یافت نشد!")).toBeTruthy();
});

test("calls onSelectHotel when a hotel is clicked", () => {
	const mockOnSelectHotel = vi.fn();

	render(
		<MemoryRouter>
			<HotelCardList
				hotelList={mockHotels}
				searchTerm=""
				selectedHotelId={null}
				onSelectHotel={mockOnSelectHotel}
			/>
		</MemoryRouter>
	);

	const hotelItem = screen.getByText("Hotel Tehran");
	fireEvent.click(hotelItem);

	expect(mockOnSelectHotel).toHaveBeenCalledTimes(1);
	expect(mockOnSelectHotel).toHaveBeenCalledWith(1);
});
