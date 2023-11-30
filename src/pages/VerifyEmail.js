import '../styles/style.css'
import { useNavigate } from "react-router-dom";

function VerifyEmail() {

  const navigate = useNavigate();                         // initialize Navigate State

    return (
        <>
            {/* 🔘 Email Verify Interface 🔘 */}
            <div id="Categories" className="w-screen top-0 bg-cover h-screen relative overflow-x-hidden bg-[url('https://i.postimg.cc/tgPZQ6W9/photo-1440404653325-ab127d49abc1.jpg')]">
                <div className='z-10 w-full h-full flex justify-center items-center '>
                    <div className='flex justify-center items-center w-[60%] h-[60%] text-center bg-white/70'>
                        <div className=''>
                            <h2 className=' font-jockey text-[60px]'>Please Verify Your Email Address</h2>
                            <p className=' font-barlow text-[32px]'>Check Your Inbox</p>
                            <p className=' font-barlow text-[32px]'>OR</p>
                            <div className='mt-5'>
                                <button onClick={()=>{navigate('/signin')}} className='m-2 bg-yellow-500 w-[120px] h-[40px] rounded-lg'>Sign In</button>
                                <button onClick={()=>{navigate('/signup')}} className='m-2 bg-yellow-500 w-[120px] h-[40px] rounded-lg'>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default VerifyEmail;
