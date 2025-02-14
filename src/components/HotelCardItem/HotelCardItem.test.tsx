import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HotelCardItem } from "./HotelCardItem";
import { expect, test } from "vitest";

const mockHotel = {
	id: 1,
	name: "Hotel Tehran",
	stars: 5,
	description: "A luxurious hotel in Tehran.",
	location: { long: 51.411756, lat: 35.748481 },
};

test("renders hotel name and stars", () => {
	render(
		<MemoryRouter>
			<HotelCardItem hotel={mockHotel} highlighted={false} />
		</MemoryRouter>
	);

	expect(screen.getByText("Hotel Tehran")).toBeTruthy();
	expect(screen.getByText("5 ستاره")).toBeTruthy();
});

test("renders description and 'مشاهده بیشتر' link", () => {
	render(
		<MemoryRouter>
			<HotelCardItem hotel={mockHotel} highlighted={true} />
		</MemoryRouter>
	);

	expect(screen.getByText("A luxurious hotel in Tehran.")).toBeTruthy();
	expect(screen.getByText("مشاهده بیشتر")).toBeTruthy();
});
