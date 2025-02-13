import { UserComment } from "../../models";

function UserCommentBox({ comment }: { comment: UserComment }) {
	return (
		<li className="border border-gray-200 py-2 px-4 rounded-lg mb-2">
			<div className="flex flex-col gap-2">
				<strong>{comment.user}</strong>
				<p>{comment.text}</p>
			</div>
		</li>
	);
}

export default UserCommentBox;
