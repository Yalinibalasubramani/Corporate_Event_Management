
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import { Login } from './component/Login';
import { Register } from './component/Register';
import About from './component/About'
import Home from './component/Home';
import ForgotPassword from "./component/ForgetPassword";
import ResetPassword from "./component/ResetPassword";
import Contact from "./component/Contact";
import Admin from "./component/Admin";
import Event from './component/Event';
import MyProfile from "./component/MyProfile";
import Bookings from "./component/Bookings";
import Payment from "./component/Payment";
import Addevent from "./component/Addevent";
import BookingCards from "./component/BookingCards";
import { AuthProvider } from "./component/AuthContext";
import PrivateRoute from "./component/PrivateRoute";
import EventDetails from './component/EventDetails';
import VenueList from "./component/VenueList";
import AdminContact from "./component/AdminContact";
import BookingStatus from "./component/BookingStatus";
import AdminUserManagement from "./component/User";
import PaymentManagement from "./component/PaymentManagement";




function App() {
  const [currentForm, setCurrentForm] = useState('Login');
  
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthProvider>
    <Router>
      <div className="App">
      
     
        <Routes>
          <Route path="/my-events" element={<BookingStatus/>}></Route>
          <Route path="/user" element={<AdminUserManagement/>}></Route>
          <Route path="/paid" element={<PaymentManagement/>}></Route>
          <Route path="/venue-list" element={<VenueList />} />
          <Route path="/login" element={<Login onFormSwitch={toggleForm} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register onFormSwitch={toggleForm} />} />
          <Route path="/forgotpassword" element={<ForgotPassword onFormSwitch={toggleForm} />} />
          <Route path="/resetpassword" element={<ResetPassword onFormSwitch={toggleForm} />} />
          <Route path="/admincontact" element={<AdminContact />} />
          <Route path="/event-details" element={<EventDetails />} />
          <Route path="/about" element={<About/>} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/addevent" element={<Addevent/>} />
          <Route path="/bookevent" element={<BookingCards/>} />
          
          <Route path="/booking" element={<Bookings/>} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/homeadmin" element={<Admin />} />
          <Route path="/events" element={<Event />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}
export default App;
