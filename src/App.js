import Navbar from './components/Navbar';
import Slide from './components/Slide';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import VerifyEmail from './pages/VerifyEmail';
import GuestHome from './pages/GuestHome';
import ManageSub from './pages/ManageSubtitles';
import ManageAdmins from './pages/ManageAdmins';
import UserHome from './pages/UserHome';
import Categories from './components/Categories';
import About from './pages/AboutUs';
import Movie from './components/Movie';
import Reviews from './components/Reviews';
import MovieSubtitles from './components/MovieSubtitles';
import Home from './pages/home';
import Admin from './pages/Admin';
import Dashboards from './pages/Dashboards';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import Contact from './pages/Contact';
import Messages from './pages/Messages';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQ from './pages/FAQ';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useState, useEffect } from 'react';
const slides =[
  {link:"https://wallpaperaccess.com/full/2116417.jpg", name:'JOKER', title: 'PUT ON HAPPY FACE'},
  {link:"https://images.hdqwalls.com/wallpapers/avatar-the-way-of-water-movie-4k-mi.jpg", name:'AVATAR', title: 'WAY OF THE WATER'},
  {link:"https://cdn.bollywoodmdb.com/fit-in/post/1920HOTHreview_1687508757974.jpg",name:'1920', title: 'HORRORS OF THE HEART'}
]

function App() {
  const [response,setResponse] =useState({});
  
  return (
    
    
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/dashboards" element={<Dashboards/>} />
        <Route path="/verify" element={<VerifyEmail/>} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/guesthome" element={<GuestHome />} />
        <Route path="/admin/msubtitles" element={<ManageSub />} />
        <Route path="/admin/madmins" element={<ManageAdmins />} />
        <Route path="/admin/messages" element={<Messages />} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/forgetpassword" element={<ForgetPassword/>} />
        <Route path="/resetpassword" element={<ResetPassword/>} />
        <Route path="/About" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/faq" element={<FAQ/>} />
        <Route path="/privacypolicy" element={<PrivacyPolicy/>} />
        <Route path="/movie/:movieId" element={<Movie />} />
        <Route path="/movie/:movieId/reviews" element={<Reviews />} />
        <Route path="/admin/msubtitles/:movieId" element={<MovieSubtitles />} />
      </Routes>
    
      

    </BrowserRouter>
    
   
    
  );
}

export default App;
