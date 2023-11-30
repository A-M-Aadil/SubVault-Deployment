import '../styles/style.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import {
  FacebookShareButton, FacebookIcon,
  TwitterShareButton, TwitterIcon,
  WhatsappShareButton, WhatsappIcon,
  TelegramShareButton, TelegramIcon
} from 'react-share';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { listAll, getStorage, ref as refs, uploadBytes, deleteObject } from "firebase/storage"
import { getDatabase, ref as refd, set, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Navbar from '../components/HomeNavbar';



function Movie() {

  const navigate = useNavigate();                            // initialize Navigate State
  const db = getDatabase();                                  // initialize Firebase database
  const auth = getAuth();                                    // initialize Firebase authentication
  const [fileChoose, setfileChoose] = useState(false);      // choose file boolean state variable use to check user file choosed or not
  const [subFile, setSubFile] = useState();                 // Subtitle File state variable use selected file
  const { movieId } = useParams();                              // initialize Movie Id using Params State
  const [movInfo, setMovInfo] = useState('');                // Movie Info state variable use get and store movie information from TMDB api
  const [subLanguage, setSubLanguage] = useState();          // Subtitle language state variable use to set language of subtile
  const [delSubLanguage, setDelSubLanguage] = useState();    // Subtitle delete language state variable use to set delete language of subtile
  const [sinhalaSub, checkSinhalaSub] = useState(false);     // SinhalaSub : Sinhala Subtitle boolean state to check and show subtile
  const [englishSub, checkEnglishSub] = useState(false);     // englishSub : English Subtitle boolean state to check and show subtile
  const [tamilSub, checkTamilSub] = useState(false);         // tamilSub : Tamil Subtitle boolean state to check and show subtile
  const [checkSubAvi, setCheckSubAvi] = useState(false);     // check Subtitle available boolean state to check and show subtile

  //Get subtitle information from firebase storage
  const getSubStatus = () => {
    const storage = getStorage();   // initialize Firebase storage
    const sinhalaSubRef = refs(storage, 'Subtitle/' + movieId + '/Sinhala');  // firebase sinhala subtitle reference or location
    const englishSubRef = refs(storage, 'Subtitle/' + movieId + '/English');  // firebase english subtitle reference or location
    const tamilSubRef = refs(storage, 'Subtitle/' + movieId + '/Tamil');      // firebase tamil subtitle reference or location

    // Find sinhala subtitle in the firebase storag
    listAll(sinhalaSubRef)
      .then((res) => {
        // if sinhala subtile not in the storage then check sinhalaSub *false*
        if (res.items.length === 0) {
          checkSinhalaSub(false)
        } else {
          // else sinahala subtile available then check sinhala subtile file
          res.items.forEach((itemRef) => {
            // if sinahala subtile file available then check sinhalaSub *true*
            if (itemRef) {
              checkSinhalaSub(true)
            } else {
              //else check sinhalaSub *false*
              checkSinhalaSub(false)
            }
          });
        }
      }).catch(() => {
        // if got any error then check sinhalaSub *false*
        checkSinhalaSub(false)
      })

    // Find english subtitle in the firebase storage
    listAll(englishSubRef)
      .then((res) => {
        // if english subtile not in the storage then check englishSub *false*
        if (res.items.length === 0) {
          checkEnglishSub(false)
        } else {
          // else english subtile available then check english subtile file
          res.items.forEach((itemRef) => {
            // if englsih subtile file available then check englishSub *true*
            if (itemRef) {
              checkEnglishSub(true)
            } else {
              //else check englishSub *false*
              checkEnglishSub(false)
            }
          });
        }
      }).catch(() => {
        // if got any error then check englishSub *false*
        checkEnglishSub(false)
      })

    // Find tamil subtitle in the firebase storage
    listAll(tamilSubRef)
      .then((res) => {
        // if tamil subtile not in the storage then check tamilSub *false*
        if (res.items.length === 0) {
          checkTamilSub(false)
        } else {
          // else tamil subtile available then check tamil subtile file
          res.items.forEach((itemRef) => {
            // if tamil subtile file available then check tamilSub *true*
            if (itemRef) {
              checkTamilSub(true)
            } else {
              //else check tamilSub *false*
              checkTamilSub(false)
            }
          });
        }
      }).catch(() => {
        // if got any error then check tamilSub *false*
        checkTamilSub(false)
      });
  }

  // check delete subtitle language 
  function DelSubLanguageHandler(event) {
    // set selected subtitle language to Delete Subtitle language state variable
    setDelSubLanguage(event.target.value);
    // if sbtitle not selected then return or break function
    if (event.target.value === 'Languages') {
      setCheckSubAvi(false);
      return
    }

    const storage = getStorage();   // initialize Firebase storage
    const subRef = refs(storage, 'Subtitle/' + movieId + '/' + event.target.value);   // selected subtitle reference or location
    
    // Find selected subtitle in the firebase storage
    listAll(subRef)
      .then((res) => {
        // if selected subtile not in the storage then check subtitleAvailable *false*
        if (res.items.length === 0) {
          setCheckSubAvi(false)
        } else {
          // else selected subtile available then check selected subtile file
          res.items.forEach((itemRef) => {
            // if selected subtile file available then check subtitleAvailable *true*
            if (itemRef) {
              setCheckSubAvi(true)
            } else {
              //else check subtitleAvailable *false*
              setCheckSubAvi(false)
            }
          });
        }
      }).catch(() => {
        // if got any error then check subtitleAvailable *false*
        setCheckSubAvi(false)
      });
  }

  // Subtitle file delete from firebase storage
  const subDeleteHandler = () => {
    const storage = getStorage();   // initialize Firebase storage

    // Create a reference to the file to delete
    const delRef = refs(storage, 'Subtitle/' + movieId + '/' + delSubLanguage + '/' + delSubLanguage + '.rar')

    // Delete the file
    deleteObject(delRef).then(() => {
      // File deleted successfully
      alert('Delete Successfull')
      window.location.reload(true)
    }).catch((error) => {
      // display errors in console
      console.log(error)
    });
  }

  //Get movie information usigng TMDB APi
  const getMovie = () => {
    fetch('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=9277358a759f2925ff98142fd71c5d04')    // Fetch data from APi
      .then(response => response.json())                                                                    // get response from api
      .then((json) => {
        setMovInfo(json);                 // store information into Movie Information state variable or setter function
      })
  }

  // Selected file handling function
  const handleFile = (e) => {
    // if user selected file then set file choose is *true* and store selected file in subtitle file state variable
    if (e.target.files[0]) {
      setfileChoose(true);
      setSubFile(e.target.files[0]);
    } else {
      // else file choose is *true*
      setfileChoose(false);
      setSubFile(null);
    }
  }

  // subtitle upload to firebase storage handling funtion
  const handleUpload = async () => {
    // if user not selected or choose file then return or break function
    if (!fileChoose) {
      return;
    }

    const storage = getStorage();   // initialize Firebase storage
    const storageRef = refs(storage, 'Subtitle/' + movieId + '/' + subLanguage + '/' + subLanguage + '.rar');   // firebase selected subtitle reference or location

    // upload files to firebase storage
    uploadBytes(storageRef, subFile)
      .then(() => {
        // File upload successfully
        alert('Upload Successfull');
        window.location.reload(true);
      }).catch((err) => {
        // display errors in console
        console.log(err);
      })
  }


  useEffect(() => {
    getMovie();       // call get movie function
    getSubStatus();   // call get subtitle status function
    // user authentication
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // if user authenticate successfully then check user id is an admin id 
        // check user id with firbase realtime databse admin ids
        onValue(refd(db, 'Admins/' + user.uid), (snapshot) => {
          const data = snapshot.val();
          // if user id not in admin id then navigate home page
          if (data === null) {
            navigate('/home')
          } else {
            // if user id is equal to admin id then nothing
            if (auth.currentUser.uid === data.username) {

            } else {
              // else navigate home page
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

      <div id="Categories" className="w-screen top-0 bg-cover h-screen relative overflow-x-hidden bg-black">

        {/* 🔘Movie Page cover image🔘 */}
        <div className='hidden xl:block bg-gradient-to-r from-black  via-black to-transparent z-10 w-[60%] h-[70%] absolute top-0'>
        </div>

        <div className='hidden xl:block bg-black z-0 w-full h-[70%] absolute top-0'>

          <div className="z-10 absolute w-[66%]  right-0" >
            <img className="w-full z-10" src={`https://image.tmdb.org/t/p/w500/${movInfo.backdrop_path}`} />
          </div>
        </div>

        <div className='xl:hidden overflow-hidden bg-black z-0 w-full h-[70%] absolute top-0'>

          <div className="z-10 absolute w-full  right-0" >
            <img className="w-full z-10" src={`https://image.tmdb.org/t/p/w500/${movInfo.backdrop_path}`} />
          </div>
        </div>



        <div className='bg-gradient-to-t from-black to-transparent z-0 w-full h-[70%] absolute top-0'></div>

        <div className='z-0 w-full h-[20%]'></div>

        {/* 🔘 Display Movie Information🔘 */}
        <div className="hidden xl:grid grid-rows-3 grid-flow-col gap-4">

          {/* 🔘 Display Movie Poster, rating and popularity🔘 */}
          <div className="z-10 w-[70%] row-span-3">
            <div className="w-full flex text-right justify-end rounded-lg">

              <img className="h-full flex w-[350px] m-[15px]" src={`https://image.tmdb.org/t/p/w500${movInfo.poster_path}`} />

            </div>
            <div className='flex ml-10 justify-between p-3'>
              <div className='text-[#7c7c7c] font-jockey border w-[70px] h-[70px] rounded-full'>
                <div className='w-full h-full flex text-center justify-center items-center'>
                  <p className=' font-jockey text-[28px]'>{movInfo.vote_average}</p>
                </div>
              </div>
              <div className='text-white font-jockey text-[20px] text-right'>
                <p>{movInfo.vote_count} Ratings</p>
                <p>{movInfo.popularity} Popularity</p>
              </div>

            </div>
          </div>

          {/* 🔘 Display Movie title, tagline and subtitle status */}
          <div class="z-10  col-span-2">
            <div className=" top-0 m-10">
              <h2 className="text-white text-[96px] font-jockey animate-pulse">{movInfo.title}</h2>
              <p className="text-[#7c7c7c] text-[36px] font-barlow ">{movInfo.tagline}</p>

            </div>

            <div className='flex justify-start'>
              <div className="text-left m-10">

                {sinhalaSub ?
                  <div className='flex items-center'>
                    <div className=''>
                      <div className='absolute mx-5 w-[20px] h-[20px] bg-green-500 rounded-full animate-ping'></div>
                      <div className='mx-5 w-[20px] h-[20px] bg-green-500 rounded-full'></div>
                    </div>
                    <p className='text-[#7c7c7c] text-[28px] ml-2 font-barlow '> Sinhala : Subtitle Available</p>
                  </div>
                  :
                  <div className='flex items-center'>
                    <div className=''>
                      <div className='absolute mx-5 w-[20px] h-[20px] bg-[#7c7c7c] rounded-full animate-ping'></div>
                      <div className='mx-5 w-[20px] h-[20px] bg-[#7c7c7c] rounded-full'></div>
                    </div>
                    <p className='text-[#7c7c7c] text-[28px] ml-2 font-barlow '> Sinhala : Subtitle Not Available</p>
                  </div>
                }

                {englishSub ?
                  <div className='flex items-center'>
                    <div className=''>
                      <div className='absolute mx-5 w-[20px] h-[20px] bg-green-500 rounded-full animate-ping'></div>
                      <div className='mx-5 w-[20px] h-[20px] bg-green-500 rounded-full'></div>
                    </div>
                    <p className='text-[#7c7c7c] text-[28px] ml-2 font-barlow '> English : Subtitle Available</p>
                  </div>
                  :
                  <div className='flex items-center'>
                    <div className=''>
                      <div className='absolute mx-5 w-[20px] h-[20px] bg-[#7c7c7c] rounded-full animate-ping'></div>
                      <div className='mx-5 w-[20px] h-[20px] bg-[#7c7c7c] rounded-full'></div>
                    </div>
                    <p className='text-[#7c7c7c] text-[28px] ml-2 font-barlow '> English : Subtitle Not Available</p>
                  </div>
                }

                {tamilSub ?
                  <div className='flex jus items-center'>
                    <div className=''>
                      <div className='absolute mx-5 w-[20px] h-[20px] bg-green-500 rounded-full animate-ping'></div>
                      <div className='mx-5 w-[20px] h-[20px] bg-green-500 rounded-full'></div>
                    </div>
                    <p className='text-[#7c7c7c] text-[28px] ml-2 font-barlow '> Tamil : Subtitle Available</p>
                  </div>
                  :
                  <div className='flex items-center'>
                    <div className=''>
                      <div className='absolute mx-5 w-[20px] h-[20px] bg-[#7c7c7c] rounded-full animate-ping'></div>
                      <div className='mx-5 w-[20px] h-[20px] bg-[#7c7c7c] rounded-full'></div>
                    </div>
                    <p className='text-[#7c7c7c] text-[28px] ml-2 font-barlow '> Tamil : Subtitle Not Available</p>
                  </div>
                }

              </div>
            </div>
          </div>

          {/* 🔘 Display Subtitle upload interface🔘 */}
          <div className="mt-[11%] row-span-2 px-5 col-span-2 ">
            <p className='text-[#7c7c7c] text-[32px] text-center'>Upload Subtitle</p>
            <div className='flex justify-center'>
              <div className='flex w-[60%] mb-3 justify-start'>
                <p className='text-[#7c7c7c] '>Select Languages:</p>
              </div>
            </div>
            
            {/* 🔘 Subtitle language🔘 */}
            <div className='flex justify-center'>
              <select onChange={(e) => { setSubLanguage(e.target.value) }} className='w-[60%] h-[60px]'>
                <option value='Languages' selected>Languages</option>
                <option value='Sinhala' >Sinhala</option>
                <option value='English' >English</option>
                <option value='Tamil' >Tamil</option>
              </select>
            </div>

            {/* 🔘 Subtitle file selection 🔘 */}
            <div className='flex mt-10 justify-center'>
              <div className='flex w-[60%] mb-3 justify-start'>
                <p className='text-[#7c7c7c] '>Select File:</p>
              </div>
            </div>

            <div className='flex mt-3 justify-center'>
              <input onChange={handleFile} type='file' className='text-white w-[60%] h-[60px]' />
            </div>

            <div className='flex mt-3 justify-center'>
              <button disabled={!fileChoose} onClick={() => { handleUpload() }} className='w-[60%] h-[60px] bg-white'>Upload Subtile</button>
            </div>

            {/* 🔘 Display Subtitle delete interface🔘 */}
            <div className='mt-[200px] mb-10'>
              <p className='text-[#7c7c7c] text-[32px] text-center'>Delete Subtitle</p>
              <div className='flex justify-center'>
                <div className='flex w-[60%] mb-3 justify-start'>
                  <p className='text-[#7c7c7c] '>Select Languages:</p>
                </div>
              </div>

              {/* 🔘 Subtitle language🔘 */}
              <div className='flex justify-center'>
                <select onChange={(e) => { DelSubLanguageHandler(e) }} className='w-[60%] h-[60px]'>
                  <option value='Languages' selected>Languages</option>
                  <option value='Sinhala' >Sinhala</option>
                  <option value='English' >English</option>
                  <option value='Tamil' >Tamil</option>
                </select>
              </div>

              <div className='flex mt-10 justify-center'>
                <div className='flex w-[60%] mb-3 justify-start'>

                  {/* 🔘 Check Subtitle */}
                  {checkSubAvi ?
                    <div className='flex items-center'>
                      <div className=''>
                        <div className='absolute mx-5 w-[20px] h-[20px] bg-green-500 rounded-full animate-ping'></div>
                        <div className='mx-5 w-[20px] h-[20px] bg-green-500 rounded-full'></div>
                      </div>
                      <p className='text-[#7c7c7c] text-[28px] ml-2 font-barlow '>Subtitle Available</p>
                    </div>
                    :
                    <div className='flex items-center'>
                      <div className=''>
                        <div className='absolute mx-5 w-[20px] h-[20px] bg-[#7c7c7c] rounded-full animate-ping'></div>
                        <div className='mx-5 w-[20px] h-[20px] bg-[#7c7c7c] rounded-full'></div>
                      </div>
                      <p className='text-[#7c7c7c] text-[28px] ml-2 font-barlow '>Subtitle Not Available</p>
                    </div>
                  }

                </div>
              </div>

              <div className='flex mt-3 justify-center'>
                <button disabled={!checkSubAvi} onClick={() => { subDeleteHandler() }} className='w-[60%] h-[60px] bg-white'>Delete Subtile</button>
              </div>
            </div>

          </div>
        </div>

        {/** mobile responsive design */}
        {/* 🔘 Display Movie Information🔘 */}          
        <div className="xl:hidden grid grid-rows-3 grid-cols-1 xl:grid-flow-col gap-4">
          
          {/* 🔘 Display Movie title, tagline and subtitle status */}
          <div className="z-10 row-span-3">
            <div className='flex justify-center'>
              <div>
                <div className="w-full flex text-right xl:justify-end rounded-lg">

                  <img className="h-full flex w-[350px] m-[15px]" src={`https://image.tmdb.org/t/p/w500${movInfo.poster_path}`} />

                </div>
                <div className='flex justify-between p-3'>
                  <div className='text-[#7c7c7c] font-jockey border w-[70px] h-[70px] rounded-full'>
                    <div className='w-full h-full flex text-center justify-center items-center'>
                      <p className='font-jockey text-[28px]'>{movInfo.vote_average}</p>
                    </div>
                  </div>
                  <div className='text-white font-jockey text-[20px] text-right'>
                    <p>{movInfo.vote_count} Ratings</p>
                    <p>{movInfo.popularity} Popularity</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div class="z-10  col-span-2">
            <div className="grid text-center justify-center m-10">
              <h2 className="text-white text-[68px] font-jockey animate-pulse">{movInfo.title}</h2>
              <p className="text-[#7c7c7c] text-[28px] font-barlow ">{movInfo.tagline}</p>

            </div>

            <div className='flex justify-center'>
              <div className="text-left m-10 ">

                {sinhalaSub ?
                  <div className='flex items-center'>
                    <div className=''>
                      <div className='absolute mx-5 w-[20px] h-[20px] bg-green-500 rounded-full animate-ping'></div>
                      <div className='mx-5 w-[20px] h-[20px] bg-green-500 rounded-full'></div>
                    </div>
                    <p className='text-[#7c7c7c] text-[28px] ml-2 font-barlow '> Sinhala : Subtitle Available</p>
                  </div>
                  :
                  <div className='flex items-center'>
                    <div className=''>
                      <div className='absolute mx-5 w-[20px] h-[20px] bg-[#7c7c7c] rounded-full animate-ping'></div>
                      <div className='mx-5 w-[20px] h-[20px] bg-[#7c7c7c] rounded-full'></div>
                    </div>
                    <p className='text-[#7c7c7c] text-[28px] ml-2 font-barlow '> Sinhala : Subtitle Not Available</p>
                  </div>
                }

                {englishSub ?
                  <div className='flex items-center'>
                    <div className=''>
                      <div className='absolute mx-5 w-[20px] h-[20px] bg-green-500 rounded-full animate-ping'></div>
                      <div className='mx-5 w-[20px] h-[20px] bg-green-500 rounded-full'></div>
                    </div>
                    <p className='text-[#7c7c7c] text-[28px] ml-2 font-barlow '> English : Subtitle Available</p>
                  </div>
                  :
                  <div className='flex items-center'>
                    <div className=''>
                      <div className='absolute mx-5 w-[20px] h-[20px] bg-[#7c7c7c] rounded-full animate-ping'></div>
                      <div className='mx-5 w-[20px] h-[20px] bg-[#7c7c7c] rounded-full'></div>
                    </div>
                    <p className='text-[#7c7c7c] text-[28px] ml-2 font-barlow '> English : Subtitle Not Available</p>
                  </div>
                }

                {tamilSub ?
                  <div className='flex items-center'>
                    <div className=''>
                      <div className='absolute mx-5 w-[20px] h-[20px] bg-green-500 rounded-full animate-ping'></div>
                      <div className='mx-5 w-[20px] h-[20px] bg-green-500 rounded-full'></div>
                    </div>
                    <p className='text-[#7c7c7c] text-[28px] ml-2 font-barlow '> Tamil : Subtitle Available</p>
                  </div>
                  :
                  <div className='flex items-center'>
                    <div className=''>
                      <div className='absolute mx-5 w-[20px] h-[20px] bg-[#7c7c7c] rounded-full animate-ping'></div>
                      <div className='mx-5 w-[20px] h-[20px] bg-[#7c7c7c] rounded-full'></div>
                    </div>
                    <p className='text-[#7c7c7c] text-[28px] ml-2 font-barlow '> Tamil : Subtitle Not Available</p>
                  </div>
                }

              </div>
            </div>
          </div>

          {/* 🔘 Display Subtitle upload interface🔘 */}
          <div className="mt-[11%] row-span-2 px-5 col-span-2 ">
            <p className='text-[#7c7c7c] text-[32px] py-4 text-center'>Upload Subtitle</p>
            <div className='flex justify-center'>
              <div className='flex w-[60%] mb-3 justify-start'>
                <p className='text-[#7c7c7c] '>Select Languages:</p>
              </div>
            </div>

            {/* 🔘 Subtitle language🔘 */}
            <div className='flex justify-center'>
              <select onChange={(e) => { setSubLanguage(e.target.value) }} className='w-[60%] h-[60px]'>
                <option value='Languages' selected>Languages</option>
                <option value='Sinhala' >Sinhala</option>
                <option value='English' >English</option>
                <option value='Tamil' >Tamil</option>
              </select>
            </div>

            {/* 🔘 Selection Subtitle 🔘 */}
            <div className='flex mt-10 justify-center'>
              <div className='flex w-[60%] mb-3 justify-start'>
                <p className='text-[#7c7c7c] '>Select File:</p>
              </div>
            </div>

            <div className='flex mt-3 justify-center'>
              <input onChange={handleFile} type='file' className='text-white w-[60%] h-[60px]' />
            </div>

            <div className='flex mt-3 justify-center'>
              <button disabled={!fileChoose} onClick={() => { handleUpload() }} className='w-[60%] h-[60px] bg-white'>Upload Subtile</button>
            </div>

            {/* 🔘 Display Subtitle delete interface🔘 */}
            <div className='mt-[200px] mb-10'>
              <p className='text-[#7c7c7c] text-[32px] text-center'>Delete Subtitle</p>
              <div className='flex justify-center'>
                <div className='flex w-[60%] mb-3 justify-start'>
                  <p className='text-[#7c7c7c] '>Select Languages:</p>
                </div>
              </div>

              {/* 🔘 Subtitle language🔘 */}
              <div className='flex justify-center'>
                <select onChange={(e) => { DelSubLanguageHandler(e) }} className='w-[60%] h-[60px]'>
                  <option value='Languages' selected>Languages</option>
                  <option value='Sinhala' >Sinhala</option>
                  <option value='English' >English</option>
                  <option value='Tamil' >Tamil</option>
                </select>
              </div>

              <div className='flex mt-10 justify-center'>
                <div className='flex w-[60%] mb-3 justify-start'>

                  {/* 🔘 display availability of subtitle 🔘 */}
                  {checkSubAvi ?
                    <div className='flex items-center'>
                      <div className=''>
                        <div className='absolute mx-5 w-[20px] h-[20px] bg-green-500 rounded-full animate-ping'></div>
                        <div className='mx-5 w-[20px] h-[20px] bg-green-500 rounded-full'></div>
                      </div>
                      <p className='text-[#7c7c7c] text-[22px] ml-2 font-barlow '>Subtitle Available</p>
                    </div>
                    :
                    <div className='flex items-center'>
                      <div className=''>
                        <div className='absolute mx-5 w-[20px] h-[20px] bg-[#7c7c7c] rounded-full animate-ping'></div>
                        <div className='mx-5 w-[20px] h-[20px] bg-[#7c7c7c] rounded-full'></div>
                      </div>
                      <p className='text-[#7c7c7c] text-[22px] ml-2 font-barlow '>Subtitle Not Available</p>
                    </div>
                  }

                </div>
              </div>

              <div className='flex mt-3 justify-center'>
                <button disabled={!checkSubAvi} onClick={() => { subDeleteHandler() }} className='w-[60%] h-[60px] bg-white'>Delete Subtile</button>
              </div>
            </div>

          </div>
        </div>

      </div>


    </>
  );
}

export default Movie;