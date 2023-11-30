import '../styles/style.css'
import Navbar from '../components/Navbar';
import HomeNavbar from '../components/HomeNavbar';
import Categories from '../components/Categories';
import Slide from '../components/Slide'
import WebInfo from '../components/WebInfo'
import WebInfoFooter from '../components/WebInfoFooter'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const slides =[
    {link:"https://wallpaperaccess.com/full/2116417.jpg", name:'JOKER', title: 'PUT ON HAPPY FACE'},
    {link:"https://images.hdqwalls.com/wallpapers/avatar-the-way-of-water-movie-4k-mi.jpg", name:'AVATAR', title: 'WAY OF THE WATER'},
    {link: "https://i.postimg.cc/4x549QLD/peakpx-5.jpg", name: 'John Wick 4', title: 'Story of Baba Yaga'}
  ]

  

function Home() {
  const auth = getAuth();                                         // initialize Firebase authentication
  const [userSignIn, setUserSingIn] = useState(false)             // User Sign in boolean state variable for check user sign in

  useEffect(()=>{
    // user authentication
    onAuthStateChanged(auth, (user) => {
      //if user sign in then User Sign in true
      if (user) {
        setUserSingIn(true);
      }else{
        // else useer in false
        setUserSingIn(false);
      }
    });
  },)

  return (
    <>
        {/* 🔘Navigation Bar🔘 */}
        { !userSignIn ? <Navbar /> : <HomeNavbar />}

        {/* 🔘Image Slider🔘 */}
        <section>
          <div className='w-screen h-screen scroll-smooth overflow-x-hidden'>
          <Slide slides={slides}/>
          </div>
        </section>
        
        {/* 🔘 Movie Categories 🔘 */}
        <Categories />

        {/* 🔘 Sub Vault Web Intro 🔘 */}
        <WebInfo/>

        {/* 🔘 Sub Vault Website About 🔘 */}
        <About/>

        {/* 🔘 Website Testimonials🔘 */}
        <Testimonials/>

        {/* 🔘 Sub Vault Web Intro 🔘 */}
        <WebInfoFooter/>

    </>
  );
}

export default Home;