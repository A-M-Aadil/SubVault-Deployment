import '../styles/style.css'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, TwitterAuthProvider } from 'firebase/auth'
import { app } from '../components/FirebaseConfig';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button';
import Navbar from '../components/Navbar';
import { getDatabase, ref, onValue } from "firebase/database";
import Loading from '../components/Loading';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SignUp() {
  const auth = getAuth(app);                                      // initialize Firebase authentication
  const db = getDatabase();                                       // initialize Firebase database
  const navigate = useNavigate();                                 // initialize Navigate State
  const [email, setEmail] = useState();                           // user email state variable for set user email
  const [password, setPassword] = useState();                     // user password state variable for set user password
  const [confirmPassword, setConfirmPassword] = useState();       // user confirm password state variable for validate user password
  const [passwordErr, setPasswordErr] = useState();               // user password error state variable for set password error
  const [passwordMatchErr, setpasswordMatchErr] = useState();     // user password Matching error state variable for set password matching error
  const [onSubmitErr, setonSubmitErr] = useState();               // on submit error state variable for set errors
  const [vPass, setVPass] = useState(false);                      // user password validate boolean state variable for validate password
  const [vRPass, setVRPass] = useState(false);                    // user password re-enterd or confirm validate boolean state variable with new password
  const [pageLoading, setPageLoading] = useState(false);          // Page Loading boolean state variable use to display Page loading animation

  // Sign Up with Google handler
  const signInWithGoogleHandler = () => {
    // authentication provider
    const provider = new GoogleAuthProvider;
    // sign up with pop up window
    signInWithPopup(auth, provider)
      .then(() => {
        // when sign up user navigate home page
        navigate('/home')
      })
      .catch((err) => {
        // show errors in console
        console.log(err)
      })
  }

  // Sign Up with Facebook handler
  const signInWithFacebookHandler = () => {
    // authentication provider
    const provider = new FacebookAuthProvider;
    // sign up with pop up window
    signInWithPopup(auth, provider)
      .then(() => {
        // when sign up user navigate home page
        navigate('/home')
      })
      .catch((err) => {
        // show errors in console
        console.log(err)
      })
  }

  // Sign Up with Twitter handler
  const signInWithTwitterHandler = () => {
    // authentication provider
    const provider = new TwitterAuthProvider;
    // sign up with pop up window
    signInWithPopup(auth, provider)
      .then(() => {
        // when sign up user navigate home page
        navigate('/home')
      })
      .catch((err) => {
        // show errors in console
        console.log(err)
      })
  }

  // Validate user entered new password
  function validatePassword(event) {
    // store user ented new password
    let password = event.target.value;
    setPassword(password);
    // regular expression for validate user password
    const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    // if user password is empty then set an error in password error
    if (password === '') {
      setPasswordErr('Please Enter Password')
    }
    // else if user password validate with regular expression then set validate password true and store new password
    else if (regExp.test(password)) {
      setPasswordErr('');
      setVPass(true)
    }
    //  else if user password validate with regular expression then set password error
    else if (!regExp.test(password)) {
      setPasswordErr('Enter Valid Password')
    }
    else {
      // else password error empty
      setPasswordErr('')
    }
  }

  // valide user entered password matched with confirm password
  function validatePasswordMatch(event) {
    // store user re-entered password or confirm password 
    let rpassword = event.target.value;
    setConfirmPassword(rpassword);
    // if user password matched with rentered password then set validate re-entered passoed true
    if (rpassword === password) {
      setpasswordMatchErr('');
      setVRPass(true);
    } else {
      // else set password matched error
      setpasswordMatchErr('Password Does Not Matched');
    }
  }

  // new user sign up with email password handler
  const submitHandler = (event) => {
    event.preventDefault();

    // check if validate password and validate re-enterd password both are true
    if (vPass && vRPass) {
      // then no erros
      setonSubmitErr('')

      // create new user email password authentication
      createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
          // send email verification to the user
          sendEmailVerification(auth.currentUser)
            .then(() => {
              // then navigate verify page
              navigate('/verify');
            });
        })
        .catch(err => { console.log(err) })
    } else {
      // else set an error
      setonSubmitErr('Please Submit Correct Information')
    }
  }

  // clear input fields 
  const clearInputField =( field )=>{
    switch (field) {
      // clear password input field
      case 'password':
        setPassword('');
        break;

      // clear confirm password input field
      case 'confirmpassword':
        setConfirmPassword('');
        break;

      // clear email input field
      case 'email':
        setEmail('');
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    // enable page loading
    setPageLoading(true);
    // user authentication
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // if user authenticate successfully then check user id is an admin id 
        // check user id with firbase realtime databse admin ids
        onValue(ref(db, 'Admins/' + user.uid), (snapshot) => {
          const data = snapshot.val();
          // if user id not in admin id then navigate to home page
          if (data === null) {
            navigate('/home')
            // disable page loading
            setPageLoading(false);
          } else {
            // if user id is equal to admin id then navigate dashboard page and disable page loading
            if (auth.currentUser.uid === data.username) {
              navigate('/dashboards')
              setPageLoading(false);
            } else {
              // else naviagete home page and disable page loading
              navigate('/home')
              setPageLoading(false);
            }
          }

        });
      } else {
        // else disable page loading
        setPageLoading(false);
      }
    });

  }, [])

  return (
    <>
      {/* 🔘 User Sign Up Interface 🔘 */}
      <div id="Categories" className="w-screen top-0 bg-cover h-screen relative overflow-x-hidden bg-[url('https://i.postimg.cc/jq9JzHg3/Rectangle-1.png')]">

        {/* 🔘Navigation Bar🔘 */}
        <Navbar />

        {/* 🔘Page Loading Animation🔘 */}
        {pageLoading ? <Loading /> : null}

        {/* 🔘User Sign Up 🔘 */}
        <div className='w-full h-full flex justify-center items-center mt-[100px] lg:mt-0'>
          <div className='z-10 lg:w-[80%] 2xl:w-[60%] w-[80%] lg:h-[70%] lg:flex'>
            <div className='bg-white/30 transparent w-full h-full p-5'>

              <h2 className='text-white text-[32px] font-barlow mt-[50px] lg:mt-0'>Sign Up</h2>

              <div className=' w-full' onSubmit={submitHandler}>
                <form className='grid mt-10 w-full'>

                  <div className='flex justify-center'>
                    <input type='email' name='email' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='e-mail' className='bg-white/20 border placeholder:text-white text-white w-[80%] h-[40px] px-5 focus:outline-none focus:border-white focus:ring-1 focus:ring-white' required />
                    <div onClick={()=>{clearInputField('email')}} className='w-[40px] h-[40px] bg-white border flex justify-center items-center cursor-pointer'><FontAwesomeIcon icon={faRotateRight}/></div>
                  
                  </div>

                  <div className='inline-flex justify-center '>
                    <input type='password' name='password' value={password} onChange={(e) => { validatePassword(e) }} placeholder='Password' className='bg-white/20 placeholder:text-white text-white border w-[80%] h-[40px] px-5 mt-5 focus:outline-none focus:border-white focus:ring-1 focus:ring-white' required />
                    <div onClick={()=>{clearInputField('password')}} className='w-[40px] h-[40px] bg-white mt-5 border flex justify-center items-center cursor-pointer'><FontAwesomeIcon icon={faRotateRight}/></div>
                  </div>

                  <div className='inline-flex justify-end mr-12 '>
                    <p className=' font-extrabold text-red-600'>{passwordErr}</p>
                  </div>

                  <div className='flex justify-center '>
                    <input type='password' name='Repassword' value={confirmPassword} onChange={(e) => { validatePasswordMatch(e) }} placeholder='Password' className='bg-white/20 placeholder:text-white text-white border w-[80%] h-[40px] px-5 mt-5 focus:outline-none focus:border-white focus:ring-1 focus:ring-white' required />
                    <div onClick={()=>{clearInputField('confirmpassword')}} className='w-[40px] h-[40px] bg-white mt-5 border flex justify-center items-center cursor-pointer'><FontAwesomeIcon icon={faRotateRight}/></div>
                  </div>

                  <div className='inline-flex justify-end mr-12 '>
                    <p className=' font-extrabold text-red-600'>{passwordMatchErr}</p>
                  </div>

                  <div className='flex justify-center '>
                    <input type='submit' value='Sign Up' name='submit' className='bg-white border w-[80%] h-[40px] mt-5 cursor-pointer' />
                  </div>

                  <div className='inline-flex justify-end mr-12 '>
                    <p className=' font-extrabold text-red-600'>{onSubmitErr}</p>
                  </div>

                </form>

                <div className='flex justify-end mr-12 mt-10 '>
                  <p className=' font-barlow text-[18px] bg-white p-1 text-black'>Do you haven an Account? <span className='text-red-500 font-bold cursor-pointer animate-pulse' onClick={() => navigate('/signin')}> Sign In Here</span> </p>
                </div>
              </div>

            </div>

            {/* 🔘 User sign up with google, facebbok and twitter 🔘 */}
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
                        <img src='https://i.postimg.cc/Gp9v0Y5S/icons8-facebook-96.png' />
                      </div>
                      <div className='w-[185px] flex justify-center items-center text-white'> Sign in with Facebook</div>
                    </div>
                  </div>

                  <div className='flex justify-center mt-5 cursor-pointer' onClick={signInWithTwitterHandler}>
                    <div className='bg-[#00acee] flex justify-between p-[1px]'>
                      <div className='bg-white w-[50px] h-[50px]'>
                        <img src='https://i.postimg.cc/0jv6NJVv/icons8-twitter-96.png' />
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

export default SignUp;