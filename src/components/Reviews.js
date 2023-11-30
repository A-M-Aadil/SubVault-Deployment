import '../styles/style.css'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPen, faComments, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDatabase, ref, set ,onValue , remove } from "firebase/database";
import {getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


function Reviews() {
    const auth = getAuth();                                             // initialize Firebase authentication
    const {movieId}= useParams();                                       // initialize Movie Id using Params State
    const navigate = useNavigate();                                     // initialize Navigate State
    const [movReviews, setMovReviews] = useState([]);                   // Movie Reviews state variable use get and store movie Reviews from TMDB api
    const [movDBReviews, setMovDBReviews] = useState([]);               // Movie Database Reviews state variable use get and store movie Reviews from Firebase database
    const [writeReviews, setWriteReviews] = useState(false);            // Write Review boolean state to display review writing interface
    const [reviewContent, setReviewContent] = useState();               // Review Content state variable use to set user write content or comment
    const [updateReviewContent, setUpdateReviewContent] = useState();   // Update Review Content state variable use to set user updated content or comment
    const [revEditDetails, setRevEditDetails] = useState([]);           // Review Edit Details state variable use to get and set user selected update review details
    const [editReview, setEditReview] = useState(false);                // Edit Review boolean state to display review editing interface
    const [deleteReview, setDeleteReview] = useState(false);            // delete Review boolean state to asking to delete review confirmation
    const [deleteReviewDetails, setDeleteReviewDetails] = useState();   // Delete Review Details state variable use to set user selected review details
    const [getReviewId, setReviewId] = useState();                      // Review id state variable use to get and set review id


    var date = new Date();                  // initialize current date
    const formattedDate = date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split('/').reverse().join('-');

    // get TMDB movie reviews using api
    const getTmdbReviews = () =>{
        fetch('https://api.themoviedb.org/3/movie/'+movieId+'/reviews?api_key=9277358a759f2925ff98142fd71c5d04')    // Fetch data from APi
        .then(response => response.json())                                                                          // get response from api
        .then((json) => {
            setMovReviews(json.results)             // store moview review into Movie review state variable
        })
    }

    // get movie reviews from firebase database
    const getDbReviews = () =>{
        const db = getDatabase();                               // initialize Firebase database
        const reviewRef = ref(db, 'Reviews/' + movieId);     // database movie reviews reference or location
        // get reviews from database
        onValue(reviewRef, (snapshot) => {
            // if movie reviews null then return or break function
            if (snapshot === null) {
                return
            }
            // or store review movie database reviews state variable
            const data = snapshot.val();
            setMovDBReviews(data);
        });
    }

    // Review editing or updating handler
    const reviewEditHandler =(handler)=>{
        const db = getDatabase();                                           // initialize Firebase database
        const reviewRef = ref(db, 'Reviews/' + movieId +'/' + handler);  // selected movie review reference or location
        // get selected review from database and store review details in RevEditDetails
        onValue(reviewRef, (snapshot) => {
            setRevEditDetails(snapshot.val());
        });
        // enable edit review interface
        setEditReview(true);
    }

    // review post handler or reviews store in database handler
    const reviewPostHandler = () =>{
        // if user not write any content then return or break function
        if (reviewContent === null || reviewContent === ''){
            return;
        }
        let genrateReviewId;        // initialize review id
        const db = getDatabase();   // initialize Firebase database

        // if review id null then create new Review id 
        if (!getReviewId) {
            genrateReviewId = 0;
        }else{
            // else get next review id from database
            const reviewRef = ref(db, 'Reviews/' + movieId );    // database movie reviews reference or location
            // get reviews from database
            onValue(reviewRef, (snapshot) => {
                // if reviews true then get reviews lenght and create next review id
                if (snapshot.val()) {
                    const data = snapshot.val();
                    genrateReviewId = Object.values(data).length;
                }
            });
        }

        // store review in database and user details
        set(ref(db, 'Reviews/' + movieId+'/'+ genrateReviewId), {
            displayName: auth.currentUser.displayName,
            reviewId: genrateReviewId,
            username: auth.currentUser.uid,
            date: formattedDate,
            avatar: auth.currentUser.photoURL,
            content: reviewContent
        });
        // disable user review writing interface and toast a message
        setWriteReviews(false);
        toast("Your Review has been posted");
        setReviewContent('');
    }

    // review updating handler function
    const reviewUpdateHandler = () =>{
        // if user not updated review then return or break function
        if (updateReviewContent === null || updateReviewContent === ''){
            return;
        }
        const db = getDatabase();       // initialize Firebase database
        // store updated review in the database
        set(ref(db, 'Reviews/' + movieId+'/'+ revEditDetails.reviewId), {
            displayName: revEditDetails.displayName,
            reviewId: revEditDetails.reviewId,
            username: revEditDetails.username,
            date: revEditDetails.date,
            avatar: revEditDetails.avatar,
            content: updateReviewContent
        });
        // disable user review update interface and toast a message
        setEditReview(false);
        toast("Your Review has been Updated");
        setUpdateReviewContent('');
    }

    // edit view interface disable function
    const editViewHandler = () =>{
        setEditReview(false);
        setUpdateReviewContent('');
    }

    // review delete confirmation interface disable function
    const reviewDeleteViewHandler = (handlerId) =>{
        setDeleteReview(true);
        setDeleteReviewDetails(handlerId);
    }

    // review delete handler function from database
    const reviewDeleteHandler = () =>{
        // if user not selected delete or details not avaialable then return or break function
        if (deleteReviewDetails === null) {
            return
        }

        // delete review
        const db = getDatabase();   // initialize Firebase database
        // delete selected review from database 
        remove(ref(db, 'Reviews/' + movieId+'/'+ deleteReviewDetails)).then(()=>{
            // disable delete review confirmation interfase and toast message 
            setDeleteReview(false);
            toast('Review delete successfull')
        }).catch((err)=>{alert(err)})
        
    }
    
    useEffect(()=>{
        // user authentification
        onAuthStateChanged(auth, (user) => {
            //if user authentication fail then naviagate sign in page
            if (!user) {
                navigate('/signin')
            }
        });
        getTmdbReviews();           // call getTmdb review funtion
        getDbReviews();             // call get firebase database review funtion
        const db = getDatabase();   // initialize Firebase database

        const reviewRef = ref(db, 'Reviews/' + movieId );    // database movie reviews reference or location
        // get reviews from database
        onValue(reviewRef, (snapshot) => {
            // if reviews are null then set review id is *false* 
            if (snapshot.val() === null) {
                setReviewId(false);
            } else{
                // else review id is *true*
                setReviewId(true);
            }
        });
    },[])
    return (
    <>
        <div className="w-screen top-0 bg-cover h-screen relative overflow-x-hidden bg-black">
            
            {/* 🔘 Edit Review interface 🔘 */}
            { editReview ?
                <div className='fixed bg-black/80 w-full h-full'>
                    <div className='absolute right-20 top-10 lg:right-40 lg:top-20'>
                        <div className='text-white text-[48px] cursor-pointer'>
                            <FontAwesomeIcon icon={faXmark} onClick={()=>{editViewHandler()}}/>
                        </div>
                    </div>
                    <div className='flex h-full justify-center items-center mx-10'>
                        <div className='text-white'>
                            <div className='flex justify-center'>
                                <textarea onChange={(e)=>{setUpdateReviewContent(e.target.value)}} defaultValue={revEditDetails.content} className='bg-black/50 text-white p-5 focus:outline-none focus:border-2 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ' rows="8" cols='120'/>
                            </div>
                            <div className='flex justify-end mt-10'>
                                <button onClick={()=>{reviewUpdateHandler()}} className='bg-sky-500 w-[150px] h-[50px] font-barlow font-bold text-[24px]'>UPDATE</button>
                            </div>
                        </div>
                    </div>
                </div>
            :
            null
            }

            {/* 🔘 Write Review interface and Write Review button 🔘 */}
            { writeReviews ?
                <div className='fixed bg-black/80 w-full h-full'>
                    <div className='absolute right-20 top-10 lg:right-40 lg:top-20'>
                        <div className='text-white text-[48px] cursor-pointer'>
                            <FontAwesomeIcon icon={faXmark} onClick={()=>{setWriteReviews(false)}}/>
                        </div>
                    </div>
                    <div className='flex h-full justify-center items-center mx-10'>
                        <div className='text-white'>
                            <div className='flex justify-center'>
                                <textarea onChange={(e)=>{setReviewContent(e.target.value)}} placeholder='Type Your Review!..' className='bg-black/50  text-white p-5 focus:outline-none focus:border-2 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ' rows="8" cols='120'/>
                            </div>
                            <div className='flex justify-end mt-10'>
                                <button onClick={()=>{reviewPostHandler()}} className='bg-sky-500 w-[150px] h-[50px] font-barlow font-bold text-[24px]'>POST</button>
                            </div>
                        </div>
                    </div>
                </div>
            :
            <div className='absolute h-full'>
                <div onClick={()=>{setWriteReviews(true)}} className='fixed bottom-10 right-10 xl:bottom-20 xl:right-40'>
                    <div className='bg-white cursor-pointer rounded-full border-4 border-sky-500 w-[68px] h-[68px] md:w-[100px] md:h-[100px] flex justify-center items-center text-4xl'><FontAwesomeIcon icon={faComments} /></div>
                </div>
            </div>
            }
            
            {/* 🔘 delete Review interface 🔘 */}
            { deleteReview ?
                <div className='fixed bg-black/80 w-full h-full'>
                    <div className='absolute right-20 top-10 lg:right-40 lg:top-20'>
                        <div className='text-white text-[48px] cursor-pointer'>
                            <FontAwesomeIcon icon={faXmark} onClick={()=>{setDeleteReview(false)}}/>
                        </div>
                    </div>
                    <div className='flex h-full justify-center items-center mx-10'>
                        <div className='text-white'>
                            <div className='w-[450px] h-[250px] md:w-[650px] md:h-[350px] flex justify-center items-center bg-black/80'>
                                <div className=''>
                                    <h2 className='text-white text-[22px] md:text-[32px]'>Do you want to Delete your reveiw..?</h2>
                                    <div className='flex justify-between'>
                                        <button onClick={()=>{reviewDeleteHandler()}} className=' bg-red-600 w-[100px] text-[18px] md:w-[150px] md:text-[22px] p-5 mt-11 rounded-lg'> Delete </button>
                                        <button onClick={()=>setDeleteReview(false)} className=' bg-white text-black w-[100px] text-[18px] md:w-[150px] md:text-[22px] p-5 mt-11 rounded-lg'> Close </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            :
            null
            }
            {/* 🔘 Toast Message 🔘 */}
            <ToastContainer />

            <div className='w-full flex justify-center'>
                <div className='w-[80%] lg:w-[70%] xl:w-[60%] bg-white flex justify-center m-10 rounded-lg'>
                    <div className='w-full'>

                        {/* 🔘 display all reviews in the tmdb 🔘 */}
                        {movReviews.length > 0 ?
                            <>
                                <div className='w-full'>
                                    {movReviews.map((reviews)=>(
                                    <>
                                    <div className='hidden m-5 xl:flex border-b-4 '>
                                        <div className='m-5 w-[15%]'>
                                            <div className='flex justify-center'>
                                                <div className='bg-black w-[90px] h-[90px] rounded-full'>
                                                    <img className='cover h-full w-full' alt='user' src={`https://image.tmdb.org/t/p/w500${reviews.author_details.avatar_path}`}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='m-5 w-full '>
                                            <div>
                                                <h3 className=' font-semibold  text-[18px]'>{reviews.author}</h3>
                                                <p className='text-[#b9b9b9] font-barlow text-[18px]'>{reviews.updated_at.slice(0,10)} </p>
                                            </div>
                                            <div className='mt-5 text-justify font-light'>
                                                <p>{reviews.content}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/** mobile responsive design */}
                                    <div className='xl:hidden w-full m-5 grid border-b-4 '>
                                        <div className='m-5 flex items-center'>
                                            <div className='flex justify-center '>
                                                <div className='bg-black w-[90px] h-[90px] rounded-full'>
                                                    <img className='cover h-full w-full' alt='user' src={`https://image.tmdb.org/t/p/w500${reviews.author_details.avatar_path}`}/>
                                                </div>
                                            </div>
                                            <div className='mx-10'>
                                                <h3 className=' font-semibold text-[14px] lg:text-[18px]'>{reviews.author}</h3>
                                                <p className='text-[#b9b9b9] font-barlow text-[14px] lg:text-[18px]'>{reviews.updated_at.slice(0,10)} </p>
                                            </div>
                                        </div>

                                        <div className='m-5 mt-0 w-full '>
                                            
                                            <div className='text-justify font-light pr-20 text-[14px]'>
                                                <p>{reviews.content}</p>
                                            </div>
                                        </div>
                                    </div>

                                    </>

                                    ))}
                                </div>    
                            </>
                        :null}

                        {/* 🔘 display all reviews in the firebase storage 🔘 */}
                        {movDBReviews ?
                            <>
                                <div className='w-full '>
                                    {Object.values(movDBReviews).map((reviews)=>(
                                    <>
                                    <div className='hidden m-5 xl:flex border-b-4 '>
                                        <div className='m-5 w-[15%]'>
                                            <div className='flex justify-center'>
                                                <div className='bg-black w-[90px] h-[90px] rounded-full'>
                                                    <img className='cover h-full w-full' alt='user' src={reviews.avatar}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='m-5 w-full '>
                                            <div>
                                                <h3 className=' font-semibold text-[18px]'>{reviews.displayName}</h3>
                                                <p className='text-[#b9b9b9] font-barlow text-[18px]'>{reviews.date} 
                                                { reviews.username === auth.currentUser.uid ? <FontAwesomeIcon icon={faPen} onClick={()=>{reviewEditHandler(reviews.reviewId)}} className='ml-5  hover:text-sky-500 cursor-pointer '/>:null}
                                                { reviews.username === auth.currentUser.uid ? <FontAwesomeIcon icon={faTrashCan} onClick={()=>{reviewDeleteViewHandler(reviews.reviewId)}} className='ml-5  hover:text-red-500 cursor-pointer '/>:null}
                                                </p>
                                            </div>
                                            <div className='mt-5 text-justify font-light'>
                                                <p>{reviews.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/** mobile responsive design */}
                                    <div className='xl:hidden w-full m-5 grid border-b-4 '>
                                        <div className='m-5 flex items-center'>
                                            <div className='flex justify-center '>
                                                <div className='bg-black w-[90px] h-[90px] rounded-full'>
                                                    <img className='cover h-full w-full' alt='user' src={reviews.avatar}/>
                                                </div>
                                            </div>
                                            <div className='mx-10'>
                                                <h3 className=' font-semibold text-[14px] lg:text-[18px]'>{reviews.displayName}</h3>
                                                <p className='text-[#b9b9b9] font-barlow text-[14px] lg:text-[18px]'>{reviews.date} 
                                                { reviews.username === auth.currentUser.uid ? <FontAwesomeIcon icon={faPen} onClick={()=>{reviewEditHandler(reviews.reviewId)}} className='ml-5  hover:text-sky-500 cursor-pointer '/>:null}
                                                { reviews.username === auth.currentUser.uid ? <FontAwesomeIcon icon={faTrashCan} onClick={()=>{reviewDeleteViewHandler(reviews.reviewId)}} className='ml-5  hover:text-red-500 cursor-pointer '/>:null}
                                                </p>
                                            </div>
                                        </div>

                                        <div className='m-5 mt-0 w-full '>
                                            
                                            <div className='text-justify font-light pr-20 text-[14px]'>
                                                <p>{reviews.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                    ))}
                                </div>
                            </>:
                            <>
                                { movReviews.length > 0 || movDBReviews ? null :
                                    <div className='m-5 flex border-b-4 '>
                                        <div className='h-[350px] w-full flex justify-center items-center'>
                                            No Reviews There.. Become a first
                                        </div>
                                    </div>
                                }
                            </>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
        
    </>
  );
}

export default Reviews;