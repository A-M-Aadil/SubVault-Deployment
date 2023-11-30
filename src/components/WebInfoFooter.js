import '../styles/style.css'
import { useNavigate } from "react-router-dom";
function WebInfoFooter() {
    const navigate = useNavigate();     // initialize Navigate State
    return (
        <>
            <div id="WebInfo" className=" bg-black">

                {/* 🔘 Website footer Image 🔘 */}
                <div className="absolute mb-[-500px]">
                    <img className='w-full h-full bg-cover' src='https://www.nowverybad.com/wp-content/uploads/2014/01/x-men_promo.jpg' />
                </div>

                {/* 🔘 Website Introduction 🔘 */}
                <div className='p-10 w-full h-full grid justify-center text-center mt-8pt-8'>

                    <p className="z-10 p-[50px] text-white text-[24px] lg:text-[48px] font-jockey">
                        Welcome to our movie subtitle website!<br />
                        We are thrilled to offer you<br />
                        Huge sellection of the latest movie subtitles<br />
                        Available right now on our platform.<br />
                    </p>

                    <div className="z-10 text-center lg:mt-10">
                        <button onClick={() => navigate("/signup")} className="z-10 bg-[#FF013E] p-4 text-white w-60 cursor-pointer">Sign Up Now</button>
                    </div>
                </div>

            </div>

        </>
    );
}

export default WebInfoFooter;