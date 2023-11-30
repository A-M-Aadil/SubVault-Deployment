import { useEffect, useState } from "react";

function Categories() {

  const [movCat, setMovCat] = useState([]); // Movie categories state variable

  //Get movie categories usigng TMDB APi
  // getCat : get categories using arrow function
  const getCat = () => {

    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=9277358a759f2925ff98142fd71c5d04') // Fetch data from APi
      .then(response => response.json())                                                            // get response from api
      .then(json => setMovCat(json.genres))                                                         // store data into Movie categories state variable or setter function
  }
  useEffect(() => {
    getCat(); // call getCategories function
  })

  return (
    <>
      <div id="Categories" className=" bg-black">

        {/* 🔘Categories title and subtitle🔘 */}
        <div className=" top-0 m-10">
          <h2 className="text-white text-[68px] md:text-[128px] font-jockey animate-pulse">AVAILABLE NOW</h2>
          <p className="text-[#7c7c7c] text-[24px] md:text-[36px] font-barlow ">
            WE PRESENT MANY SUBTITLES FROM VARIOUS MAIN CATEGORY <br /> LETS CHOOSE AND DOWNLOAD THE SUBTITLE OF YOU LIKED
          </p>
        </div>

        {/* 🔘Mapping the categories using stored state variable *MovCat* 🔘 */}
        <div className="top-0 p-10 w-full  mx-auto py-10 px-10">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 justify-items-center text-center place-items-center">
            {movCat.slice(0, 8).map((category) => (
              <div className="w-[350px] lg:w-[280px] content-center bg-[#313131] h-[200px] m-5 rounded-lg justify-center text-center justify-items-center">
                <div className="w-full flex justify-center py-2">
                  <div className="w-[50px] h-[50px] bg-[#FF013E] place-items-center  rounded-full"></div>
                </div>
                <p className="text-[#FF013E] text-[36px] font-jockey ">{category.name}</p>
                <p className="text-white text-[32px] font-barlow ">1000+ Movies</p>
              </div>
            ))}
          </div>
        
        </div>
      </div>

    </>
  );
}

export default Categories;