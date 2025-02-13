import { Hotel, UserComment } from "../models";

export async function fetchHotels() {
	try {
		const res = await fetch("http://localhost:3001/hotels");
		if (!res.ok) throw new Error("Hotels not found");
		const data = (await res.json()) as Hotel[];
		return data;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function fetchHotel(id: string | undefined) {
	try {
		const res = await fetch(`http://localhost:3001/hotels/${id}`);
		if (!res.ok) throw new Error("Hotel comment not found");
		const data = (await res.json()) as Hotel;
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function fetchHotelComments(hotelId: string | undefined) {
	try {
		const res = await fetch(
			`http://localhost:3001/comments?hotelId=${hotelId}`
		);
		if (!res.ok) throw new Error("Hotel not found");
		const data = (await res.json()) as UserComment[];
		return data;
	} catch (error) {
		console.error(error);
		return [];
	}
}
