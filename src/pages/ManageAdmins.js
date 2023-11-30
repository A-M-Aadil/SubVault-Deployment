import { useEffect, useState } from "react";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import Navbar from '../components/HomeNavbar';
import Loading from '../components/Loading'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ManageAdmin() {
    const navigate = useNavigate();                             // initialize Navigate State
    const db = getDatabase();                                   // initialize Firebase database
    const auth = getAuth();                                     // initialize Firebase authentication
    const [adminUid, setAdminUid] = useState('');               // admin user id state variable for set admin uid
    const [delAdminUid, setDelAdminUid] = useState('');         // delete admin user id state variable for delete admin uid
    const [checkloading, setLoading] = useState(false);         // check loading boolean state variable use to display Page loading animation
    const [isAnAdmin, checkIsAnAdmin] = useState(false);        // is an admin boolean state variable for get and set user is a admin or not
    const [newAdmin, setNewAdmin] = useState(false);            // new admin state variable for create new admin 

    // check admin status and check admin uid
    const checkCreateAdminUid = (auid) => {
        // auid : admin user id
        // if admin user id null or empty then return or break function 
        if (auid === null || auid === '') {
            return;
        }

        // check new admin user id already exist or not
        onValue(ref(db, 'Admins/' + auid), async (snapshot) => {
            const data = snapshot.val();
            //enable page loading animation
            setLoading(true);
            // if new admin uid not exist then set user id in new admin id and disable page loading
            if (data === null) {
                setLoading(false);
                setNewAdmin(true);
                setAdminUid(auid);
                return
            }
            // else admin already exist set new admin *false* and disable page loading
            setLoading(false)
            setNewAdmin(false)
            setAdminUid(auid);
        }, []);
    }


    // create new admin
    async function createAdminHandler() {
        // new admin user id null or empty then return or break function 
        if (adminUid === null || adminUid === '') {
            return;
        }

        // if user id is new admin id then create admin
        if (newAdmin) {
            // store user id in database admin user id section 
            set(ref(db, 'Admins/' + adminUid), {
                username: adminUid
            });
            // toast successfull
            toast(adminUid + " created as an admin");
            return;
        } else {
            // else toast alrady exists
            toast('Already an admin')
        }


    }

    // check admin user id for delete admin
    const checkAdminUid = (auid) => {
        // auid : admin user id
        // if admin user id null or empty then return or break function 
        if (auid === null || auid === '') {
            return;
        }

        // check admin user id already exist or not
        onValue(ref(db, 'Admins/' + auid), async (snapshot) => {
            const data = snapshot.val();
            //enable page loading animation
            setLoading(true);
            // if admin uid exist then set user id is *true*, set delete admin id and disable page loading
            if (data !== null) {
                setLoading(false);
                checkIsAnAdmin(true);
                setDelAdminUid(auid);
                return
            }
            // else admin not exist then set admin *false* and disable page loading
            setLoading(false)
            checkIsAnAdmin(false)
            setDelAdminUid(auid);
        }, []);
    }

    // delete admin
    const deleteAdminHandler = () => {
        //delete admin user id null or empty then return or break function 
        if (delAdminUid === null || delAdminUid === '') {
            return;
        }

        // if user id is admin id then delete admin admin
        if (isAnAdmin) {
            // remove admin id from firebase database 
            remove(ref(db, 'Admins/' + delAdminUid)).then(() => {
                // toast sucessfull
                toast(delAdminUid + ' delete successfull')
            }).catch((err) => { alert(err) })
        } else {
            // else toast user not admin
            toast(delAdminUid + ' not an admin')
        }
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
            <div id="Categories" className="w-screen top-0 bg-cover h-screen relative overflow-x-hidden bg-[url('https://i.postimg.cc/YSBTV0GF/images.jpg')]">
                {/* 🔘Navigation Bar🔘 */}
                <Navbar />

                {/* 🔘Page loading🔘 */}
                {checkloading ? <Loading /> : null}

                {/* 🔘Toast Messages🔘 */}
                <ToastContainer />

                {/* 🔘 Manage Admin Interface🔘 */}
                <div className="lg:flex items-center w-full mt-[100px] p-5">
                    {/* 🔘 create new admin 🔘 */}
                    <div className="w-full h-full m-5">
                        <div>
                            <p className='text-[#b9b9b9] text-[32px] text-center'>Add New Admin</p>
                            <div className='flex mt-10 justify-center'>
                                <div className='flex w-[60%] mb-3 justify-start'>
                                    <p className='text-[#b9b9b9] '>Admin User Id:</p>
                                </div>
                            </div>

                            <div className='flex mt-3 justify-center'>
                                <input type='text' onChange={(e) => { checkCreateAdminUid(e.target.value) }} className='text-white bg-white/20 pl-5 w-[60%] h-[60px]' />
                            </div>

                            <div className='flex mt-3 justify-center'>
                                <button onClick={() => { createAdminHandler() }} className='w-[60%] h-[60px] bg-white'>Create Admin</button>
                            </div>
                        </div>
                    </div>

                    {/* 🔘 delete admin 🔘 */}
                    <div className="w-full h-full m-5">
                        <div>
                            <p className='text-[#b9b9b9] text-[32px] text-center'>Delete Admin</p>
                            <div className='flex mt-10 justify-center'>
                                <div className='flex w-[60%] mb-3 justify-start'>
                                    <p className='text-[#b9b9b9] '>Admin User Id:</p>
                                </div>
                            </div>

                            <div className='flex mt-3 justify-center'>
                                <input type='text' onChange={(e) => { checkAdminUid(e.target.value) }} className='text-white bg-white/20 pl-5 w-[60%] h-[60px]' />
                            </div>

                            <div className='flex mt-3 justify-center'>
                                <button onClick={() => { deleteAdminHandler() }} className='w-[60%] h-[60px] bg-white'>Delete  Admin</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageAdmin;