import { useEffect, useState} from "react";
import {getAuth, onAuthStateChanged  } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { getDatabase, ref, onValue } from "firebase/database";

function Messages() {
    const navigate = useNavigate();                             // initialize Navigate State
    const db = getDatabase();                                   // initialize Firebase database
    const auth = getAuth();                                     // initialize Firebase authentication
    const [userMessages, setUserMessages] = useState([]);       // user message state variable for set user message
    

    // get messages from database
    const getMessages = () =>{
        const messageRef = ref(db, 'Messages/' );               // database message location or reference
        // get messages from database
        onValue(messageRef, (snapshot) => {
            //if there are no any message then return or break function 
            if (snapshot === null) {
                return
            }
            // else then store messages in user messages state variable
            const data = snapshot.val();
            setUserMessages(data);
        });
    }
    

    useEffect(() => {
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
                    } else {
                        if (auth.currentUser.uid === data.username) {
                            // if user id is equal to admin id then stay current page and load Messages
                            getMessages();
                        } else {
                            // else naviagete home page
                            navigate('/home')
                        }
                    }
                });
            } else {
                // else user authentication fail then navigate sign in page
                navigate('/signin')
            }
        });
    }, []);

    return (
        <>
        {/* 🔘 User Messages Interface 🔘 */}
        <div className="w-screen top-0 bg-cover h-screen relative overflow-x-hidden bg-black">
            <div className='w-full flex justify-center'>
                <div className='w-[80%] lg:w-[70%] xl:w-[60%] bg-white flex justify-center m-10 rounded-lg'>
                    <div className='w-full'>
                    { userMessages.length > 0 ?
                        <div className='w-full'>
                        {/* 🔘 Display all messages from user messsages variable 🔘 */}
                        {
                            userMessages.map((msg)=>(
                                <div className=' m-5 border-b-4'>
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="md:text-[22px] font-bold font-barlow">{msg.name}</p>
                                            <p className=" font-barlow">{msg.email}</p>
                                            <p className="text-[#7c7c7c] font-barlow">{msg.username}</p>
                                        </div>
                                        <p className="text-[#7c7c7c] font-barlow">{msg.date}</p>
                                    </div>
                                    <div className="my-4">
                                        <p className="text-[18px] md:text-[22px] font-barlow">{msg.message}</p>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    :
                    <div className='w-full m-5 border-b-4'>
                        
                        <div className="my-4">
                            <p>No Messages!..</p>
                        </div>
                    </div>
                    }
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
  
export default Messages;