import { Hotel, UserComment } from "../models";

// const BaseUrl = "http://192.168.1.100:3001";
const BaseUrl = "http://localhost:3001";

export async function fetchHotels() {
	try {
		const res = await fetch(`${BaseUrl}/hotels`);
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
		const res = await fetch(`${BaseUrl}/hotels/${id}`);
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
		const res = await fetch(`${BaseUrl}/comments?hotelId=${hotelId}`);
		if (!res.ok) throw new Error("Hotel not found");
		const data = (await res.json()) as UserComment[];
		return data;
	} catch (error) {
		console.error(error);
		return [];
	}
}
