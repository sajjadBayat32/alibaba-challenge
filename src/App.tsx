import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/app-layout/AppLayout";
import { lazy, Suspense } from "react";
import { PageLoading } from "./components";
import NotFoundPage from "./pages/not-found/NotFoundPage";

const HomePage = lazy(() => import("./pages/home-page/HomePage"));
const HotelPage = lazy(() => import("./pages/hotel-page/HotelPage"));

function App() {
  return (
    <AppLayout>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotels/:id" element={<HotelPage />} />
          <Route
            path="*"
            element={<NotFoundPage title="صفحه مورد نظر یافت نشد" />}
          />
        </Routes>
      </Suspense>
    </AppLayout>
  );
}

export default App;
