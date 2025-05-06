import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import About from "./about";
import Coaches from "./coaches";
import Navbar from "./navbar";
import Nextabout from "./nextabout";
import Plan from "./plan";
import Visit from "./visit";
import Footer from "./footer";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={
                        <>
                            <About/>
                            <Nextabout/>
                            <Plan/>
                            <Coaches/>
                            <Visit/>
                            <Footer/>
                        </>
                    } />
                    <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin" element={<Navigate to="/admin/login" replace />} /> </Routes>
            </div>
        </Router>
    );
}

export default App;