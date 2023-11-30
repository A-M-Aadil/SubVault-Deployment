import '../styles/style.css'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Navbar() {
  const auth = getAuth();                                 // initialize Firebase authentication
  const navigate = useNavigate();                         // initialize Navigate State
  const [navCollpase, setNavCollpase] = useState(false)   // Navigation Collapse boolean state variable

  // home navigation function
  const navHome = () => {
    // user authentication
    onAuthStateChanged(auth, (user) => {
      // if user sign in then navigate home page
      if (user) {
        navigate('/home');
      } else {
        // else navigate guesthome page
        navigate('/guesthome');
      }
    });
  }
  return (
    <>
      {/* 🔘Navigation Bar : Logo, username and navigation menu🔘 */}
      <div className=" z-50 w-full fixed px-10 pt-8 pb-2 backdrop-filter backdrop-blur-lg  flex justify-between items-center">
        <div className='h-full overflow-hidden'>
          <a href="/" className="text-5xl  text-white font-bold font-inspiration"><img className='w-[48px]' src="https://i.postimg.cc/DzHj5zh2/SubVault.png"/></a>
        </div>
        <button onClick={() => navigate("/signin")} className="text-2xl lg:text-4xl overflow-hidden text-white cursor-pointer font-bold font-jockey">Log In</button>
        <FontAwesomeIcon icon={faBars} onClick={e => setNavCollpase(!navCollpase)} className={`text-white text-[38px] lg:text-[50px] cursor-pointer ${navCollpase ? "hidden" : "flex"}`} />
        <FontAwesomeIcon icon={faXmark} onClick={e => setNavCollpase(!navCollpase)} className={`text-white text-[38px] lg:text-[50px] cursor-pointer ${!navCollpase ? "hidden" : "flex"}`} />
      </div>

      {/* 🔘Navigation Menu : Home, Signin, SignUp About, Contact, Faq and PrivacyPolicy 🔘 */}
      <div className={`fixed z-40 right-0 w-full top-[10%] ease-out duration-500" backdrop-filter backdrop-blur-lg xl:w-[30%] 2xl:w-[25%] h-[90%] ${navCollpase ? "flex" : "hidden"}`}>
        <div className='w-full h-full p-5'>
          <table className='w-full h-full'>
            <tr>
              <td className='w-full text-center border text-white text-[24px] font-barlow p-2'>
                <button onClick={() => { navHome() }} className='w-full h-full'>Home</button>
              </td>
            </tr>

            <tr>
              <td className='w-full text-center border text-white text-[24px] font-barlow p-2'>
                <button onClick={() => { navigate('/signin') }} className='w-full h-full'>Sign In</button>
              </td>
            </tr>

            <tr>
              <td className='w-full text-center border text-white text-[24px] font-barlow p-2'>
                <button onClick={() => { navigate('/signup') }} className='w-full h-full'>Sign Up</button>
              </td>
            </tr>

            <tr>
              <td className='w-full text-center border text-white text-[24px] font-barlow p-2'>
                <button onClick={() => { navigate('/about') }} className='w-full h-full'>About</button>
              </td>
            </tr>

            <tr>
              <td className='w-full text-center border text-white text-[24px] font-barlow p-2'>
                <button onClick={() => { navigate('/contact') }} className='w-full h-full'>Contact</button>
              </td>
            </tr>

            <tr>
              <td className='w-full text-center border text-white text-[24px] font-barlow p-2'>
                <button onClick={() => { navigate('/privacypolicy') }} className='w-full h-full'>Privacy Policy</button>
              </td>
            </tr>

            <tr>
              <td className='w-full text-center border text-white text-[24px] font-barlow p-2'>
                <button onClick={() => { navigate('/faq') }} className='w-full h-full'>FAQ</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}

export default Navbar;