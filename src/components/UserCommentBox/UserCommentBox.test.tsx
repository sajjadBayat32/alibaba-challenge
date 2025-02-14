import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import UserCommentBox from "./UserCommentBox";
import { UserComment } from "../../models";

describe("UserCommentBox Component", () => {
	const comment: UserComment = {
		id: 10,
		hotelId: 1,
		rate: "3.5",
		user: "John Doe",
		text: "This is a test comment.",
	};

	it("renders the user name correctly", () => {
		render(<UserCommentBox comment={comment} />);
		expect(screen.getByText("John Doe")).toBeInTheDocument();
	});

	it("renders the comment text correctly", () => {
		render(<UserCommentBox comment={comment} />);
		expect(screen.getByText("This is a test comment.")).toBeInTheDocument();
	});

	it("renders the comment text correctly", () => {
		render(<UserCommentBox comment={comment} />);
		expect(screen.getByText("3.5 ستاره")).toBeInTheDocument();
	});

	it("has the correct structure and styles", () => {
		render(<UserCommentBox comment={comment} />);
		const container = screen.getByText("John Doe").closest("li");
		expect(container).toHaveClass(
			"border border-gray-200 py-2 px-4 rounded-lg mb-2"
		);
	});
});
