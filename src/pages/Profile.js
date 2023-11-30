import '../styles/style.css'
import {getAuth, onAuthStateChanged, updateProfile, updatePassword, signOut } from 'firebase/auth'
import { app } from '../components/FirebaseConfig';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { DBStorage } from '../components/FirebaseStorageConfig';
import { v4 } from 'uuid';

function Profile() {
    const auth = getAuth();                                             // initialize Firebase authentication
    const navigate = useNavigate();                                     // initialize Navigate State
    const [changeNameB, setChangeNameB] = useState(false);              // changeNameB : change name button boolean state variable use to display Change name
    const [disableButtons, setdisableButtons]  = useState(false);       // Disable buttons boolean state variable use to disable all the buttons
    const [userDetails, setuserDetails]  = useState([]);                // user details state variable for get and set user details
    const [changeDisName, setchangeDisName]  = useState([]);            // change diplay name state variable for set user new user name or change name
    const [photo, setPhoto]  = useState(null);                          // photo state variable for get and set user profile photo
    const [fileChoose, setfileChoose]  = useState(false);               // file choose boolean state variable for set file
    const [newPass, setnewPass]  = useState();                          // New Password state variable for set new user password
    const [newCPass, setnewCPass]  = useState();                        // New Confirm Password state variable for confirm password with new user password

    // user sign out handler function
    const signoutHandler = () =>{
        signOut(auth).then(() => {
            navigate('/signin')
        }).catch((error) => {
            console.log(error)
        });
    }

    // Create new user password handler function
    const newPasswordhandler = () =>{
        // check new password matched with confirm password then store in new password variable
        if (newPass === newCPass) {
            const user = auth.currentUser;
            const newPassword = newPass;

            // regular expression for validate user password
            const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

            // if new password is empty then alert to user
            if (newPass === '') {
                alert('Please Enter Password')
            }
            // else is validate password with regulare expression
            else if (regExp.test(newPass)) {
                // then update new password and sign out user
                updatePassword(user, newPassword).then(() => {
                    signoutHandler();
                }).catch((error) => {
                // erros display in console
                    console.log(error)
                });
            }
            // if password not validated with regular expression then show alert
            else if (!regExp.test(newPass)) {
                alert('Enter Valid Password')
            }
            else{
                
            }

            
        }
        // else then show alert to user password does not matched
        else{
            alert('Password does not matched!.. Please enter correctly')
        }
    }

    // profile picture upload handling function
    const fileUpload = async () => {
        // if user not select file then retuen or break function
        if (!fileChoose) {
            return;
        }

        const storage = getStorage();                                               // initialize firebase storage
        const imageFileeRef = ref(storage, 'images/'+userDetails.uid+'.png');          // storage image location or reference

        // upload profile image
        uploadBytes(imageFileeRef, photo).then((snapshot) => {
            // then get download link from storage
        getDownloadURL(imageFileeRef).then((url)=>{
            // update profile picture or store image url in user profile
            updateProfile(auth.currentUser, {
                photoURL: url
                }).then(() => {
                // profile updated
                alert('Profile upload successfull')
                }).catch((error) => {
                // display error in console
                console.log(error)
                });
            });
        });
    }

    // user selected file handle
    const handleFile = (e) => {
        // if user selected file or files then set first file and file choose *true*
        if (e.target.files[0]) {
            setfileChoose(true);
            setPhoto(e.target.files[0]);
        }else{
            // else file choose *false*
            setfileChoose(false);
            setPhoto(null)
        }
    }

    // Update user display name
    const updateDisplayName = ()=>{
        // if user display name not changed then return or break function
        if (changeDisName === '' || changeDisName === null) {
            return
        }else{
            // else update user display name
            updateProfile(auth.currentUser, {
                displayName: changeDisName
                }).then(() => {
                // profile updated and set chanege name button *false* 
                setChangeNameB(false)
                }).catch((error) => {
                // display error in console
                console.log(error)
                });
        }
        
    }

    useEffect(()=>{
        // user authentication
        onAuthStateChanged(auth, (user) => {
            // user sign in then get and set user details
        if (user) {
            setuserDetails(user);
            // get user authentication provider
            const userProvider = user.providerData[0].providerId;
            // if user authentication provider is password then enable buttons
            if (userProvider === 'password') {
                setdisableButtons(false)
            }else{
                // else any other authentication provider (google, facebook, twitter) then disable buttons
                setdisableButtons(true)
            }
        } else {
            // else user authentication fail then navigate sign in page
            navigate('/signin')
        }
        });

        
    },[])

  return (
    <>
        {/* 🔘 User Profile Interface 🔘 */}
        <div id="Categories" className="w-screen top-0 bg-cover h-screen relative overflow-x-hidden bg-black">
            
            {/* 🔘 Back button 🔘 */}
            <div className='w-full h-[20%] text-white'>
                <div className='pt-5 pl-10'>
                    <img className=' cursor-pointer' onClick={()=>navigate('/home')} src='https://i.postimg.cc/bNpRH2VS/icons8-back-arrow-80.png'/>
                </div>
            </div>

            {/* 🔘 User Profile details : name, email, profile picture 🔘 */} 
            <div class="hidden mx-10 xl:grid grid-rows-3 grid-flow-col gap-4">
                <div class="row-span-3 text-center">
                    <div className='flex justify-center'>
                        <div className=' w-[150px] h-[150px] rounded-full bg-black'>
                            {userDetails.photoURL ?
                            < img className='w-full h-full' src={userDetails.photoURL} alt='propic'/>:
                            < img className='w-full h-full' src='https://i.postimg.cc/rFMMDnkW/userPNG.png' alt='propic'/>}
                        </div>
                    </div>
                    <p className="text-[#7c7c7c] text-[36px] font-barlow ">{userDetails.displayName}</p>
                    <p className="text-[#7c7c7c] text-[24px] font-barlow ">{userDetails.email}</p>
                    
                </div>

                <div class="col-span-2">
                    <p className="text-[#7c7c7c] text-[36px] border-b font-barlow ">
                    USER DETAILS
                    </p>
                </div>

                {/* 🔘 Change Profile picture 🔘 */}
                <div class="row-span-2 col-span-2 ">
                    <div className='w-full border rounded-lg'>
                        <div className='m-5 flex justify-between'>
                            <p className="text-[#7c7c7c] text-[26px] font-barlow ">Set Profile Picture {fileChoose}</p>
                            <div>
                                <input type='file' accept="image/png,image/jpeg" onChange={handleFile} className='text-white text-[22px] font-barlow rounded-lg '/>
                                <button disabled={disableButtons || !fileChoose} onClick={fileUpload} className="text-black text-[26px] font-barlow border p-2 rounded-lg bg-white/80">Upload Image</button>
                            </div>
                        </div>
                    </div>

                    {/* 🔘 Change Name 🔘 */}
                    <div className='w-full border rounded-lg mt-5'>
                        <p className="text-[#7c7c7c] text-[26px] font-barlow m-5">Name</p>
                        <div className='m-5 flex justify-between'>
                            <p className="text-[#7c7c7c] text-[26px] font-barlow ">{userDetails.displayName}</p>
                            { changeNameB ?
                                <div>
                                    <input type='text' onChange={(e)=>{setchangeDisName(e.target.value)}} className=' bg-transparent border mx-5 h-[50px] w-[250px] text-white pl-5'/>
                                    
                                    <button onClick={updateDisplayName} className="text-black text-[26px] font-barlow border p-2 rounded-lg bg-white/80">Change Name</button>
                                </div>
                                :
                                <button disabled={disableButtons} onClick={()=>setChangeNameB(!changeNameB)} className="text-black text-[26px] font-barlow border p-2 rounded-lg bg-white/80">Change Name</button>
                            }
                        </div>
                    </div>

                    {/* 🔘 Change Password 🔘 */}
                    <div className='w-full border rounded-lg mt-5'>
                        <p className="text-[#7c7c7c] text-[26px] font-barlow m-5">Password</p>
                        <div className='m-5 flex justify-between'>
                            <p className="text-[#7c7c7c] text-[26px] font-barlow ">Change Password</p>
                            { changeNameB ?
                                <div>
                                    <input type='password' onChange={(e)=>{setnewPass(e.target.value)}} placeholder='New Password' className=' bg-transparent border mx-5 h-[50px] w-[250px] text-white pl-5'/>
                                    <input type='password' onChange={(e)=>{setnewCPass(e.target.value)}} placeholder='Confirm Password' className=' bg-transparent border mx-5 h-[50px] w-[250px] text-white pl-5'/>
                                    <button onClick={newPasswordhandler} className="text-black text-[26px] font-barlow border p-2 rounded-lg bg-white/80">Change Password</button>
                                </div>
                                :
                                <button disabled={disableButtons} onClick={()=>setChangeNameB(!changeNameB)} className="text-black text-[26px] font-barlow border p-2 rounded-lg bg-white/80">Change Password</button>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/** mobile responsive design */}
            <div class="xl:hidden grid grid-rows-3 grid-cols-1 xl:grid-flow-col gap-4">

                {/* 🔘 User Profile details : name, email, profile picture 🔘 */} 
                <div class="row-span-3 text-center w-full">
                    <div className='flex justify-center '>
                        <div>
                            <div className='flex justify-center'>
                                <div className=' w-[150px] h-[150px] rounded-full bg-black'>
                                    {userDetails.photoURL ?
                                    < img className='w-full h-full' src={userDetails.photoURL} alt='propic'/>:
                                    < img className='w-full h-full' src='https://i.postimg.cc/rFMMDnkW/userPNG.png' alt='propic'/>}
                                </div>
                            </div>
                            <p className="text-[#7c7c7c] text-[36px] font-barlow ">{userDetails.displayName}</p>
                            <p className="text-[#7c7c7c] text-[24px] font-barlow ">{userDetails.email}</p>
                        </div>
                    </div>
                </div>

                <div class="col-span-2 m-10">
                    <p className="text-[#7c7c7c] text-[36px] border-b font-barlow ">
                    USER DETAILS
                    </p>
                </div>

                {/* 🔘 Change Profile picture 🔘 */}
                <div class="row-span-2 col-span-2 m-10">
                    <div className='w-full border rounded-lg'>
                        <div className='m-5 grid lg:flex justify-between'>
                            <p className="text-[#7c7c7c] text-[26px] font-barlow ">Set Profile Picture {fileChoose}</p>
                            <div className='my-2'>
                                <input type='file' accept="image/png,image/jpeg" onChange={handleFile} className='text-white text-[22px] font-barlow rounded-lg '/>
                                <button disabled={disableButtons || !fileChoose} onClick={fileUpload} className="my-2 lg:my-0 text-black text-[26px] font-barlow border p-2 rounded-lg bg-white/80">Upload Image</button>
                            </div>
                        </div>
                    </div>

                    {/* 🔘 Change Name 🔘 */}
                    <div className='w-full border rounded-lg mt-5'>
                        <p className="text-[#7c7c7c] text-[26px] font-barlow m-5">Name</p>
                        <div className='m-5 grid lg:flex lg:justify-between'>
                            <p className="text-[#7c7c7c] text-[26px] font-barlow ">{userDetails.displayName}</p>
                            { changeNameB ?
                                <div className='m-5'>
                                    <input type='text' onChange={(e)=>{setchangeDisName(e.target.value)}} className='lg:mx-5 bg-transparent border my-5 h-[50px] w-full lg:w-[250px] text-white pl-5'/>
                                    
                                    <button onClick={updateDisplayName} className="text-black text-[26px] font-barlow border p-2 rounded-lg bg-white/80 ">Change Name</button>
                                </div>
                                :
                                <button disabled={disableButtons} onClick={()=>setChangeNameB(!changeNameB)} className="text-black text-[26px] font-barlow border p-2 rounded-lg bg-white/80">Change Name</button>
                            }
                        </div>
                    </div>

                    {/* 🔘 Change Password 🔘 */}
                    <div className='w-full border rounded-lg mt-5'>
                        <p className="text-[#7c7c7c] text-[26px] font-barlow m-5">Password</p>
                        <div className='m-5 grid xl:flex xl:justify-between'>
                            <p className="text-[#7c7c7c] text-[26px] font-barlow ">Change Password</p>
                            { changeNameB ?
                                <div className='m-5'>
                                    <input type='password' onChange={(e)=>{setnewPass(e.target.value)}} placeholder='New Password' className=' bg-transparent border lg:mx-5 h-[50px] w-full lg:w-[250px] text-white pl-5'/>
                                    <input type='password' onChange={(e)=>{setnewCPass(e.target.value)}} placeholder='Confirm Password' className=' bg-transparent border my-2 lg:my-0 lg:mx-5 h-[50px] w-full lg:w-[250px] text-white pl-5'/>
                                    <button onClick={newPasswordhandler} className="text-black text-[26px] font-barlow border p-2 rounded-lg bg-white/80">Change Password</button>
                                </div>
                                :
                                <button disabled={disableButtons} onClick={()=>setChangeNameB(!changeNameB)} className="my-2 lg:my-0 text-black text-[26px] font-barlow border p-2 rounded-lg bg-white/80">Change Password</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </>
);
}

export default Profile;