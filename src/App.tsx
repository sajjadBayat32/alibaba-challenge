import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/app-layout/AppLayout";
import { lazy, Suspense } from "react";
import { PageLoading } from "./components";

const HomePage = lazy(() => import("./pages/home-page/HomePage"));
const HotelPage = lazy(() => import("./pages/hotel-page/HotelPage"));

function App() {
	return (
		<AppLayout>
			<Suspense fallback={<PageLoading />}>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/hotels/:id" element={<HotelPage />} />
				</Routes>
			</Suspense>
		</AppLayout>
	);
}

export default App;
