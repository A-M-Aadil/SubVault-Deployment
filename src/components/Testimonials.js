import '../styles/style.css'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Testimonoals() {
    
  return (
    <>
        <div id="Categories" className=" bg-black">
            <div className="absolute top-[20px] left-[18.5%]">
                {/*<h2 className="text-white pl-10 text-[150px] font-jockey font-stroke tracking-[20px]">TESTIMONIALS</h2>*/}
            </div>
            <div className="flex text-center justify-center m-10">
                <h2 className="text-white z-10 text-[36px] md:text-[68px]  lg:text-[128px] font-jockey ">↗️TESTIMONIALS↘️</h2>
            </div>

            

                <div className="top-0 p-10 w-full  mx-auto py-10 px-10">
                    <div className="grid lg:grid-cols-3 justify-center text-center place-items-center">
                        <div  className="w-[350px] content-center bg-[#313131] p-5 lg:p-0 rounded-lg justify-center text-center">
                            <div className="w-full flex p-[30px] py-2">
                                <div className="w-[80px] h-[80px] bg-[#FF013E] flex items-center justify-center rounded-full"><FontAwesomeIcon icon={faUser} className='text-white text-[34px]' /></div>
                                <p className="text-white text-[36px] p-[15px] font-jockey ">Priya R.</p>
                            </div>
                            <p className="text-[#FF013E] text-[36px] font-jockey "></p>
                            <p className="text-white text-justify text-[18px] xl:text-[24px] p-5 font-barlow ">
                                "I am absolutely in love with
                                I've been using SubVault for all my subtitle needs, 
                                and I must say, it's been a game-changer! 
                                As someone who enjoys watching movies from different regions, 
                                having access to subtitles in Sinhala, English, and Tamil has been 
                                incredibly helpful. The website is user-friendly, and 
                                the download process is quick and hassle-free. 
                                I highly recommend SubVault to anyone looking for quality subtitles in multiple languages. 
                                It's a fantastic resource!</p>
                        </div>

                        <div  className="w-[350px] content-center bg-[#313131]  m-5 p-5 lg:p-0 rounded-lg justify-center text-center">
                            <div className="w-full flex p-[30px] py-2">
                            <div className="w-[80px] h-[80px] bg-[#FF013E] flex items-center justify-center rounded-full"><FontAwesomeIcon icon={faUser} className='text-white text-[34px]' /></div>
                                <p className="text-white text-[36px] p-[15px] font-jockey ">Rajesh S.</p>
                            </div>
                            <p className="text-[#FF013E] text-[36px] font-jockey "></p>
                            <p className="text-white text-justify text-[18px] xl:text-[24px] p-5 font-barlow ">"I am absolutely in love with
                                SubVault has become my go-to website for downloading movie subtitles. 
                                The fact that they provide subtitles in Sinhala, English, and Tamil sets 
                                them apart from other subtitle websites. The subtitles are accurate and well-synced, 
                                enhancing my movie-watching experience. I appreciate how easy it is to navigate 
                                the website and find the subtitles I need. SubVault is definitely a must-visit for 
                                all movie enthusiasts!</p>
                        </div>

                        <div  className="w-[350px] content-center bg-[#313131]  m-5 p-5 lg:p-0 rounded-lg justify-center text-center ">
                            <div className="w-full flex p-[30px] py-2">
                            <div className="w-[80px] h-[80px] bg-[#FF013E] flex items-center justify-center rounded-full"><FontAwesomeIcon icon={faUser} className='text-white text-[34px]' /></div>
                                <p className="text-white text-[36px] p-[15px] font-jockey ">Yohan M.</p>
                            </div>
                            <p className="text-[#FF013E] text-[36px] font-jockey "></p>
                            <p className="text-white text-justify text-[18px] xl:text-[24px] p-5 font-barlow ">"I am absolutely in love with
                                I can't express how grateful I am for SubVault! Finally, 
                                a subtitle download website that caters to multiple languages, 
                                including Sinhala, English, and Tamil. As someone who is passionate 
                                about international cinema, SubVault has been a godsend. The subtitles are 
                                of excellent quality and perfectly sync with the movies. The website itself 
                                is sleek and easy to navigate, making the whole process seamless. 
                                If you're looking for reliable and diverse subtitles, look no further 
                                than SubVault!</p>
                        </div>
                    </div>
                
                
            
                

            </div>
        </div>
        
    </>
  );
}

export default Testimonoals;
