import "./App.css";
import { HomeComponent } from "./Components/Home.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CityComponent } from "./Components/CityComponent.jsx";
import { LoginComponent } from "./Components/LoginComponent.jsx";
import { RegistrationComponent } from "./Components/Registration.jsx";
import { Layout } from "./Components/Layout.jsx";
import {Index} from './Components/Index.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/registration" element={<RegistrationComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/weather" element={<HomeComponent />} />
          <Route path="/city" element={<CityComponent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


/* <Route path="/:city?/:id?" element={<CityComponent />} /> */

