import { Route, Routes } from "react-router-dom";
// import "./App.css";
import LandingPage from "./pages/LandingPage";
import RootLayout from "./components/RouteLayout";

function App() {
  return (
    <>
      <RootLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </RootLayout>
    </>
  );
}

export default App;
