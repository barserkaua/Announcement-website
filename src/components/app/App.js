import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../header/Header";
import Footer from "../footer/Footer";

import HomeScreen from "../../screens/home-screen/HomeScreen";
import CreateNewAnnouncement from "../../screens/create-new-announcement/CreateNewAnnouncement";
import DetailsAnnouncementScreen from "../../screens/details-announcement-screen/DetailsAnnouncementScreen";

function App() {
  return (
    <Router>
        <Header/>
            <main className="py-3">
                <Container>
                    <Routes>
                        <Route path="/" element={<HomeScreen/>} exact/>
                        <Route path="/create-new-announcement" element={<CreateNewAnnouncement/>}/>
                        <Route path="/announcement-detail/:id" element={<DetailsAnnouncementScreen/>}/>
                    </Routes>
                </Container>
            </main>
        <Footer/>
    </Router>
  );
}

export default App;
