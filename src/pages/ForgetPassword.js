import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, sendSignInLinkToEmail } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgetPassword() {
    const navigate = useNavigate();                                 // initialize Navigate State
    const auth = getAuth();                                         // initialize Firebase authentication
    const [userEmail, setUserEmail] = useState();                   // user email state variable for set user email
    const [resetLinkSend, setResetLinkSend] = useState(false);      // rest link send boolean state variable for check link sent or not
    const currentPage = window.location.href.split("/forgetpassword")   // Current page location 
    const [emailDelivarable, setEmailDelivarable] = useState(false);       // user email dilivarable boolean state variable for validate email

    //Reset link send function
    const resetLinkHandler = () => {
        // email validation
        fetch('https://emailvalidation.abstractapi.com/v1/?api_key=e1038d07d508443da348232cd7498630&email='+userEmail)      // Fetch data from APi
        .then(response => response.json())                                                                                  // get response from api
        .then(json => {
            // if user email delivarable then set email delivarable true
            if (json.deliverability === 'DELIVERABLE') {
                setEmailDelivarable(true)
            }else{
                //else false
                setEmailDelivarable(false)
            }
        });
        
        // if email not delivarable then toast message and break or return function
        if (!emailDelivarable) {
            toast("Please Enter Valid Email");
            return;
        }
        // set reset link send is *true*
        setResetLinkSend(true);

        // send reset password link to user
        sendSignInLinkToEmail(auth, userEmail, { url: currentPage[0] + '/resetpassword', handleCodeInApp: true })
            .then(() => {
                // send alert to user check mail box
                alert('Check your mail box')
                // store user email
                localStorage.setItem('emailForSignIn', userEmail);
            })
            .catch((error) => {
                // if got any error set reset link send is *false*
                setResetLinkSend(false);
            });
    }

    useEffect(() => {
        // user authentication
        onAuthStateChanged(auth, (user) => {
            //if user sign in then navigate home page
            if (user) {
                navigate('/home')
            }
        });
    }, []);

    return (
        <>
            {/* 🔘 Forget Password Interface 🔘 */}
            <div id="Categories" className="w-screen top-0 bg-cover h-screen relative overflow-x-hidden bg-[url('https://i.postimg.cc/tgPZQ6W9/photo-1440404653325-ab127d49abc1.jpg')]">
                {/* 🔘 Toast Messages 🔘 */}
                <ToastContainer />
                
                <div className='z-10 w-full h-full flex justify-center items-center '>
                    <div className="absolute top-10 left-10 text-white">
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} onClick={() => navigate(-1)} className=" cursor-pointer text-[38px] md:text-[48px] mx-2" />
                    </div>
                    <div className='flex justify-center items-center w-[90%] md:w-[60%] h-[60%] text-center bg-white/70'>
                        <div className='px-5'>
                            <h2 className=' font-jockey text-[48px] md:text-[60px]'>Reset Your Password!..</h2>
                            <p className=' font-barlow text-[28px] md:text-[32px]'>Enter your e-mail Address</p>
                            <div className='mt-5'>
                                <input type="email" onChange={(e) => { setUserEmail(e.target.value) }} placeholder="email" className="w-full md:w-[350px] h-[40px] rounded-lg pl-5" />
                                <button disabled={resetLinkSend} onClick={() => { resetLinkHandler() }} className='w-full mt-2 lg:mt-0 md:m-2 bg-yellow-500 md:w-[220px] h-[40px] rounded-lg text-white font-barlow text-[20px]'>Send Link</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ForgetPassword;