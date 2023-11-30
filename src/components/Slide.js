import { useEffect, useState } from "react";
import '../styles/style.css'
import { useNavigate } from "react-router-dom";


function Slide({ slides }) {
    const [curr, setCurr] = useState(0);                                // initialize current slide state variable
    const navigate = useNavigate();                                     // initialize Navigate State

    // previous slide
    const prev = () => {
        const isFirstSlide = curr === 0
        const newIndex = isFirstSlide ? slides.length - 1 : curr - 1
        setCurr(newIndex);
    };

    // previous slide
    const next = () => {
        const isLastSlide = curr === slides.length - 1
        const newIndex = isLastSlide ? 0 : curr + 1
        setCurr(newIndex);
    };

    // enable auto slide
    const autoSlides = true 
    
    useEffect(() => {
        // if autoslide ot true return or break function
        if (!autoSlides) return
        // set auto slides
        const slideInterval = setInterval(() => {
            setCurr(curr => curr === slides.length - 1 ? 0 : curr + 1)
        }, 5000)
        return () => clearInterval(slideInterval)
    }, [])

    return (
        <>
            <div className="w-full h-full ">
                {/* 🔘 Slides and Slide items : Name, title and image 🔘 */}
                <div className="w-full h-full bg-cover bg-center ease-out duration-500" style={{ backgroundImage: `url(${slides[curr].link})` }}></div>
                <div className="absolute top-[70%] right-[60px] hidden lg:flex text-white text-[128px] font-jockey">{slides[curr].name}</div>
                <div className="absolute top-[64%] right-[10px] hidden lg:flex text-white text-[200px] font-jockey font-stroke tracking-[30px]">{slides[curr].name}</div>
                <p className="absolute top-[86.5%] right-[60px] hidden lg:flex text-[#FF013E] text-right text-[36px] font-jockey font-bold tracking-[10px] ">" {slides[curr].title} "</p>

                {/* 🔘 Website Introduction to sign up 🔘 */}
                <div className="z-10 absolute flex items-center top-0 left-1">
                    <h2 className="text-white hidden lg:flex pl-10 text-[400px] 2xl:text-[600px] font-jockey font-stroke tracking-[120px] 2xl:tracking-[200px]">JOIN</h2>
                </div>
                <div className="z-10 absolute top-[30%] left-[15%] lg:top-[300px] md:left-[250px]">
                    <h2 className="text-white text-[68px] md:text-[128px] lg:text-[128px] font-jockey animate-pulse">JOIN NOW</h2>
                    <p className="text-[#FF013E] text-center md:text-right text-[24px] lg:text-[36px] md:text-[36px] font-barlow font-bold">Get Unlimited Movie Subtitles Anywhere<br />Anytime with Our Platform</p>
                    <div className="flex justify-center mt-2 md:justify-end ">
                        <button onClick={() => navigate("/signup")} className="bg-[#FF013E] p-4 text-white w-60 cursor-pointer">Sign Up Now</button>
                    </div>
                </div>
            </div>
            <div>
                <div class="z-20 arrows absolute top-[70%] left-[20%]">
                    <a href="#Categories">
                        <p className="text-white p-20 text-[48px] animate-bounce">🡫<br />🡫</p>
                    </a>
                </div>
            </div>
        </>
    );
}

export default Slide;