import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import HotelSearchBox from "./HotelSearchBox";

describe("HotelSearchBox Component", () => {
	it("renders the input with the correct placeholder", () => {
		render(<HotelSearchBox searchTerm="" callBack={() => {}} />);
		const input = screen.getByPlaceholderText(
			"بین نام هتل ها و توضیحاتشون جستجو کن ..."
		);
		expect(input).toBeInTheDocument();
	});

	test("displays the correct search term", () => {
		const searchTerm = "Shiraz Hotel";
		render(<HotelSearchBox searchTerm={searchTerm} callBack={() => {}} />);

		const inputElement = screen.getByPlaceholderText(
			"بین نام هتل ها و توضیحاتشون جستجو کن ..."
		);
		expect(inputElement).toHaveValue(searchTerm);
	});

	it("calls the callback function on input change", () => {
		const mockCallBack = vi.fn();
		render(<HotelSearchBox searchTerm="" callBack={mockCallBack} />);
		const input = screen.getByRole("textbox");
		fireEvent.change(input, { target: { value: "New Search" } });
		expect(mockCallBack).toHaveBeenCalledTimes(1);
	});
});
