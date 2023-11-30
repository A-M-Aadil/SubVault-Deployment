import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate} from "react-router-dom";


function PrivacyPolicy() {
    let navigate = useNavigate();  // initialize Navigate State
    return (
        <>
        {/* 🔘 Privacy Policy Data and Interface 🔘 */}
        <div id="contact" className="w-screen top-0 bg-cover h-screen relative overflow-x-hidden bg-[url('https://i.postimg.cc/ZqCYKGyf/william-daigneault-ol-VJDJYKPSI-unsplash.jpg')]">
            <div className="flex justify-center my-5">
                <h2 className=' font-jockey text-[48px] md:text-[60px] text-white'><FontAwesomeIcon icon={faArrowAltCircleLeft} onClick={() => navigate(-1)} className=" cursor-pointer text-[38px] md:text-[48px] mx-2" />Privacy Policy</h2>
            </div>
            <div className='z-10 w-full flex justify-center '>
                
                <div className='flex justify-center w-[90%] md:w-[60%] px-4 py-10 bg-white/70 text-justify font-poppins'>
                    <div className=''>
                        
                        <p>At Subtitle Downloads, we value and respect the privacy of our users. 
                            This Privacy Policy outlines how we collect, use, 
                            and protect your personal information when you visit our website and use our subtitle download services. 
                            By accessing or using our website, you agree to the practices described in this Privacy Policy.
                        </p>

                        <p className='mt-3 font-barlow text-[22px] md:text-[32px]'>Information We Collect</p>

                        <p className='mx-3'>When you visit our website, we may collect certain information about you. This may include:</p>
                        <ul className='list-disc mx-5'>
                            <li className='m-2'>
                            Personal Information: We may collect personal information such as your name, email address, and IP address 
                            when you voluntarily provide it to us during the registration process or when contacting us through our website.
                            </li>

                            <li className='m-2'>
                            Non-Personal Information: We may also collect non-personal information such as your browser type, device information, 
                            and anonymous usage statistics to improve the performance and functionality of our website.
                            </li>
                        </ul>

                        <p className='mt-3 font-barlow text-[22px] md:text-[32px]'>Use of Information</p>

                        <p className='mx-3'>We use the information we collect to provide and improve our subtitle download services and to enhance your overall experience on our website. This includes:</p>
                        <ul className='list-disc mx-5'>
                            <li className='m-2'>
                            Providing Subtitle Downloads: We may use your personal information to deliver the subtitle files requested 
                            by you and to communicate with you regarding your downloads.
                            </li>

                            <li className='m-2'>
                            Improving our Services: We may analyze non-personal information to understand user preferences, trends, and usage patterns. 
                            This helps us enhance our website's functionality and tailor our services to better meet our users' needs.
                            </li>

                            <li className='m-2'>
                            Communication: We may use your email address to send you important notifications relating to your account, new features, 
                            or updates to our Privacy Policy and Terms of Service.
                            </li>
                        </ul>

                        <p className='mt-3 font-barlow text-[22px] md:text-[32px]'>Protection of Information</p>
                        <p className='mx-3'>
                        We take reasonable measures to protect the personal information of our users and to prevent unauthorized access, 
                        disclosure, alteration, or destruction of this information. However, no method of transmission over 
                        the internet or electronic storage is completely secure. Therefore, while we strive to protect your personal information, 
                        we cannot guarantee its absolute security.
                        </p>

                        <p className='mt-3 font-barlow text-[22px] md:text-[32px]'>Third-Party Disclosure</p>
                        <p className='mx-3'>
                        We do not sell, trade, or transfer your personal information to third parties without your consent. 
                        However, we may share non-personal information with trusted third-party service providers who assist 
                        us in operating our website, conducting our business, or servicing you, as long as they agree to keep 
                        this information confidential.
                        </p>

                        <p className='mt-3 font-barlow text-[22px] md:text-[32px]'>Changes to this Privacy Policy</p>
                        <p>
                        We reserve the right to update or modify this Privacy Policy at any time. 
                        Any changes will be posted on this page, and the "Last Updated" date at the top of this page 
                        will reflect the most recent revisions. By continuing to use our website after any changes to 
                        this Privacy Policy, you acknowledge and agree to the updated terms.
                        </p>

                        <p className='mt-3 font-barlow text-[22px] md:text-[32px]'>Contact Us</p>
                        <p className='mx-3'>
                        If you have any questions or concerns about this Privacy Policy or our practices regarding your personal information, 
                        please <span onClick={()=>{navigate('/contact')}} className=' font-bold cursor-pointer'>contact us</span> 
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}
export default PrivacyPolicy;