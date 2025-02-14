import { describe, it, expect, vi, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import HotelSearchBox from "./HotelSearchBox";

describe("HotelSearchBox Component", () => {
  it("calls the callback function on input change", () => {
    const mockCallBack = vi.fn();
    render(<HotelSearchBox searchTerm="" callBack={mockCallBack} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Search" } });
    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
});
