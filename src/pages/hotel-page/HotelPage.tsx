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
				Back to Hotels
			</button>
			<h1 className="text-3xl font-bold">{hotel.name}</h1>
			<p className="mt-2">{hotel.description}</p>
			<p className="mt-2 text-yellow-500">{hotel.stars} ستاره</p>

			{/* Comments Section */}
			<div className="mt-6">
				<h3 className="text-xl font-semibold mb-2">User Comments</h3>
				{comments.length === 0 ? (
					<p>No comments yet.</p>
				) : (
					<ul>
						{comments.map((comment: UserComment) => (
							<li key={comment.id} className="border p-2 rounded mb-2">
								<strong>{comment.user}:</strong> {comment.text}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default HotelPage;
