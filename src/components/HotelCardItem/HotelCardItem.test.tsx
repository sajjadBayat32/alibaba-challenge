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

test("renders hotel name and it's info", () => {
  render(
    <MemoryRouter>
      <HotelCardItem hotel={mockHotel} highlighted={false} />
    </MemoryRouter>
  );

  expect(screen.getByText("Hotel Tehran")).toBeTruthy();
  expect(screen.getByText("5 ستاره")).toBeTruthy();
  expect(screen.getByText("A luxurious hotel in Tehran.")).toBeTruthy();
  expect(screen.getByText("مشاهده بیشتر")).toBeTruthy();
});

test("renders highlighted card", () => {
  render(
    <MemoryRouter>
      <HotelCardItem hotel={mockHotel} highlighted={true} />
    </MemoryRouter>
  );
  const container = screen.getByText("Hotel Tehran").closest("div");
  expect(container?.classList.toString()).toContain("border-gray-600");
});
