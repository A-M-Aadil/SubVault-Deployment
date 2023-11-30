import { useNavigate } from 'react-router-dom';
import '../styles/style.css'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Languages } from '../components/Languages';
import { movieYears } from '../components/Years';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomeSlide from '../components/HomeSlide';
import HomeNavbar from '../components/HomeNavbar';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// slide images links, movies name and title
const slides = [
  { link: "https://i.postimg.cc/SsbSM1Lf/peakpx-1.jpg", name: 'OPPENHEIMER', title: 'The Story of American Scientist' },
  { link: "https://i.postimg.cc/4x549QLD/peakpx-5.jpg", name: 'John Wick 4', title: 'Story of Baba Yaga' },
  { link: "https://i.postimg.cc/zv8qddfS/peakpx-8.jpg", name: 'Fast X', title: 'The end of the road begins.' },
  { link: "https://i.postimg.cc/xddQbk4g/peakpx-10.jpg", name: 'NUN 2', title: 'Uncover truth of the demon' }
]

function UserHome() {
  const auth = getAuth();                                         // initialize Firebase authentication
  const navigate = useNavigate();                                 // initialize Navigate State
  const [movies, setMovies] = useState([])                        // Movies state variable use get and store movies from TMDB api
  const [movList, setMovList] = useState([])                    // Movie List state variable use get and set filtered or searched movie list
  const [movGen, setMovGen] = useState([])                        // Movie genre state variable use get and store movie genre from TMDB api
  const [movCategories, setmovCategories] = useState([])          // Movie categories state variable use get and store movie categories from TMDB api
  const [filGen, setFilGen] = useState('')                          // Movie filter genre state variable use get and set filtered genre
  const [filLang, setFilLang] = useState('')                        // Movie language genre state variable use get and set filtered language
  const [filYear, setFilYear] = useState('')                        // Movie filter year state variable use get and set filtered year
  const [filApply, setFilApply] = useState()                      // Movie filter Apply boolean state variable use get and set apply filter
  const [searchFun, setsearchFun] = useState(false)               // Movie search function boolean state variable use get and set apply search
  const [searchQuery, setsearchQuery] = useState()                // Movie search query state variable use get and set query


  // set movie search query
  function getSearchQuery(event) {
    // get user entered keywords and set search query
    setsearchQuery(event.target.value)
  }

  // apply search data and get results
  function applySearchData() {
    // if user not enterd keyword or query then set search funtion *false*
    if (searchQuery === null || searchQuery === '' || searchQuery === undefined) {
      setsearchFun(false)


    } else {
      // else set search funtion *true* and get data from api
      setsearchFun(true)
      fetch('https://api.themoviedb.org/3/search/movie?api_key=9277358a759f2925ff98142fd71c5d04&query=' + searchQuery)    // Fetch data from APi
        .then(response => response.json())                                                                                // get response from api
        .then(json => setMovList(json.results))                                                   // store movies into Movie list state variable
    }
  }

  // Movie Filter function
  function setApplyedFilter(){
    // set parameters for genre, language and year, and apply filter
    setFilApply(true);

    // if user not filter movies then set filterApply *false*
    if (filGen === '' && filLang === '' && filYear === '') {
      setFilApply(false);
      
    }
    // else if user select only genre filter apply and other filters are not selected then 
    else if (filGen !== '' &&  filLang === '' && filYear === '') {
      fetch('https://api.themoviedb.org/3/discover/movie?api_key=9277358a759f2925ff98142fd71c5d04&with_genres='+filGen)   // Fetch data from APi
      .then(response => response.json())                                                                                      // get response from api
      .then(json => setMovList(json.results))           // store movies into Movie list state variable
      // clear after apply
      setFilGen('')
      
    }
    // else if user select only language filter apply and other filters are not selected then 
    else if (filLang !== '' && filGen === '' && filYear === '') {
      fetch('https://api.themoviedb.org/3/movie/popular?api_key=9277358a759f2925ff98142fd71c5d04&language='+filLang)     // Fetch data from APi
      .then(response => response.json())                                                                                       // get response from api
      .then(json => setMovList(json.results))           // store movies into Movie list state variable
      // clear after apply
      setFilLang('')
    }
    // else if user select only year filter apply and other filters are not selected then 
    else if (filYear !== '' && filGen === '' && filLang === '') {
      fetch('https://api.themoviedb.org/3/discover/movie?api_key=9277358a759f2925ff98142fd71c5d04&primary_release_year='+filYear)   // Fetch data from APi
      .then(response => response.json())                                                                                              // get response from api
      .then(json => setMovList(json.results))           // store movies into Movie list state variable
      // clear after apply
      setFilYear('')
    }
    // else if user select only year and genre filter apply and other filters are not selected then 
    else if (filYear !== '' && filGen !== '' && filLang === '') {
      fetch('https://api.themoviedb.org/3/discover/movie?api_key=9277358a759f2925ff98142fd71c5d04&primary_release_year='+filYear+'&with_genres='+filGen)    // Fetch data from APi
      .then(response => response.json())                                                                                                                          // get response from api
      .then(json => setMovList(json.results))           // store movies into Movie list state variable
      // clear after apply
      setFilYear('')
      setFilGen('')
    }
    // else if user select only language and genre filter apply and other filters are not selected then 
    else if (filLang !== '' && filGen !== '' && filYear === '') {
      fetch('https://api.themoviedb.org/3/discover/movie?api_key=9277358a759f2925ff98142fd71c5d04&with_genres='+filGen+'&language='+filLang)            // Fetch data from APi
      .then(response => response.json())                                                                                                                          // get response from api
      .then(json => setMovList(json.results))           // store movies into Movie list state variable
      // clear after apply
      setFilLang('')
      setFilGen('')
    }
    // else if user select only language and year filter apply and other filters are not selected then 
    else if (filLang !== '' && filYear !== '' && filGen === '') {
      console.log('11')
      fetch('https://api.themoviedb.org/3/discover/movie?api_key=9277358a759f2925ff98142fd71c5d04&primary_release_year='+filYear+'&language='+filLang)    // Fetch data from APi
      .then(response => response.json())                                                                                                                          // get response from api
      .then(json => setMovList(json.results))           // store movies into Movie list state variable
      // clear after apply
      setFilLang('')
      filYear('')
    }
    else{
      // else user select all filters then
      fetch('https://api.themoviedb.org/3/discover/movie?api_key=9277358a759f2925ff98142fd71c5d04&primary_release_year='+filYear+'&language='+filLang+'&with_genres='+filGen)   // Fetch data from APi
      .then(response => response.json())                                                                                                                                                    // get response from api
      .then(json => setMovList(json.results))           // store movies into Movie list state variable
      // clear after apply
      setFilLang('')
      setFilGen('')
      filYear('')
    }
  }

  //Get movies and genre information usigng TMDB APi
  const getCat = () => {

    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=9277358a759f2925ff98142fd71c5d04')   // Fetch data from APi
      .then(response => response.json())                                                                // get response from api
      .then(json => { setmovCategories(json.genres); setMovGen(json.genres) })   // store movies and categories genre into Movie Genre and categories variable

    fetch('https://api.themoviedb.org/3/movie/popular?api_key=9277358a759f2925ff98142fd71c5d04')      // Fetch data from APi
      .then(response => response.json())                                                                // get response from api
      .then(json => setMovies(json.results))                                          // store movies into Movies state variable

  }

  // clear user filter selections
  const clearSelectionFilter = () =>{
    setFilGen('');
    setFilLang('');
    setFilYear('');
    setFilApply(false); 
    setsearchFun(false);
  }

  const clearInputField =()=>{
    setsearchQuery('');
  }

  console.log(filGen);
  console.log(filLang);
  console.log(filYear);

  useEffect(() => {
    // user authentication
    onAuthStateChanged(auth, (user) => {
      //if user not sign in then navigate home page
      if (!user) {
        navigate('/signin')
      }
    });

    getCat()
  }, [])




  return (
    <>
      {/* 🔘Navigation Bar🔘 */}
      <HomeNavbar />
      <div id="Categories" className="w-screen top-0 bg-cover h-screen relative overflow-x-hidden bg-black">
        {/* 🔘Image Slide🔘 */}
        <HomeSlide slides={slides} />

        {/* 🔘 Home Interface🔘 */}
        <div className=" top-0 m-10">
          {/* 🔘Title and Tagline🔘 */}
          <h2 className="text-white text-[68px] md:text-[128px] font-jockey animate-pulse">AVAILABLE NOW</h2>
          <p className="text-[#7c7c7c] text-[24px] md:text-[36px] font-barlow ">
            WE PRESENT MANY SUBTITLES FROM VARIOUS MAIN CATEGORY <br /> LETS CHOOSE AND DOWNLOAD THE SUBTITLE OF YOU LIKED
          </p>
        </div>

        {/* 🔘Movie Categories 🔘 */}
        <div className="top-0 p-10 w-full  mx-auto py-10 px-10">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 justify-center text-center place-items-center">
            {movCategories.map((category) => (
              <div className="w-[350px] lg:w-[280px] 2xl:w-[350px] content-center bg-[#313131] h-[200px] m-5 rounded-lg justify-center text-center justify-items-center">
                <div className="w-full flex justify-center py-2">
                  <div className="w-[50px] h-[50px] bg-[#FF013E] place-items-center  rounded-full"></div>
                </div>
                <p className="text-[#FF013E] text-[36px] font-jockey ">{category.name}</p>
                <p className="text-white text-[32px] font-barlow ">1000+ Movies</p>
              </div>
            ))}
          </div>
        </div>

        {/* 🔘 Movie Subtile Tagline 🔘 */}
        <div className=" top-0 m-10">
          <h2 className="text-white text-[68px] lg:text-[96px] font-jockey animate-pulse">GET YOUR FAVORITE MOVIE SUBTITLE</h2>
          <p className="text-[#7c7c7c] text-[22px] lg:text-[36px] font-barlow ">
            WE PRESENT MANY SUBTITLES FROM VARIOUS MAIN CATEGORY <br /> LETS CHOOSE AND DOWNLOAD THE SUBTITLE OF YOU LIKED
          </p>
        </div>

        {/* 🔘Movie Search🔘 */}
        <div className='p-10 w-full  mx-auto py-10 px-10'>
          <div className=' w-full py-10 px-10 flex'>
          <div className='w-full  md:flex md:justify-between'>
                    <input type='text' placeholder='Search Movie..' name='search' value={searchQuery} onChange={getSearchQuery} className='w-full  py-2 px-5 bg-transparent border-2 text-white border-neutral-50 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 '/>
                    <div className='md:flex w-full md:w-[40%] lg:w-[25%]'>
                      <button onClick={()=>{clearInputField()}} className='w-[20%] h-[43px] bg-white border'><FontAwesomeIcon icon={faRotateRight}/></button>
                      <button type='submit' className='w-[80%]  py-2 px-5 border-2 text-white bg-yellow-500' onClick={applySearchData}>Search</button>
                    </div>
                  </div>

          </div>
        </div>

        {/* 🔘Movie Filters🔘 */}
        <div className="top-0 p-10 w-full  mx-auto py-10 px-10">
          <div className="grid xl:grid-cols-4 justify-center text-center  place-items-center">

            {/* 🔘 Genre Filters 🔘 */}
            <div className='w-[380px] xl:w-[250px] 2xl:w-[350px] xl:mx-2 m-3 xl:my-0'>
              <select value={filGen} className='w-full text-center px-5 h-[40px]' onChange={(e) => setFilGen(e.target.value)}>
                <option value="" selected>Select Genre</option>
                {movGen.map((opt) => (
                  <option value={opt.id}>{opt.name}</option>
                ))}
              </select>
            </div>

            {/* 🔘 Languages Filters 🔘 */}
            <div className='w-[380px] xl:w-[250px] 2xl:w-[350px] xl:mx-2 m-2 xl:my-0'>
              <select id="cars" value={filLang} className='w-full text-center h-[40px]' onChange={(e) => setFilLang(e.target.value)}>
                <option value="" selected>Select Languages</option>
                {Languages.map((opt) => (
                  <option value={opt.id}>{opt.name}</option>
                ))}
              </select>
            </div>

            {/* 🔘 Year Filters 🔘 */}
            <div className='w-[380px] xl:w-[250px] 2xl:w-[350px] xl:mx-2 m-2 xl:my-0'>
              <select id="cars"  value={filYear} className='w-full text-center h-[40px]' onChange={(e) => setFilYear(e.target.value)}>
                <option value="" selected>Select Year</option>
                {movieYears.map((opt) => (
                  <option value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* 🔘 Apply Filters 🔘 */}
            <div className='w-[380px] xl:w-[250px] 2xl:w-[350px] h-[40px] flex justify-between xl:mx-2 m-2 xl:my-0'>
              <button disabled={ filGen === '' && filLang === '' && filYear === ''} className='w-[80%] bg-yellow-500 h-full' onClick={setApplyedFilter}>Apply</button>
              <button className='w-[10%] xl:w-[15%] 2xl:w-[10%] bg-black h-full' onClick={()=>{clearSelectionFilter()}}>
                <img className='flex' src='https://i.postimg.cc/qqnpDsxv/icons8-reset-100.png' />
              </button>
            </div>
          </div>
        </div>

        {/* 🔘 Display Searched Movies 🔘 */}
        {searchFun ?
          <>
            <div className="top-0 p-10 w-full  mx-auto py-10 px-10">
              <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-center text-center place-items-center ">
                {movList.map((category) => (


                  <div className="w-[350px] h-[500px] content-center bg-[#313131] m-5 rounded-lg justify-center text-center justify-items-center">
                    <Link to={`/movie/${category.id}`} target="_blank">
                      {category.poster_path !== null ?
                        <img className="w-full h-full" alt='poster' src={`https://image.tmdb.org/t/p/w500${category.poster_path}`} /> :
                        <img className="w-full h-full" alt='poster' src='https://i.postimg.cc/dQ99Y3tF/movie-cover.png' />}
                    </Link>

                  </div>
                ))}
              </div>
            </div>
          </>

          :
          <>
            {/* 🔘 Display Filtered Movies 🔘 */}
            {filApply ?
              <div className="top-0 p-10 w-full  mx-auto py-10 px-10">
                <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-center text-center place-items-center">
                  {movList.map((category) => (


                    <div className="w-[350px] content-center bg-[#313131]  m-5 rounded-lg justify-center text-center justify-items-center">
                      <Link to={`/movie/${category.id}`} target="_blank">
                        {category.poster_path !== null ?
                          <img className="w-full h-full" alt='poster' src={`https://image.tmdb.org/t/p/w500${category.poster_path}`} /> :
                          <img className="w-full h-full" alt='poster' src='https://i.postimg.cc/dQ99Y3tF/movie-cover.png' />}
                      </Link>

                    </div>
                  ))}
                </div>
              </div>
              :
              <>
                {/* 🔘 Display default Movies 🔘 */}
                <div className="top-0 p-10 w-full  mx-auto py-10 px-10">
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-center text-center place-items-center">
                    {movies.map((category) => (


                      <div className="w-[350px] content-center bg-[#313131]  m-5 rounded-lg justify-center text-center justify-items-center">
                        <Link to={`/movie/${category.id}`} target="_blank">
                          {category.poster_path !== null ?
                            <img className="w-full h-full" alt='poster' src={`https://image.tmdb.org/t/p/w500${category.poster_path}`} /> :
                            <img className="w-full h-full" alt='poster' src='https://i.postimg.cc/dQ99Y3tF/movie-cover.png' />}
                        </Link>

                      </div>
                    ))}
                  </div>
                </div>
              </>
            }
          </>
        }
      </div>

    </>
  );
}

export default UserHome;