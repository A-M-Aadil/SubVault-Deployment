import '../styles/style.css'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { getDatabase, ref, onValue } from "firebase/database";

function Navbar() {
  const db = getDatabase();                               // initialize Firebase database
  const navigate = useNavigate();                         // initialize Navigate State
  const [navCollpase, setNavCollpase] = useState(false);  // Navigation Collapse boolean state variable
  const [userName, setUserName] = useState();             // User Name state variable use get and store Username from firebase
  const [checkAdmin, setAdmin] = useState(false);         // Check Admin boolean state variable use to store user is a admin or not
  const auth = getAuth();                                 // initialize Firebase authentication
  const [signOutWindow, setSignOutWindow] = useState(false);  // Sign out boolean state variable use to

  // User Sign Out handler
  // signoutHandler : Sign out logged in user from website using arrow function
  const signoutHandler = () => {

    signOut(auth).then(() => {
      // when user signout navigate sign in page
      navigate('/signin')
    }).catch((error) => {
      // else show the error in console
      console.log(error)
    });
  }

  // Admin Status Handler
  // checkAdminStatus : check user is a admin or not and store if user is admin then true else false
  const checkAdminStatus = () => {
    // user authentication
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // if user authenticate successfully then check user id is an admin id 
        // check user id with firbase realtime databse admin ids
        onValue(ref(db, 'Admins/' + user.uid), (snapshot) => {
          const data = snapshot.val();
          // if user id not in admin id then store *false* in *checkAdmin* state variable setter function
          if (data === null) {
            setAdmin(false);
          } else {
            // if user id is equal to admin id then store *true* in *checkAdmin* state variable setter function
            if (auth.currentUser.uid === data.username) {
              setAdmin(true);
            } else {
              //else store *false* in *checkAdmin* state variable setter function
              setAdmin(false);
            }
          }
        });
      } else {
        // else user authentication fail then navigate sign in page
        navigate('/signin')
      }
    });
  }

  useEffect(() => {
    checkAdminStatus();                     // call check admin status function
    // user authentication
    onAuthStateChanged(auth, (user) => {
      // if user authenticate successfully then check username 
      if (user) {
        const uName = user.displayName;     // get and set username from firebase authentication
        // if user name null then set tempory name as a user and store in the user name state variable
        if (uName === null) {
          setUserName('user')
        } else {
          // else user name store in the user name state variable
          setUserName(uName)
        }

      } else {
        // if user authenticate fail then set tempory name as user 
        setUserName('user')
      }
    });
  }, )

  return (
    <>
      {/* 🔘Navigation Bar : Logo, username and navigation menu🔘 */}
      <div className=" z-50 w-full fixed px-10 pt-8 pb-2 backdrop-filter backdrop-blur-lg  flex justify-between items-center">
        <div className='h-full overflow-hidden'>
          <a href="/" className="text-5xl  text-white font-bold font-inspiration"><img className='w-[48px]' src="https://i.postimg.cc/DzHj5zh2/SubVault.png"/></a>
        </div>
        <button onClick={() => navigate('/profile')} className="text-2xl lg:text-4xl overflow-hidden text-white cursor-pointer font-bold font-jockey">{userName}</button>
        <FontAwesomeIcon icon={faBars} onClick={e => setNavCollpase(!navCollpase)} className={`text-white text-[38px] lg:text-[50px] cursor-pointer ${navCollpase ? "hidden" : "flex"}`} />
        <FontAwesomeIcon icon={faXmark} onClick={e => setNavCollpase(!navCollpase)} className={`text-white text-[38px] lg:text-[50px] cursor-pointer ${!navCollpase ? "hidden" : "flex"}`} />
      </div>

      {/* 🔘Sign out confirmation window🔘 */}
      { signOutWindow ? 
        <div style={{ zIndex: '100'}} className='w-full h-full fixed'>
          <div className='bg-black/80 w-full h-full flex justify-center items-center'>
            <div className='w-[400px] lg:w-[580px] h-[300px] bg-black border-2 flex items-center justify-center'>
              <div className='grid justify-center text-center'>
                <h2 className='text-white font-extrabold text-[36px]'> Are You Sure..?</h2>
                <h2 className='text-white  font-poppins text-[18px]'> Do you want signout</h2>
                <div className='flex justify-between mt-10'>
                  <button onClick={signoutHandler} className='bg-yellow-600 text-white font-extrabold w-[150px] h-[40px] mx-5'>Sign Out</button>
                  <button onClick={()=>{setSignOutWindow(false)}} className='bg-white text-black font-extrabold w-[150px] h-[40px] mx-5'>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>:null}

      {/* 🔘Navigation Menu : Home, Admins Dashboard, Profile, About, Contact, Faq and SignOut🔘 */}
      <div className={`fixed z-40 right-0 w-full top-[10%] ease-out duration-500" backdrop-filter backdrop-blur-lg xl:w-[30%] 2xl:w-[25%] h-[90%] ${navCollpase ? "flex" : "hidden"}`}>
        <div className='w-full h-full p-5'>
          <table className='w-full h-full'>
            <tr>
              <td className='w-full text-center border text-white text-[24px] font-barlow p-2'>
                <button onClick={() => navigate('/home')} className='w-full h-full'>Home</button>
              </td>
            </tr>

            {/* 🔘Admin Dashborad only shows to the admin🔘 */}
            {checkAdmin ?
              <tr>
                <td className='w-full text-center border text-white text-[24px] font-barlow p-2'>
                  <button onClick={() => navigate('/dashboards')} className='w-full h-full'>Admin</button>
                </td>
              </tr> : null
            }

            <tr>
              <td className='w-full text-center border text-white text-[24px] font-barlow p-2'>
                <button onClick={() => navigate('/profile')} className='w-full h-full'>Profile</button>
              </td>
            </tr>

            <tr>
              <td className='w-full text-center border text-white text-[24px] font-barlow p-2'>
                <button onClick={() => navigate('/about')} className='w-full h-full'>About Us</button>
              </td>
            </tr>

            <tr>
              <td className='w-full text-center border text-white text-[24px] font-barlow p-2'>
                <button onClick={() => navigate('/contact')} className='w-full h-full'>Contact</button>
              </td>
            </tr>

            <tr>
              <td className='w-full text-center border text-white text-[24px] font-barlow p-2'>
                <button onClick={() => navigate('/faq')} className='w-full h-full'>FAQ</button>
              </td>
            </tr>

            <tr>
              <td className='w-full text-center border text-white text-[24px] font-barlow p-2'>
                <button onClick={() => navigate('/privacypolicy')} className='w-full h-full'>Privacy Policy</button>
              </td>
            </tr>

            <tr>
              <td className='w-full text-center border text-white text-[24px] font-barlow p-2'>
                <button className='w-full h-full' onClick={()=>{setSignOutWindow(true)}}>Sign Out</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}

export default Navbar;