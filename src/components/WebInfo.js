import '../styles/style.css'
import { useNavigate } from "react-router-dom";
function WebInfo() {
    const navigate = useNavigate();     // initialize Navigate State
    return (
        <>
            <div id="WebInfo" className=" bg-black hidden lg:block">
                {/* 🔘 Website Introduction 🔘 */}
                <div className='w-full bg-gradient-to-b from-black to-transparent h-[40%] absolute '></div>
                <div className='z-10 w-[46%] bg-black/70 h-full absolute text-center xl:mt-20 right-0'>
                    <h2 className="text-white text-[68px] xl:text-[96px] font-jockey animate-pulse">SIGN UP TODAY</h2>
                    <div className='flex justify-center text-end mt-8 pt-8'>
                        <p className="text-white text-[26px] xl:text-[36px] font-jockey">
                            Welcome to our movie subtitle website!<br />
                            We are thrilled to offer you<br />
                            Huge collection of the latest movie subtitles<br />
                            Available right now on our platform.<br />
                        </p>
                    </div>
                    <div className="text-center mt-10">
                        <button onClick={() => navigate("/signup")} className="bg-[#FF013E] p-4 text-white w-60 cursor-pointer">Sign Up Now</button>
                    </div>
                </div>
                {/* 🔘 Background Image 🔘 */}
                <img className='md:w-full h-full md:bg-cover' src='https://c4.wallpaperflare.com/wallpaper/862/449/162/jack-reacher-star-wars-interstellar-movie-john-wick-wallpaper-preview.jpg' />
            </div>
        </>
    );
}

export default WebInfo;