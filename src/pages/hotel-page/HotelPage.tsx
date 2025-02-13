import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Hotel, UserComment } from "../../models";
import { fetchHotel, fetchHotelComments } from "../../services";

function HotelPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [hotel, setHotel] = useState<Hotel | null>(null);
	const [comments, setComments] = useState<UserComment[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const hotelPromise = fetchHotel(id);
		const commentPromise = fetchHotelComments(id);
		Promise.all([hotelPromise, commentPromise])
			.then(([hotel, comments]) => {
				setHotel(hotel);
				setComments(comments);
			})
			.catch(() => {
				alert("Error has occurred");
			})
			.finally(() => setLoading(false));
	}, [id]);

	if (loading) return <p>Loading...</p>;
	if (!hotel) return <p>Hotel not found.</p>;

	return (
		<div className="max-w-2xl mx-auto p-4">
			<button
				onClick={() => navigate(-1)}
				className="text-blue-500 mb-4 cursor-pointer"
			>
				بازگشت به هتل ها
			</button>

			<div className="bg-white rounded-lg px-4 py-8">
				<h1 className="text-3xl font-bold">{hotel.name}</h1>
				<p className="mt-5 mb-3">{hotel.description}</p>
				<span className="text-white w-fit text-[12px] bg-yellow-500 rounded-md h-5 flex items-center px-3">
					{hotel.stars} ستاره
				</span>
			</div>

			<div className="bg-white rounded-lg px-4 py-6 mt-6">
				<h3 className="text-xl font-semibold mb-4">دیدگاه کاربران</h3>
				{comments.length === 0 ? (
					<NoComments />
				) : (
					<ul className="mt-4">
						{comments.map((comment: UserComment) => (
							<UserCommentBox comment={comment} />
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

function NoComments() {
	return (
		<div className="border border-gray-200 rounded-lg bg-gray-100 h-40 flex items-center justify-center">
			<div className="flex flex-col gap-2 items-center">
				<h3 className="font-bold">دیدگاهی یافت نشد</h3>
				<p className="text-gray-400">دیدگاهی برای این هتل وجود ندارد</p>
			</div>
			<p></p>
		</div>
	);
}

export default HotelPage;
