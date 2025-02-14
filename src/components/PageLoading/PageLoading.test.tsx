import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PageLoading from "./PageLoading";

describe("PageLoading Component", () => {
	it("renders the loading message", () => {
		render(<PageLoading />);
		expect(screen.getByText("در حال بارگذاری...")).toBeTruthy();
	});

	it("has the correct structure and styles", () => {
		render(<PageLoading />);
		const container = screen.getByText("در حال بارگذاری...").closest("div");
		expect(container?.classList).toContain("font-bold");
	});
});
