import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AzerbaijanMap from "./Components/Pages/AzerbaijanMap";
import Default from "./Components/Layouts/Default";
import Home from "./Components/Pages/Home";
import ApexChart from "./Components/Pages/WeatherPage"

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Default />}>
            <Route path="/" element={<Home />} />
            <Route path="/azerbaijanMap" element={<AzerbaijanMap />} />
          </Route>
            <Route path="/apexchart/:cityName" element={<ApexChart />} />
        </Routes>
      </Router>
    </>
  );
}
