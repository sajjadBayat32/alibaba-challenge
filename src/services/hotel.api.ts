import { Hotel, UserComment } from "../models";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchHotels() {
	try {
		const res = await fetch(`${API_BASE_URL}/hotels`);
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
		const res = await fetch(`${API_BASE_URL}/hotels/${id}`);
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
		const res = await fetch(`${API_BASE_URL}/comments?hotelId=${hotelId}`);
		if (!res.ok) throw new Error("Hotel not found");
		const data = (await res.json()) as UserComment[];
		return data;
	} catch (error) {
		console.error(error);
		return [];
	}
}
