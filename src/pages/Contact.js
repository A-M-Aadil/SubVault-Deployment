import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, sendSignInLinkToEmail } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { faArrowRight, faArrowAltCircleLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDatabase, ref, set, onValue } from "firebase/database";


function Contact() {
    const navigate = useNavigate();                         // initialize Navigate State
    const db = getDatabase();                               // initialize Firebase database
    const auth = getAuth();                                 // initialize Firebase authentication
    const [userEmail, setUserEmail] = useState();           // user email state variable for set user email
    const [userName, setUserName] = useState();             // user name state variable for set user name
    const [userMessage, setUserMessage] = useState();       // user message state variable for set user message
    const [userMessageId, setUserMessageId] = useState();       // user message id state variable for set user message id
    const [emailDelivarable, setEmailDelivarable] = useState(false);       // user email dilivarable boolean state variable for validate email

    // Send message funtion that store messages in database
    const sendMessageHandler = (event) => {
        event.preventDefault();

        fetch('https://emailvalidation.abstractapi.com/v1/?api_key=e1038d07d508443da348232cd7498630&email='+userEmail)      // Fetch data from APi
        .then(response => response.json())                                                                // get response from api
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

        // get current date
        var date = new Date();
        const formattedDate = date.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('/').reverse().join('-');


        let usernameId;         // initialize user name id
        // if user signin then current user id is user name
        if (auth.currentUser) {
            usernameId = auth.currentUser.uid;
        }else{
            // else current user id is null
            usernameId = 'null';
        }

        // store messages in firebase database with user details
        set(ref(db, 'Messages/' + userMessageId), {
            name: userName,
            messageId: userMessageId,
            username: usernameId,
            date: formattedDate,
            email: userEmail,
            message: userMessage
        });
        // toast message
        toast("Your Message Sent");
        setUserName('');
        setUserEmail('');
        setUserMessage('');
    }

    const clearInputField =( field )=>{
        switch (field) {
          // clear password input field
          case 'username':
            setUserName('');
            break;
    
          // clear email input field
          case 'email':
            setUserEmail('');
            break;
    
        case 'message':
                setUserMessage('');
                break;

          default:
            break;
        }
      }

    useEffect(()=>{
        const messageRef = ref(db, 'Messages/');            // database message location or reference
        // get messages from database 
        onValue(messageRef, (snapshot) => {
            // if messages are true then genarate id using messages lenght
            if (snapshot.val()) {
                const data = snapshot.val();
                setUserMessageId(Object.values(data).length);
            } else {
                // else message id start from 0
                setUserMessageId(0);
            }
        });
      },[]);
    
    return (
        <>
            {/* 🔘 Toast Messages 🔘 */}
            <ToastContainer />
            {/* 🔘 Contact Interface 🔘 */}
            <div id="contact" className="w-screen top-0 bg-cover h-screen relative overflow-x-hidden bg-[url('https://i.postimg.cc/qvJbVkR8/daniel-reyes-rx-I8rz-F-rm8-unsplash.jpg')]">
                <div className='z-10 w-full h-full flex justify-center items-center '>
                    <div className='flex justify-center items-center w-[90%] md:w-[60%] px-4 py-10 text-center bg-white/90'>
                        <div className=''>

                            {/* 🔘 Back Button and Title 🔘 */}
                            <div className="flex justify-start">
                                <h2 className=' font-jockey text-[48px] md:text-[60px]'><FontAwesomeIcon icon={faArrowAltCircleLeft} onClick={() => navigate(-1)} className=" cursor-pointer text-[38px] md:text-[48px] mx-2" />Contact Us</h2>
                            </div>
                            <p className=' font-barlow text-[22px] md:text-[32px]'>Questions, bug reports, feedbacks <FontAwesomeIcon icon={faArrowRight} className="text-[28px] mx-2" /> we are here for it all.</p>
                            <div className='mt-5 w-full'>

                                {/* 🔘 Contact Form 🔘 */}
                                <form onSubmit={sendMessageHandler}>
                                    <div className="w-full grid justify-center">
                                        <label className="text-left">Name</label>
                                        <div className=" flex">
                                        <input type="text" value={userName} onChange={(e) => { setUserName(e.target.value) }} placeholder="name" className="border-2 border-black w-[400px] lg:w-[600px] px-5 h-[40px]" required />
                                        <div onClick={()=>{clearInputField('username')}} className='w-[40px] h-[40px] bg-white border flex justify-center items-center cursor-pointer'><FontAwesomeIcon icon={faRotateRight}/></div>
                                        </div>
                                    </div>

                                    <div className="w-full grid justify-center mt-4">
                                        <label className="text-left">Email</label>
                                        <div className="flex">
                                        <input type="email" value={userEmail} onChange={(e) => { setUserEmail(e.target.value) }} placeholder="e-mail" className="border-2 border-black w-[400px] lg:w-[600px] px-5 h-[40px]" required />
                                        <div onClick={()=>{clearInputField('email')}} className='w-[40px] h-[40px] bg-white border flex justify-center items-center cursor-pointer'><FontAwesomeIcon icon={faRotateRight}/></div>
                                        </div>
                                    </div>

                                    <div className="w-full grid justify-center mt-4">
                                        <label className="text-left">Message</label>
                                        <div className="flex">
                                        <textarea rows='5' value={userMessage} onChange={(e) => { setUserMessage(e.target.value) }} placeholder="Message here!.." className="border-2 border-black w-[400px] lg:w-[600px] px-5 py-2" required />
                                        <div onClick={()=>{clearInputField('message')}} className='w-[40px] h-[40px] bg-white border flex justify-center items-center cursor-pointer'><FontAwesomeIcon icon={faRotateRight}/></div>
                                        </div>
                                    </div>

                                    <div className="w-full grid justify-center mt-4">
                                        <input type="Submit" value='Send' className="bg-yellow-500 mr-[40px] text-white font-bold font-barlow text-[22px] w-[450px] cursor-pointer lg:w-[600px] px-5 h-[40px]" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>                  
                </div>
            </div>

        </>
    );
}
// export now
export default Contact;
