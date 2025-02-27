import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import RootLayout from "./components/RouteLayout";
import "@massalabs/react-ui-kit/src/global.css";
import DashboardLayout from "./components/DashboardLayout";
import DashboardMain from "./pages/DashboardMain";
import DashboardEditProfile from "./pages/DashboardEditProfile";
import DashboardPosts from "./pages/DashboardPosts";

function App() {
  return (
    <>
      <RootLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardMain />} />
            <Route path="posts" element={<DashboardPosts />} />
            <Route path="edit-profile" element={<DashboardEditProfile />} />
            <Route path="submit-post" element={<DashboardLayout />} />
          </Route>
        </Routes>
      </RootLayout>
    </>
  );
}

export default App;
