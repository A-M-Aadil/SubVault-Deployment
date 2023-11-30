import { useEffect, useState } from "react";
import { getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged, updatePassword, isSignInWithEmailLink, signInWithEmailLink, signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";


function ResetPassword() {
  const navigate = useNavigate();                               // initialize Navigate State
  const auth = getAuth();                                       // initialize Firebase authentication
  const [email, setEmail] = useState();                           // user email state variable for set user email
  const [password, setPassword] = useState();                     // user password state variable for set user password
  const [passwordErr, setPasswordErr] = useState();               // user password error state variable for set errors
  const [passwordMatchErr, setpasswordMatchErr] = useState();     // user password match error state variable for set errors
  const [onSubmitErr, setonSubmitErr] = useState();               // on submit error state variable for set errors
  const [vPass, setVPass] = useState(false);                      // user password validate boolean state variable for validate password
  const [vRPass, setVRPass] = useState(false);                    // user password reenterd or confirm validate boolean state variable with new password


  // Validate user entered new password
  function validatePassword(event) {
    // store user ented new password
    let password = event.target.value;
    // regular expression for validate user password
    const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    // if user password is empty then set an error in password error
    if (password === '') {
      setPasswordErr('Please Enter Password')
    }
    // else if user password validate with regular expression then set validate password true and store new password
    else if (regExp.test(password)) {
      setPasswordErr('');
      setPassword(password);
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
    // if user password matched with rentered password then set validate re-entered passoed true
    if (rpassword === password) {
      setpasswordMatchErr('')
      setVRPass(true)
    } else {
      // else set password matched error
      setpasswordMatchErr('Password Does Not Matched')
    }
  }

  // user signout handler
  const signoutHandler = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // user sign out and navigate sign in page
      navigate('/signin')
    }).catch((error) => {
      // display errors in console
      console.log(error)
    });
  }

  // password change submit handler
  const submitHandler = (event) => {
    event.preventDefault();

    // check if validate password and validate re-enterd password both are true
    if (vPass && vRPass) {
      // then update new user passord
      setonSubmitErr('')
      //get current user
      const user = auth.currentUser;
      // update password
      updatePassword(user, password).then(() => {
        // sign out user
        signoutHandler();
      }).catch((error) => {
        // display errors in console
        console.log(error)
      });
    } else {
      // else set submit error
      setonSubmitErr('Please Submit Correct Information')
    }
  }

  useEffect(() => {
    // user authentication
    onAuthStateChanged(auth, (user) => {
      // if user not sign in
      if (!user) {
        // check user come from reset password link
        if (isSignInWithEmailLink(auth, window.location.href)) {
          // then get email from local storage
          let email = window.localStorage.getItem('emailForSignIn');
          // set user email
          setEmail(email);
          // user email false or null then navigate user sign in page
          if (!email) {
            navigate('/signin')
          }
          // confirm user sign in with link
          signInWithEmailLink(auth, email, window.location.href)
            .then((result) => {
              // remove user email from local storage
              window.localStorage.removeItem('emailForSignIn');
            })
            .catch((error) => {
              // display errors in console
              console.log(error)
            });
        } else {
          // else user authentication fail then navigate sign in page
          navigate('/signin')
        }
      }
    });
  }, []);

  return (
    <>
      {/* 🔘 Reset Password Interface 🔘 */}
      <div id="Categories" className="w-screen top-0 bg-cover h-screen relative overflow-x-hidden bg-[url('https://i.postimg.cc/tgPZQ6W9/photo-1440404653325-ab127d49abc1.jpg')]">
        <div className='z-10 w-full h-full flex justify-center items-center '>
          <div className='flex justify-center items-center w-[90%] md:w-[60%] h-[60%] text-center bg-white/70'>
            <div className=' w-full' >
              <h2 className=" font-barlow text-[48px] md:text-[68px]">Create New Password</h2>
              <form className='grid mt-8 w-full' onSubmit={submitHandler}>
                <label className="text-left ml-12 lg:ml-20">New Password</label>
                <div className='inline-flex justify-center '>
                  <input type='password' name='password' onChange={(e) => { validatePassword(e) }} placeholder='Password' className='bg-white placeholder:text-[#b9b9b9] text-black border w-[80%] h-[40px] px-5 mt-2 focus:outline-none focus:border-white focus:ring-1 focus:ring-white' required />
                </div>

                <div className='inline-flex justify-end mr-20 '>
                  <p>{passwordErr}</p>
                </div>
                <label className="text-left ml-12 lg:ml-20">Confirm Password</label>
                <div className='flex justify-center '>
                  <input type='password' name='Repassword' onChange={(e) => { validatePasswordMatch(e) }} placeholder='Password' className='bg-white placeholder:text-[#b9b9b9] text-black border w-[80%] h-[40px] px-5 mt-2 focus:outline-none focus:border-white focus:ring-1 focus:ring-white' required />
                </div>

                <div className='inline-flex justify-end mr-20 '>
                  <p>{passwordMatchErr}</p>
                </div>

                <div className='flex justify-center '>
                  <input type='submit' value='Reset Password' name='submit' className='bg-yellow-500 text-white font-barlow font-bold w-[80%] h-[40px] mt-5 cursor-pointer' />
                </div>

                <div className='inline-flex justify-end mr-20'>
                  <p>{onSubmitErr}</p>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default ResetPassword;