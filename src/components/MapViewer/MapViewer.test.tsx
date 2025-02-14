import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MapViewer from "./MapViewer";
import { Hotel } from "../../models";
import { act } from "react-dom/test-utils";

vi.mock("react-leaflet", () => ({
	MapContainer: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="map-container">{children}</div>
	),
	TileLayer: () => <div data-testid="tile-layer" />,
	Marker: ({ alt, eventHandlers }: { alt: string; eventHandlers: any }) => (
		<div data-testid="marker" onClick={eventHandlers.click}>
			{alt}
		</div>
	),
	Popup: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="popup">{children}</div>
	),
	useMap: () => ({
		setView: vi.fn(),
		fitBounds: vi.fn(),
	}),
}));

describe("MapViewer Component", () => {
	const hotels: Hotel[] = [
		{
			id: 1,
			name: "Hotel One",
			description: "",
			location: { lat: 35.6895, long: 51.389 },
			stars: 4,
		},
		{
			id: 2,
			name: "Hotel Two",
			description: "",
			location: { lat: 36.5, long: 52.5 },
			stars: 5,
		},
	];

	it("renders the map container", () => {
		render(
			<MapViewer
				hotels={hotels}
				selectedHotelId={null}
				onMarkerClick={() => {}}
			/>
		);
		expect(screen.getByTestId("map-container")).toBeTruthy();
	});

	it("renders the correct number of markers", () => {
		render(
			<MapViewer
				hotels={hotels}
				selectedHotelId={null}
				onMarkerClick={() => {}}
			/>
		);
		expect(screen.getAllByTestId("marker").length).toBe(2);
	});

	it("calls onMarkerClick when a marker is clicked", () => {
		const mockOnMarkerClick = vi.fn();
		render(
			<MapViewer
				hotels={hotels}
				selectedHotelId={null}
				onMarkerClick={mockOnMarkerClick}
			/>
		);
		const markers = screen.getAllByTestId("marker");
		act(() => {
			markers[0].click();
		});
		expect(mockOnMarkerClick).toHaveBeenCalledTimes(1);
		expect(mockOnMarkerClick).toHaveBeenCalledWith(1);
	});
});
