import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/login/LoginPage";          // Capital P
import ResistrationForm from "./Pages/ResistrationPage/ResistrationForm";
import Admin from "./Pages/adminPage/admin";
import DashBoard from "./Pages/Dashboardpage/DashBoard";
import Catring from "./Pages/CatringPage/Catring";
import Gym from "./Pages/GymPage/Gym";
import Movie from "./Pages/MovieTecket/Movie";
import Statonary from "./Pages/Stationary/Statonary";
import Partyhall from "./Pages/PartyHallpage/Partyhall";
import Beauty from "./Pages/BeautySaloon/Beauty";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<ResistrationForm />} />
        <Route path="/admin/:section" element={<Admin />} />
        <Route path="/Dashboard" element={<DashBoard/>}/>
        <Route path="/Catering" element={<Catring/>}/>
        <Route path="/Gym" element={<Gym/>}/>
         <Route path="/Movie" element={<Movie/>}/>
          <Route path="/stationery" element={<Statonary/>}/>
           <Route path="/Partyhall" element={<Partyhall/>}/>
            <Route path="/Beauty" element={<Beauty/>}/>
         
        
      </Routes>
    </Router>
  );
}

export default App;
