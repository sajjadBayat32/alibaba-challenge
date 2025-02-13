import { Route, Routes } from "react-router-dom";
import { HomePage, HotelPage } from "./pages";
import AppLayout from "./layout/app-layout/AppLayout";

function App() {
	return (
		<AppLayout>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/hotels/:id" element={<HotelPage />} />
			</Routes>
		</AppLayout>
	);
}

export default App;
