import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapPage from './MapPage';
import WeatherPage from './WeatherPage';
import Region from './Region';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/weather/:city" element={<WeatherPage />} />
        <Route path="/weather/:city" element={<Region />} />
      </Routes>
    </Router>
  );
};

export default App;
