import '../styles/style.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import {
  FacebookShareButton, FacebookIcon,
  TwitterShareButton, TwitterIcon,
  WhatsappShareButton, WhatsappIcon,
  TelegramShareButton, TelegramIcon
} from 'react-share';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { listAll, getStorage, ref as refs, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from '../components/Loading';
import { faShareNodes, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Movie() {
  // Carousel Slider Settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };


  const navigate = useNavigate();                         // initialize Navigate State
  const auth = getAuth();                                 // initialize Firebase authentication
  const { movieId } = useParams();                        // initialize Movie Id using Params State
  const [movInfo, setMovInfo] = useState('');             // Movie Info state variable use get and store movie information from TMDB api
  const [movGen, setmovGen] = useState([]);               // Movie Genre state variable use get and store movie genres from TMDB api
  const [movRec, setmovRec] = useState([]);               // movRec : Movie Recommedation state variable use get and store movie recommendation from TMDB api
  const [movCountries, setmovCountries] = useState([]);   // Movie Countries state variable use get and store movie countries name from TMDB api
  const [movLanguages, setmovLanguages] = useState([]);   // Movie Languages state variable use get and store movie languages from TMDB api
  const [movCC, setmovCC] = useState([]);                 // movCC : Movie Cast and Crew state variable use get and store movie cast and crew information from TMDB api
  const [movReviews, setmovReviews] = useState([]);       // movRec : Movie Recommedation state variable use get and store movie genres from TMDB api
  const [subtitle, setSubtitle] = useState(true);         // Movie Subtitles boolean state variable use to check subtitles
  const [downloadB, setdownloadB] = useState(false);      // downloadB : Subtitle Download Button boolean state variable use to display download button
  const [share, setShare] = useState(false);              // share : Movie share button boolean state variable use display share button
  const [sinhalaSub, checkSinhalaSub] = useState(false);  // SinhalaSub : Sinhala Subtitle boolean state to check and show subtile
  const [englishSub, checkEnglishSub] = useState(false);  // englishSub : English Subtitle boolean state to check and show subtile
  const [tamilSub, checkTamilSub] = useState(false);      // tamilSub : Tamil Subtitle boolean state to check and show subtile
  const [userSignIn, setUserSignIn] = useState(false);    // User Sign In boolean state variable use to chek user sign in or sign out
  const [pageLoading, setPageLoading] = useState(false);  // Page Loading boolean state variable use to display Page loading animation
  const currentPage = window.location.href                // Current page location 

  //Get movie information usigng TMDB APi
  // getCat : get movie information using arrow function
  const getMovie = () => {
    fetch('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=9277358a759f2925ff98142fd71c5d04')  // Fetch data from APi
      .then(response => response.json())                                                                  // get response from api
      .then((json) => {
        setMovInfo(json);                                 // store information into Movie Information state variable or setter function
        setmovGen(json.genres);                           // store genre into Movie genre state variable or setter function
        setmovCountries(json.production_countries)        // store countries into Movie countries state variable or setter function
        setmovLanguages(json.spoken_languages)            // store languages into Movie languages state variable or setter function
      })

    fetch('https://api.themoviedb.org/3/movie/' + movieId + '/credits?api_key=9277358a759f2925ff98142fd71c5d04')  // Fetch data from APi
      .then(response => response.json())                                                                          // get response from api
      .then((json) => {
        setmovCC(json.cast)                                // store Cast & crew information into movieCC state variable or setter function
      })

    fetch('https://api.themoviedb.org/3/movie/' + movieId + '/reviews?api_key=9277358a759f2925ff98142fd71c5d04')  // Fetch data from APi
      .then(response => response.json())                                                                          // get response from api
      .then((json) => {
        setmovReviews(json.results)                        // store reviews  into movie reviews state variable or setter function
      })

    fetch('https://api.themoviedb.org/3/movie/' + movieId + '/similar?api_key=9277358a759f2925ff98142fd71c5d04')  // Fetch data from APi
      .then(response => response.json())                                                                          // get response from api
      .then((json) => {
        setmovRec(json.results)                            // store recommendation movies  into movie recomendation variable or setter function
      })
  }

  //Get subtitle information from firebase storage
  const getSubStatus = () => {
    setdownloadB(true)              // display download button
    const storage = getStorage();   // initialize Firebase storage
    const sinhalaSubRef = refs(storage, 'Subtitle/' + movieId + '/Sinhala');  // firebase sinhala subtitle reference or location
    const englishSubRef = refs(storage, 'Subtitle/' + movieId + '/English');  // firebase english subtitle reference or location
    const tamilSubRef = refs(storage, 'Subtitle/' + movieId + '/Tamil');      // firebase tamil subtitle reference or location
    
    // Find sinhala subtitle in the firebase storage
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

  //download subtitle from firebase storage
  const downloadSubtitle = (path) => {
    // enable page loading animation
    setPageLoading(true);
    // initialize Firebase storage
    const storage = getStorage(); 
    // get download usl form firebase storage
    getDownloadURL(refs(storage, 'Subtitle/' + movieId + '/' + path + '/' + path + '.rar'))
      .then((url) => {
        downloadFile(url); // call download file function and send download url 
      })
      .catch((error) => {
        // display errors in console and disable page loading
        console.log(error);
        setPageLoading(false);
      });

  }

  //download subtitle file from url
  const downloadFile = (fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop();
    link.click();
    setPageLoading(false);
  };

  useEffect(() => {
    getMovie(); // call getMovie function
    // user authentication
    onAuthStateChanged(auth, (user) => {
      // user sign in then set user sign in is *true*
      if (user) {
        const uid = user.uid;
        setUserSignIn(true);
      } else {
        // user sign in is *false*
        setUserSignIn(false);
      }
    });
  }, [])


  return (
    <>
      <div id="Categories" className="w-screen top-0 bg-cover h-screen relative overflow-x-hidden bg-black">
        {/* 🔘Page Loading Animation🔘 */}
        {pageLoading ? <Loading /> : null}

        {/* 🔘Movie Page cover image🔘 */}
        <div className='hidden xl:block bg-gradient-to-r from-black from-10%  via-black via-60% to-transparent to-90% z-10 w-[60%] h-[70%] absolute top-0'>
        </div>

        <div className='hidden xl:block bg-black z-0 w-full h-[70%] absolute top-0 overflow-hidden'>

          <div className="z-10 absolute w-[66%]  right-0 overflow-hidden" >
            { movInfo.backdrop_path ?
              <img className="w-full z-10 overflow-hidden" src={`https://image.tmdb.org/t/p/w500/${movInfo.backdrop_path}`} />:
              <img className="w-full z-10" src='https://i.postimg.cc/ZnY8dwZf/Untitled-design.png' />
            }
          </div>
        </div>

        <div className='xl:hidden overflow-hidden bg-black z-0 w-full h-[70%] absolute top-0'>

          <div className="z-10 absolute w-full  right-0" >
          { movInfo.backdrop_path ?
              <img className="w-full z-10" src={`https://image.tmdb.org/t/p/w500/${movInfo.backdrop_path}`} />:
              <img className="w-full z-10" src='https://i.postimg.cc/ZnY8dwZf/Untitled-design.png' />
            }
          </div>
        </div>

        <div className='bg-gradient-to-t from-black to-transparent z-0 w-full h-[70%] absolute top-0'></div>

        <div className='z-0 w-full h-[20%]'></div>

        {/* 🔘 Display Movie Information🔘 */}
        <div className="hidden xl:grid grid-rows-3 xl:grid-flow-col gap-4">

          {/* 🔘 Display Movie Poster, rating and popularity🔘 */}
          <div className="z-10 row-span-3">
            <div className='flex justify-center'>
              <div>
                <div className="w-full flex text-right xl:justify-end rounded-lg">

                  { movInfo.poster_path ?
                    <img className="h-full flex w-[350px] m-[15px]" src={`https://image.tmdb.org/t/p/w500${movInfo.poster_path}`} />:
                    <img className="h-full flex w-[350px] m-[15px]" src='https://i.postimg.cc/dQ99Y3tF/movie-cover.png' />
                  }

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

          {/* 🔘 Display Movie title, tagline, download button and share button 🔘 */}
          <div class="z-10  col-span-2">
            <div className=" top-0 m-10">
              <h2 className="text-white text-[96px] font-jockey animate-pulse">{movInfo.title}</h2>
              <p className="text-[#7c7c7c] text-[36px] font-barlow ">{movInfo.tagline}</p>

            </div>
            <div className='flex justify-between'>
              <div className="text-left m-10">
                {
                  downloadB ?
                    <>
                      <button onClick={() => { setdownloadB(false) }} className="bg-[#FF013E] p-4 text-white w-[55px] rounded-full mr-2 cursor-pointer">X</button>
                      {sinhalaSub ? <button onClick={() => { downloadSubtitle('Sinhala') }} className="bg-[#FF013E] p-4 text-white w-60 rounded-3xl mr-2 cursor-pointer">Sinhala Subtitle</button> :
                        <button disabled={true} className="bg-[#FF013E]/50 p-4 text-white w-60 rounded-3xl mr-2 cursor-not-allowed">Sinhala Subtitle N/A</button>}
                      {englishSub ? <button onClick={() => { downloadSubtitle('English') }} className="bg-[#FF013E] p-4 text-white w-60 rounded-3xl mr-2 cursor-pointer">English Subtitle</button> :
                        <button disabled={true} className="bg-[#FF013E]/50 p-4 text-white w-60 rounded-3xl mr-2 cursor-not-allowed">English Subtitle N/A</button>}
                      {tamilSub ? <button onClick={() => { downloadSubtitle('Tamil') }} className="bg-[#FF013E] p-4 text-white w-60 rounded-3xl mr-2 cursor-pointer">Tamil Subtitle</button> :
                        <button disabled={true} className="bg-[#FF013E]/50 p-4 text-white w-60 rounded-3xl mr-2 cursor-not-allowed">Tamil Subtitle N/A</button>}

                    </>
                    : <button onClick={() => { getSubStatus() }} className="bg-[#FF013E] p-4 text-white w-60 rounded-3xl mr-2 cursor-pointer">Download Subtitle</button>
                }
              </div>
              <div className="z-30 text-left m-10">

                {share ?
                  <div className=" text-white rounded-full flex cursor-pointer transition-all opacity ease-in">
                    <button className="bg-white mr-2 flex items-center justify-center text-white w-[40px] h-[40px] rounded-full cursor-pointer">
                      <FacebookShareButton url={currentPage} >
                        <FacebookIcon size={38} round={true} />
                      </FacebookShareButton>
                    </button>
                    <button className="bg-white mr-2 flex items-center justify-center text-white w-[40px] h-[40px] rounded-full cursor-pointer">
                      <TwitterShareButton url={currentPage} >
                        <TwitterIcon size={38} round={true} />
                      </TwitterShareButton>
                    </button>
                    <button className="bg-white mr-2 flex items-center justify-center text-white w-[40px] h-[40px] rounded-full cursor-pointer">
                      <WhatsappShareButton url={currentPage} >
                        <WhatsappIcon size={38} round={true} />
                      </WhatsappShareButton>
                    </button>
                    <button className="bg-white mr-2 flex items-center justify-center text-white w-[40px] h-[40px] rounded-full cursor-pointer">
                      <TelegramShareButton url={currentPage} >
                        <TelegramIcon size={38} round={true} />
                      </TelegramShareButton>
                    </button>
                    <button onClick={() => setShare(false)} className="bg-white p-4 text-white w-[40px] h-[40px] rounded-full cursor-pointer overflow-hidden flex justify-center items-center">
                      <FontAwesomeIcon icon={faClose} className='text-black text-[18px]'/>
                    </button>
                  </div>
                  : <button onClick={() => setShare(true)} className="bg-white text-white w-[40px] h-[40px] rounded-full cursor-pointer overflow-hidden flex justify-center items-center">
                    <FontAwesomeIcon icon={faShareNodes} className='text-black text-[18px]'/>
                  </button>}
              </div>
            </div>
          </div>

          {/* 🔘 Display Movie Overview 🔘 */}
          <div className="mt-[11%] row-span-2 px-5 col-span-2 bg-black">
            <p className="text-white text-[28px] font-jockey text-justify">{movInfo.overview}<br /></p>
            <p className="text-white text-[28px] font-jockey "><br />Release Date: {movInfo.release_date}</p>
            <p className="text-white text-[28px] font-jockey "><br />Genres:
              {movGen.map((gen) => (
                <span className='text-[#7c7c7c] px-4'>{gen.name}</span>
              ))}
            </p>
            <p className="text-white text-[28px] font-jockey "><br />Production Countires:
              {movCountries.map((coun) => (
                <span className=' px-4 text-[#7c7c7c]'>{coun.name}</span>
              ))}
            </p>
            <p className="text-white text-[28px] font-jockey "><br />Languages:
              {movLanguages.map((lang) => (
                <span className='text-[#7c7c7c] px-4'>{lang.name}</span>
              ))}
            </p>
          </div>
        </div>

        {/*Mobile responsive design*/}
        {/* 🔘 Display Movie Information🔘 */}
        <div className="xl:hidden grid grid-rows-3 grid-cols-1 xl:grid-flow-col gap-4">

          {/* 🔘 Display Movie Poster, rating and popularity🔘 */}
          <div className="z-10 row-span-3">
            <div className='flex justify-center'>
              <div>
                <div className="w-full flex text-right xl:justify-end rounded-lg">

                { movInfo.poster_path ?
                    <img className="h-full flex w-[350px] m-[15px]" src={`https://image.tmdb.org/t/p/w500${movInfo.poster_path}`} />:
                    <img className="h-full flex w-[350px] m-[15px]" src='https://i.postimg.cc/dQ99Y3tF/movie-cover.png' />
                  }

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

          {/* 🔘 Display Movie title, tagline, download button and share button 🔘 */}
          <div class="z-10  col-span-2">
            <div className=" top-0 m-10">
              <h2 className="text-white text-[48px] font-jockey animate-pulse">{movInfo.title}</h2>
              <p className="text-[#7c7c7c] text-[26px] font-barlow ">{movInfo.tagline}</p>

            </div>
            <div className='grid justify-end'>
              <div className="z-30 text-left mx-10 my-1">

                {share ?
                  <div className=" text-white rounded-full flex cursor-pointer transition-all opacity ease-in">
                    <button className="bg-white mr-2 flex items-center justify-center text-white w-[40px] h-[40px] rounded-full cursor-pointer">
                      <FacebookShareButton url={currentPage} >
                        <FacebookIcon size={38} round={true} />
                      </FacebookShareButton>
                    </button>
                    <button className="bg-white mr-2 flex items-center justify-center text-white w-[40px] h-[40px] rounded-full cursor-pointer">
                      <TwitterShareButton url={currentPage} >
                        <TwitterIcon size={38} round={true} />
                      </TwitterShareButton>
                    </button>
                    <button className="bg-white mr-2 flex items-center justify-center text-white w-[40px] h-[40px] rounded-full cursor-pointer">
                      <WhatsappShareButton url={currentPage} >
                        <WhatsappIcon size={38} round={true} />
                      </WhatsappShareButton>
                    </button>
                    <button className="bg-white mr-2 flex items-center justify-center text-white w-[40px] h-[40px] rounded-full cursor-pointer">
                      <TelegramShareButton url={currentPage} >
                        <TelegramIcon size={38} round={true} />
                      </TelegramShareButton>
                    </button>
                    <button onClick={() => setShare(false)} className="bg-white p-4 text-white w-[40px] h-[40px] rounded-full cursor-pointer overflow-hidden flex justify-center items-center">
                    <FontAwesomeIcon icon={faClose} className='text-black text-[18px]'/>
                    </button>
                  </div>
                  : <button onClick={() => setShare(true)} className="bg-white p-4 text-white w-[40px] h-[40px] rounded-full cursor-pointer overflow-hidden flex justify-center items-center">
                    <FontAwesomeIcon icon={faShareNodes} className='text-black text-[18px]'/>
                  </button>}
              </div>
            </div>
            <div className='grid justify-start'>
              <div className="text-left mx-10 my-1 grid">
                {
                  downloadB ?
                    <>
                      <button onClick={() => { setdownloadB(false) }} className="bg-[#FF013E] m-1 p-4 text-white w-[55px] rounded-full mr-2 cursor-pointer">X</button>
                      {sinhalaSub ? <button onClick={() => { downloadSubtitle('Sinhala') }} className="bg-[#FF013E] m-1 p-4 text-white w-60 rounded-3xl mr-2 cursor-pointer">Sinhala Subtitle</button> :
                        <button disabled={true} className="bg-[#FF013E]/50 m-1 p-4 text-white w-60 rounded-3xl mr-2 cursor-not-allowed">Sinhala Subtitle N/A</button>}
                      {englishSub ? <button onClick={() => { downloadSubtitle('Englsih') }} className="bg-[#FF013E] m-1 p-4 text-white w-60 rounded-3xl mr-2 cursor-pointer">English Subtitle</button> :
                        <button disabled={true} className="bg-[#FF013E]/50 m-1 p-4 text-white w-60 rounded-3xl mr-2 cursor-not-allowed">English Subtitle N/A</button>}
                      {tamilSub ? <button onClick={() => { downloadSubtitle('Tamil') }} className="bg-[#FF013E] p-4 text-white w-60 rounded-3xl mr-2 cursor-pointer">Tamil Subtitle</button> :
                        <button disabled={true} className="bg-[#FF013E]/50 m-1 p-4 text-white w-60 rounded-3xl mr-2 cursor-not-allowed">Tamil Subtitle N/A</button>}

                    </>
                    : <button onClick={() => { getSubStatus() }} className="bg-[#FF013E] p-4 text-white w-60 rounded-3xl mr-2 cursor-pointer">Download Subtitle</button>
                }
              </div>
            </div>

          </div>

          {/* 🔘 Display Movie Overview 🔘 */}
          <div className="mt-[11%] row-span-2 px-5 col-span-2 bg-black">
            <p className="text-white text-justify text-[26px] font-jockey ">{movInfo.overview}<br /></p>
            <p className="text-white text-[24px] font-jockey "><br />Release Date: {movInfo.release_date}</p>
            <p className="text-white text-[24px] font-jockey "><br />Genres:
              {movGen.map((gen) => (
                <span className='text-[#7c7c7c] px-4'>{gen.name}</span>
              ))}
            </p>
            <p className="text-white text-[24px] font-jockey "><br />Production Countires:
              {movCountries.map((coun) => (
                <span className=' px-4 text-[#7c7c7c]'>{coun.name}</span>
              ))}
            </p>
            <p className="text-white text-[24px] font-jockey "><br />Languages:
              {movLanguages.map((lang) => (
                <span className='text-[#7c7c7c] px-4'>{lang.name}</span>
              ))}
            </p>
          </div>
        </div>

        {/* Cast & Crew */}
        <div className=" w-full mt-10 xl:mt-0 mx-auto px-10">
          <div className="mx-10">
            <h2 className="text-white text-[36px] lg:text-[68px] font-jockey ">Cast & Crew</h2>
          </div>
          <div className="mx-10 grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 justify-items-center text-center place-items-center">
            {movCC.slice(0, 12).map((cc) => (
              <div className='w-[300px] sm:w-[200px] md:w-[300px] xl:w-[340px] content-center bg-[#313131] h-[200px] m-5 rounded-lg justify-center text-center '>
                <div className='w-full h-full flex flex-col justify-center items-center'>
                  <div className='w-[110px] h-[110px] rounded-full'>
                    <img className='cover h-full w-full bg-white' src={`https://image.tmdb.org/t/p/w500${cc.profile_path}`} />
                  </div>
                  <p className='text-white text-[18px]'>{cc.name}</p>
                  <p className='text-[#7c7c7c] text-[18px]'>{cc.known_for_department}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}

        <div className="mt-[100px] p-0 w-full  mx-auto px-10">
          <div className="mx-10">
            <h2 className="text-white text-[36px] lg:text-[68px] font-jockey ">Reviews</h2>
          </div>
          {userSignIn ?
            <div className="mx-10 flex justify-end ">
              <div className=' grid items-center'>
                <div className='flex px-5 justify-end'>
                  <h2 className="text-white text-[22px] lg:text-[32px] font-jockey ">Add Your</h2>
                </div>
                <div className='flex px-5 justify-end'>
                  <h2 className="text-white text-[28px] lg:text-[38px] font-jockey ">Review</h2>
                </div>
              </div>
              <div onClick={() => { navigate(`/movie/${movieId}/reviews`) }} className=' cursor-pointer'>
                <h2 className="text-white text-[48px] lg:text-[68px] font-jockey ">↘️</h2>
              </div>
            </div> : null}

          {movReviews.length > 0 ?

            <div className="mx-10 grid lg:grid-cols-1 justify-items-center text-center place-items-center">
              {movReviews.slice(0, 4).map((mr) => (
                <div className='w-full content-center bg-[#313131] m-5 rounded-lg justify-center text-center '>
                  <div className='w-full h-full lg:flex p-4 items-center'>
                    <div className='flex justify-center '>
                      <div className='w-[110px] h-[110px] rounded-full'>
                        <img className='cover h-full w-full bg-white' src={`https://image.tmdb.org/t/p/w500${mr.author_details.avatar_path}`} />
                      </div>
                    </div>

                    <div className='mx-5 xl:w-[12%]'>
                      <p className='text-white text-[18px]'>{mr.author}</p>
                      <p className='text-[#7c7c7c] text-[18px]'>{mr.updated_at.slice(0, 10)}</p>
                    </div>

                    <div className='mx-5 xl:w-[80%] flex justify-center text-justify'>
                      <p className='text-[#7c7c7c] text-[13px]'>{mr.content}</p>
                    </div>


                  </div>
                </div>
              ))}
            </div>

            : <div className="mx-10 grid lg:grid-cols-1 justify-items-center text-center place-items-center">

              <div className='w-full content-center bg-[#313131] h-[200px] m-5 p-4 rounded-lg justify-center text-center '>
                <div className='w-full h-full flex items-center border'>

                  <div className='mx-5 w-full flex justify-center items-center'>
                    <p className='text-[#7c7c7c] text-[18px]'>No Reviews</p>
                  </div>
                </div>
              </div>

            </div>
          }

        </div>

        {/* Movie Recommendation */}
        <div className="top-0 p-10 w-full  mx-auto py-10 px-10">
          <div className="mx-10">
            <h2 className="text-white text-[36px] lg:text-[68px] font-jockey ">Recommendations</h2>
          </div>
          <div className="w-full text-white">
            <Slider {...settings} className='overflow-hidden'>
              {movRec.slice(0, 8).map((rec) => (


                <div className="md:w-[250px] md:h-[350px] xl:w-[350px] xl:h-[500px] content-center bg-[#313131] m-5 rounded-lg justify-center text-center justify-items-center">
                  <Link to={`/movie/${rec.id}`} target="_blank">
                    {rec.poster_path !== null ?
                      <img className="w-full h-full" alt='poster' src={`https://image.tmdb.org/t/p/w500${rec.poster_path}`} /> :
                      <img className="w-full h-full" alt='poster' src='https://i.postimg.cc/dQ99Y3tF/movie-cover.png' />}
                  </Link>

                </div>
              ))}
            </Slider>

          </div>

        </div>


      </div>


    </>
  );
}

export default Movie;