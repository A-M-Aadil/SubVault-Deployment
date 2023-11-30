import '../styles/style.css'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import Navbar from '../components/HomeNavbar';
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, set, onValue } from "firebase/database";

function ManageSubtitles() {
  const navigate = useNavigate();             // initialize Navigate State
  const db = getDatabase();                   // initialize Firebase database
  const auth = getAuth();                     // initialize Firebase authentication
  const [movList, setMovList] = useState([]);               // Movie List state variable use get and set filtered or searched movie list
  const [searchFun, setsearchFun] = useState(false);        // Movie search function boolean state variable use get and set apply search
  const [searchQuery, setsearchQuery] = useState();         // Movie search query state variable use get and set query

  // set movie search query
  function getSearchQuery(event) {
    // get user entered keywords and set search query
    setsearchQuery(event.target.value);
  }

  // apply search data and get results
  function applySearchData() {
    // if user not enterd keyword or query then set search funtion *false*
    if (searchQuery === null || searchQuery === '' || searchQuery === undefined) {
      setsearchFun(false);


    } else {
      setsearchFun(true)
      fetch('https://api.themoviedb.org/3/search/movie?api_key=9277358a759f2925ff98142fd71c5d04&query=' + searchQuery)    // Fetch data from APi
        .then(response => response.json())                                                                                // get response from api
        .then(json => setMovList(json.results))                                                     // store movies into Movie list state variable
      setsearchQuery('');
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
      <div id="Categories" className="w-screen top-0 bg-cover h-screen relative overflow-x-hidden bg-black">

        {/* 🔘Navigation Bar🔘 */}
        <Navbar />

        {/* 🔘Movie Select Interface🔘 */}
        {/* 🔘Title and Tagline🔘 */}
        <div className=" mt-20 m-10">
          <h2 className="text-white text-[96px] font-jockey animate-pulse">ADD SUBTITLE</h2>
          <p className="text-[#7c7c7c] text-[36px] font-barlow ">
            SEARCH AND SELECT THE MOVIE <br /> UPLOAD SUBTITLE AND ENJOY THE MOVIE
          </p>
        </div>

        {/* 🔘Movie Search🔘 */}
        <div className='p-10 w-full  mx-auto py-10 px-10'>
          <div className=' w-full py-10 px-10 flex'>
            <div className='w-full h-[50px] flex justify-between'>
              <input type='text' placeholder='Search Movie..' name='search' onChange={getSearchQuery} className='w-[80%] lg:w-[85%] py-2 px-5 bg-transparent border-2 text-white border-neutral-50 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 ' />
              <button type='submit' className='sm:w-[19%] lg:w-[14%] py-2 px-5 border-2 text-white bg-yellow-500' onClick={applySearchData}>Search</button>
            </div>

          </div>
        </div>

        {/* 🔘 Display Searched Movies 🔘 */}
        {searchFun ?
          <>
            <div className="top-0 p-10 w-full  mx-auto py-10 px-10">
              <div className="grid  md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center text-center place-items-center">
                {movList.map((category) => (
                  <div className="w-[350px] h-[500px] content-center bg-[#313131] m-5 rounded-lg justify-center text-center justify-items-center">
                    <Link to={`/admin/msubtitles/${category.id}`} target="_blank">
                      {category.poster_path !== null ?
                        <img className="w-full h-full" alt='poster' src={`https://image.tmdb.org/t/p/w500${category.poster_path}`} /> :
                        <img className="w-full h-full" alt='poster' src='https://i.postimg.cc/dQ99Y3tF/movie-cover.png' />}
                    </Link>

                  </div>
                ))}
              </div>
            </div>
          </>
          : null
        }

      </div>

    </>
  );
}

export default ManageSubtitles;