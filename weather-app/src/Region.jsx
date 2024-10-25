import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CitiesComponent from './CitiesComponent'

export default class Region extends Component {
  render() {
    return (
      <Route path="/weather/:city" element={<CitiesComponent />} />
    )
  }
}
