import '../styles/style.css'
import {getAuth, signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, TwitterAuthProvider  } from 'firebase/auth'
import { app } from '../components/FirebaseConfig';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button';
import Navbar from '../components/Navbar';
import { getDatabase, ref, set ,onValue } from "firebase/database";
import Loading from '../components/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SignIn() {
  const auth = getAuth(app);                              // initialize Firebase authentication
  const db = getDatabase();                               // initialize Firebase database
  const navigate = useNavigate();                         // initialize Navigate State
  const[email, setEmail]= useState();                     // user email state variable for set user email
  const[password, setPassword]= useState();               // user password state variable for set user password
  const[signInError, setsignInError]= useState();         // user signIn error state variable for set errors
  const[pageLoading, setPageLoading]= useState(false);    // Page Loading boolean state variable use to display Page loading animation

  // user credential submit handle
  const submitHandler = (event) => {
    event.preventDefault();

    // user sign in with email and password
    signInWithEmailAndPassword(auth,email,password)
    .then(res => {
      // check user verified or not
      if (res.user.emailVerified) {
        //if user verified then check user is admin or not
        onValue(ref(db,'Admins/'+res.user.uid), (snapshot) => {
          const data = snapshot.val();
          // if user not an admin then naviagete home page
          if (data === null) {
            navigate('/home')
          } else {
            // else if user is an admin then navigate dashborads
            if (auth.currentUser.uid === data.username) {
              navigate('/dashboards')
            } else {
              // else navigate home page
              navigate('/home')
            }
          }
          
      });
      }else{
        // else user not verified email then navigate verify page
        sendEmailVerification(auth.currentUser)
        .then(() => {
          navigate('/verify');
        });
      }
    })
    .catch(err=>{
      // handle email password login errors
      setsignInError('Email or Password Incorrect!..')
      toast('Email or Password Incorrect!..')
    })
  }

  // Sign in with Google handler
  const signInWithGoogleHandler = ()=>{
    // authentication provider
    const provider = new GoogleAuthProvider;
    // sign in with pop up window
    signInWithPopup(auth, provider)
    .then(()=>{
      // when sign in user navigate home page
      navigate('/home')
    })
    .catch((err)=>{
      // show errors in console
      console.log(err)
    })
  }

  // Sign in with Facebook handler
  const signInWithFacebookHandler = ()=>{
    // authentication provider
    const provider = new FacebookAuthProvider;
    // sign in with pop up window
    signInWithPopup(auth, provider)
    .then(()=>{
      // when sign in user navigate home page
      navigate('/home')
    })
    .catch((err)=>{
      // show errors in console
      console.log(err)
    })
  }

  // Sign in with Twitter handler
  const signInWithTwitterHandler = ()=>{
    // Sign in with Facebook handler
    const provider = new TwitterAuthProvider;
    // sign in with pop up window
    signInWithPopup(auth, provider)
    .then(()=>{
      // when sign in user navigate home page
      navigate('/home')
    })
    .catch((err)=>{
      // show errors in console
      console.log(err)
    })
  }

  // clear input fields 
  const clearInputField =( field )=>{
    switch (field) {
      // clear password input field
      case 'password':
        setPassword('');
        break;

      // clear email input field
      case 'email':
        setEmail('');
        break;

      default:
        break;
    }
  }

  useEffect(()=>{
    // enable page loading
    setPageLoading(true);
    // user authentication
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // if user authenticate successfully then check user id is an admin id 
        // check user id with firbase realtime databse admin ids
        onValue(ref(db,'Admins/'+user.uid), (snapshot) => {
          const data = snapshot.val();
          console.log(user.uid)
          // if user id not in admin id then navigate to home page
          if (data === null) {
            navigate('/home');
            // disable page loading
            setPageLoading(false);
          } else {
            // if user id is equal to admin id then navigate dashboard page
            if (auth.currentUser.uid === data.username) {
              navigate('/dashboards');
              // disable page loading
              setPageLoading(false);
            } else {
              // else naviagete home page and disable page loading
              navigate('/home');
              setPageLoading(false);
            }
          }
          
      });
      } else {
        // else disable page loading
        setPageLoading(false);
      }
    });

  },[])

  return (
    <>
      {/* 🔘 User Sign in Interface 🔘 */}
        <div id="Categories" className="w-screen top-0 bg-cover h-screen relative overflow-x-hidden bg-[url('https://i.postimg.cc/jq9JzHg3/Rectangle-1.png')]">
          
          {/* 🔘Navigation Bar🔘 */}
          <Navbar />

          {/* 🔘Toast Message🔘 */}
          <ToastContainer />

          {/* 🔘Page Loading Animation🔘 */}
          {pageLoading ? <Loading />:null}

          {/* 🔘User Sign In 🔘 */}
            <div className='w-full h-full flex justify-center items-center mt-[100px] lg:mt-0'>
              <div className='z-10 lg:w-[80%] 2xl:w-[60%] w-[80%] lg:h-[60%] lg:flex'>
                <div className='bg-white/30 transparent w-full h-full p-5'>

                  <h2 className='text-white text-[32px] font-barlow mt-[50px] lg:mt-0'>Sign In</h2>

                  <div className=' w-full' onSubmit={submitHandler}>
                    <form className='grid mt-10 w-full'>

                      <div className='flex justify-center'>
                        <input type='email' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='e-mail' className='bg-white/20 border placeholder:text-white text-white w-[80%] h-[40px] px-5 focus:outline-none focus:border-white focus:ring-1 focus:ring-white' required/>
                        <div onClick={()=>{clearInputField('email')}} className='w-[40px] h-[40px] bg-white border flex justify-center items-center cursor-pointer'><FontAwesomeIcon icon={faRotateRight}/></div>
                      </div>

                      <div className='flex justify-center items-center'>
                        <input type='password' name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' className='bg-white/20 placeholder:text-white text-white border w-[80%] h-[40px] px-5 mt-5 focus:outline-none focus:border-white focus:ring-1 focus:ring-white' required/>
                        <div onClick={()=>{clearInputField('password')}} className='w-[40px] h-[40px] bg-white mt-5 border flex justify-center items-center cursor-pointer'><FontAwesomeIcon icon={faRotateRight}/></div>
                      </div>

                      <div className='flex justify-center '>
                        <input type='submit' name='submit' value='Log In' className='bg-white cursor-pointer border w-[80%] h-[40px] mt-5' />
                      </div>

                      <div className='flex justify-end mr-12 mt-2 '>
                        <p onClick={()=>{navigate('/forgetpassword')}} className='px-2 font-barlow text-[18px] bg-white/80 p-1 text-black cursor-pointer font-semibold'>Forgert Password?</p>
                      </div>

                      <div className='inline-flex justify-end mr-12 mt-5 '>
                        <p className=' font-barlow text-[18px] bg-white/80 p-1 text-red-600 font-extrabold '>{signInError}</p>
                      </div>

                      

                    </form>
                    <div className='flex justify-end mr-12 mt-8 '>
                        <p className=' font-barlow text-[18px] bg-white p-1 text-black'>Do you haven't an Account? <span className='text-red-500 font-bold cursor-pointer animate-pulse' onClick={()=>navigate('/signup')}> Sign Up Here</span> </p>
                    </div>
                  </div>

                </div>

                {/* 🔘 User sign in with google, facebbok and twitter 🔘 */}
                <div className='bg-white/20 transparent w-full h-full p-5'>
                  <h2 className='text-white text-[32px] font-barlow '>Or Sign In With</h2>

                  <div className=' w-full' onSubmit={submitHandler}>
                    <div className='grid mt-10 w-full'>
                      <div className='flex justify-center'>
                        <GoogleButton onClick={signInWithGoogleHandler} />
                      </div>

                      <div className='flex justify-center mt-5 cursor-pointer' onClick={signInWithFacebookHandler}>
                        <div className='bg-[#3B5998] flex justify-between p-[1px]'>
                          <div className='bg-white w-[50px] h-[50px]'>
                            <img src='https://i.postimg.cc/Gp9v0Y5S/icons8-facebook-96.png'/>
                          </div>
                          <div className='w-[185px] flex justify-center items-center text-white'> Sign in with Facebook</div>
                        </div>
                      </div>

                      <div className='flex justify-center mt-5 cursor-pointer' onClick={signInWithTwitterHandler}>
                        <div className='bg-[#00acee] flex justify-between p-[1px]'>
                          <div className='bg-white w-[50px] h-[50px]'>
                          <img src='https://i.postimg.cc/0jv6NJVv/icons8-twitter-96.png'/>
                          </div>
                          <div className='w-[185px] flex justify-center items-center text-white'> Sign in with Twitter</div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
        </div>
        
    </>
  );
}

export default SignIn;