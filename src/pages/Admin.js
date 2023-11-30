import { useEffect, useState } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import Navbar from '../components/HomeNavbar';

function Admin() {
    const navigate = useNavigate();         // initialize Navigate State
    const db = getDatabase();               // initialize Firebase database
    const auth = getAuth();                 // initialize Firebase authentication

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
                            // if user id is equal to admin id then nothing
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
            <div id="Categories" className="w-screen top-0 bg-cover h-screen relative overflow-x-hidden bg-[url('https://i.postimg.cc/SNNLQqCz/daan-geurts-M9-Qwxr-G-dp-E-unsplash.jpg')]">
                {/* 🔘 Naviagation Bar 🔘 */}
                <Navbar />

                <div className="grid grid-cols-1 lg:grid-cols-2 mt-[100px] w-full">
                    {/* 🔘 Admin Events : Subtitles, Admin and Messages 🔘 */}
                    <div className="m-5 w-full">
                        <h2 className="text-white text-[68px] lg:text-[96px] font-barlow font-bold">Manage <br />Movie Sub Website</h2>
                    </div>
                    <div className="m-5 w-full">
                        <div className="m-5 flex justify-end">
                            <button onClick={() => { navigate('/admin/msubtitles') }} className="m-5 w-full bg-white rounded-xl text-[48px] lg:text-[64px] font-semibold h-[150px]">Subtiles</button>
                        </div>
                        <div className="m-5 flex justify-end">
                            <button onClick={() => { navigate('/admin/madmins') }} className="m-5 w-full bg-white rounded-xl text-[48px] lg:text-[64px] font-semibold h-[150px]">Admins</button>
                        </div>
                        <div className="m-5 flex justify-end">
                            <button onClick={() => { navigate('/admin/messages') }} className="m-5 w-full bg-white rounded-xl text-[48px] lg:text-[64px] font-semibold h-[150px]">Messages</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;