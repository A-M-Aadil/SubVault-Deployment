import { useEffect, useState } from "react";
import '../styles/style.css'
import { useNavigate } from "react-router-dom";


function Slide({slides}) {
    const [curr, setCurr] = useState(0);
    const navigate = useNavigate();

    const prev = () =>{
        const isFirstSlide = curr === 0
        const newIndex = isFirstSlide ? slides.length -1 : curr -1
        setCurr(newIndex);
    };
    const next = () =>{
        const isLastSlide = curr === slides.length -1
        const newIndex = isLastSlide ? 0 : curr +1
        setCurr(newIndex);
    };
    
    const autoSlides = true
    useEffect(() => {
        if(!autoSlides) return 
        const slideInterval = setInterval(() =>{
            setCurr( curr => curr === slides.length-1 ? 0 : curr +1 )
        }, 5000)
        return () => clearInterval(slideInterval)
    },[])

    return (
      <>
          <div className="w-full h-full ">
            <div className="w-full h-full bg-cover bg-center ease-out duration-500" style={{ backgroundImage: `url(${slides[curr].link})`}}></div>
            <div className="absolute top-[40%] right-[60px] hidden lg:flex text-white text-[128px] font-jockey">{slides[curr].name}</div>
            <div className="absolute top-[28%] right-[10px] hidden lg:flex text-white text-[200px] font-jockey font-stroke tracking-[30px]">{slides[curr].name}</div>
            <p className="absolute top-[60%] right-[60px] hidden lg:flex text-[#FF013E] text-right text-[36px] font-jockey font-bold tracking-[10px] ">" {slides[curr].title} "</p>

            <div className="z-20 w-full h-full absolute flex top-2 left-[-150px]">
                <div className="flex justify-start items-center rotate-[-90deg]">
                    <h2 className="text-white text-[60px] md:text-[90px] font-jockey tracking-[10px]">TRENDING NOW</h2>
                </div>
            </div>
            
          </div>
          <div>
            <div class="z-20 arrows absolute top-[70%] left-[20%]">
                <a href="#Categories">
                <p className="text-white p-20 text-[48px] animate-bounce">🡫<br/>🡫</p>
                </a>
            </div>
          </div>
      </>
    );
  }
  
  export default Slide;