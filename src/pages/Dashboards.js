import { useEffect, useState } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";


function Dashboards() {
    const navigate = useNavigate();             // initialize Navigate State
    const db = getDatabase();                   // initialize Firebase database
    const auth = getAuth();                     // initialize Firebase authentication

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
                            // if user id is equal to admin id then stay current page
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
            {/* 🔘 Admin Dashborad Interface 🔘 */}
            <div id="Categories" className="w-screen top-0 bg-cover h-screen relative overflow-x-hidden bg-[url('https://i.postimg.cc/tgPZQ6W9/photo-1440404653325-ab127d49abc1.jpg')]">
                <div className='z-10 w-full h-full flex justify-center items-center '>
                    <div className='flex justify-center items-center w-[60%] h-[60%] text-center bg-white/70'>
                        <div className=''>
                            <h2 className=' font-jockey text-[60px]'>DASHBOARDS</h2>
                            <p className=' font-barlow text-[32px]'>Visit</p>
                            <div className='mt-5'>
                                <button onClick={() => { navigate('/admin') }} className='m-2 bg-yellow-500 w-[220px] h-[40px] rounded-lg text-white font-barlow text-[20px]'>Admin Dashboard</button>
                                <button onClick={() => { navigate('/home') }} className='m-2 bg-yellow-500 w-[220px] h-[40px] rounded-lg text-white font-barlow text-[20px]'>User Home</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Dashboards;