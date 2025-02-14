import { UserComment } from "../../models";
import Rate from "../Rate/Rate";

function UserCommentBox({ comment }: { comment: UserComment }) {
  return (
    <li className="border border-gray-200 py-2 px-4 rounded-lg mb-2">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <strong>{comment.user}</strong>
          <Rate rate={comment.rate} />
        </div>
        <p>{comment.text}</p>
      </div>
    </li>
  );
}

export default UserCommentBox;
