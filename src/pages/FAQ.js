import { useEffect, useState } from "react";
import { faDownload, faArrowAltCircleLeft, faUser, faFile, faFilm, faCodePullRequest, faStar, faCirclePlay, faTv, faFileCirclePlus, faUsers, faClosedCaptioning} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";

function FAQ() {
    let navigate = useNavigate();       // initialize Navigate State
    return (
        <>
            {/* 🔘 FAQ Interface 🔘 */} 
            <div className="w-screen top-0 bg-cover h-screen relative overflow-x-hidden bg-black">
                {/* 🔘 title and back button 🔘 */}
                <div className="flex justify-center">
                    <h2 className="text-[96px] text-white font-jockey">FAQ</h2>
                </div>
                <div className="absolute top-10 left-10 text-white">
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} onClick={() => navigate(-1)} className=" cursor-pointer text-[38px] md:text-[48px] mx-2" />
                </div>
                <div className='w-full  flex justify-center items-center'>
                    <div>

                        {/* 🔘 FAQ 🔘 */}
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 ">

                            {/* 🔘 FAQ 1 🔘 */}
                            <div className="w-[350px] h-[300px] bg-white grid justify-center items-center rounded-lg p-5">
                                <div className="flex justify-center w-full items-center">
                                    <FontAwesomeIcon icon={faDownload} className="text-[28px] mx-2 text-sky-500" />
                                    <p className="font-bold font-barlow text-[18px]"> How can I download subtitles from website?</p>
                                </div>
                                <div>
                                    <p className="text-justify font-poppins">
                                        To download subtitles,
                                        simply search for the movie title and select the desired language.
                                        Then, click on the download button to get the subtitle file.
                                    </p>
                                </div>
                            </div>

                            {/* 🔘 FAQ 2 🔘 */}
                            <div className="w-[350px] h-[300px] bg-white grid justify-center items-center rounded-lg p-5">
                                <div className="flex justify-center w-full items-center">
                                    <FontAwesomeIcon icon={faUser} className="text-[28px] mx-2 text-sky-500" />
                                    <p className="font-bold font-barlow text-[18px]"> Do I need to create an account to download subtitles?</p>
                                </div>
                                <div>
                                    <p className="text-justify font-poppins">
                                        No, creating an account is not mandatory. You can download subtitles without logging in. However, creating an account offers additional benefits such as personalized recommendations and subtitle syncing across devices.</p>
                                </div>
                            </div>

                            {/* 🔘 FAQ 3 🔘 */}
                            <div className="w-[350px] h-[300px] bg-white grid justify-center items-center rounded-lg p-5">
                                <div className="flex justify-center w-full items-center">
                                    <FontAwesomeIcon icon={faFile} className="text-[28px] mx-2 text-sky-500" />
                                    <p className="font-bold font-barlow text-[18px]">Can I download subtitles in Sinhala, English, and Tamil languages?</p>
                                </div>
                                <div>
                                    <p className="text-justify font-poppins">
                                        Yes, our website provides subtitles in multiple languages, including Sinhala, English, and Tamil. You can choose the language that suits your preference.</p>
                                </div>
                            </div>

                            {/* 🔘 FAQ 4 🔘 */}
                            <div className="w-[350px] h-[300px] bg-white grid justify-center items-center rounded-lg p-5">
                                <div className="flex justify-center w-full items-center">
                                    <FontAwesomeIcon icon={faFilm} className="text-[28px] mx-2 text-sky-500" />
                                    <p className="font-bold font-barlow text-[18px]">Are the subtitles available for all movies?</p>
                                </div>
                                <div>
                                    <p className="text-justify font-poppins">
                                        We strive to provide subtitles for a wide range of movies. However, due to various reasons, not all movies may have subtitles available. We continuously update our subtitle library to offer the best coverage possible.</p>
                                </div>
                            </div>

                            {/* 🔘 FAQ 5 🔘 */}
                            <div className="w-[350px] h-[300px] bg-white grid justify-center items-center rounded-lg p-5">
                                <div className="flex justify-center w-full items-center">
                                    <FontAwesomeIcon icon={faCodePullRequest} className="text-[28px] mx-2 text-sky-500" />
                                    <p className="font-bold font-barlow text-[18px]">Can I request subtitles for a specific movie?</p>
                                </div>
                                <div>
                                    <p className="text-justify font-poppins">
                                        Yes, we encourage users to request subtitles for movies that are not currently available on our website. We have a dedicated section where you can submit your subtitle requests, and our team will work on fulfilling them.</p>
                                </div>
                            </div>

                            {/* 🔘 FAQ 6 🔘 */}
                            <div className="w-[350px] h-[300px] bg-white grid justify-center items-center rounded-lg p-5">
                                <div className="flex justify-center w-full items-center">
                                    <FontAwesomeIcon icon={faStar} className="text-[28px] mx-2 text-sky-500" />
                                    <p className="font-bold font-barlow text-[18px]">Are the subtitles accurate and of good quality?</p>
                                </div>
                                <div>
                                    <p className="text-justify font-poppins">
                                        We make every effort to provide accurate and high-quality subtitles. However, please note that subtitles are user-contributed, and their accuracy may vary. We encourage users to report any issues with subtitles so that we can address them promptly.</p>
                                </div>
                            </div>

                            {/* 🔘 FAQ 7 🔘 */}
                            <div className="w-[350px] h-[300px] bg-white grid justify-center items-center rounded-lg p-5">
                                <div className="flex justify-center w-full items-center">
                                    <FontAwesomeIcon icon={faCirclePlay} className="text-[28px] mx-2 text-sky-500" />
                                    <p className="font-bold font-barlow text-[18px]">Are the subtitles compatible with all media players?</p>
                                </div>
                                <div>
                                    <p className="text-justify font-poppins">
                                        Subtitles provided on our website are typically in the widely-used SRT format, which is compatible with most media players. However, some media players may require additional settings or plugins for optimal subtitle playback.</p>
                                </div>
                            </div>

                            {/* 🔘 FAQ 8 🔘 */}
                            <div className="w-[350px] h-[300px] bg-white grid justify-center items-center rounded-lg p-5">
                                <div className="flex justify-center w-full items-center">
                                    <FontAwesomeIcon icon={faTv} className="text-[28px] mx-2 text-sky-500" />
                                    <p className="font-bold font-barlow text-[18px]">Can I find subtitles for TV shows on your website?</p>
                                </div>
                                <div>
                                    <p className="text-justify font-poppins">
                                        Yes, our subtitle library includes subtitles for both movies and TV shows. You can search for your favorite TV show and download the subtitles for individual episodes.</p>
                                </div>
                            </div>

                            {/* 🔘 FAQ 9 🔘 */}
                            <div className="w-[350px] h-[300px] bg-white grid justify-center items-center rounded-lg p-5">
                                <div className="flex justify-center w-full items-center">
                                    <FontAwesomeIcon icon={faFileCirclePlus} className="text-[28px] mx-2 text-sky-500" />
                                    <p className="font-bold font-barlow text-[18px]">How often are new subtitles added to your website?</p>
                                </div>
                                <div>
                                    <p className="text-justify font-poppins">
                                        We regularly update our subtitle library with new additions. The frequency of updates depends on the availability of user-contributed subtitles. We encourage users to contribute and help expand our collection.</p>
                                </div>
                            </div>

                            {/* 🔘 FAQ 10 🔘 */}
                            <div className="w-[350px] h-[300px] bg-white grid justify-center items-center rounded-lg p-5">
                                <div className="flex justify-center w-full items-center">
                                    <FontAwesomeIcon icon={faUsers} className="text-[28px] mx-2 text-sky-500" />
                                    <p className="font-bold font-barlow text-[18px]">Is Sub Vault website completely free to use?</p>
                                </div>
                                <div>
                                    <p className="text-justify font-poppins">
                                        Yes, our website is completely free to use. We believe in providing access to subtitles without any subscription fees or hidden charges. Enjoy downloading subtitles without worrying about any costs.</p>
                                </div>
                            </div>

                            {/* 🔘 FAQ 11 🔘 */}
                            <div className="w-[350px] h-[300px] bg-white grid justify-center items-center rounded-lg p-5">
                                <div className="flex justify-center w-full items-center">
                                    <FontAwesomeIcon icon={faDownload} className="text-[28px] mx-2 text-sky-500" />
                                    <p className="font-bold font-barlow text-[18px]">Are there any limitations on the number of subtitles I can download?</p>
                                </div>
                                <div>
                                    <p className="text-justify font-poppins">
                                        There are no limitations on the number of subtitles you can download from our website. You are free to download as many subtitles as you need for your movies and TV shows.</p>
                                </div>
                            </div>

                            {/* 🔘 FAQ 12 🔘 */}
                            <div className="w-[350px] h-[300px] bg-white grid justify-center items-center rounded-lg p-5">
                                <div className="flex justify-center w-full items-center">
                                    <FontAwesomeIcon icon={faClosedCaptioning} className="text-[28px] mx-2 text-sky-500" />
                                    <p className="font-bold font-barlow text-[18px]">Can I download subtitles without providing any personal information?</p>
                                </div>
                                <div>
                                    <p className="text-justify font-poppins">
                                        Absolutely! We respect your privacy, and you can download subtitles without providing any personal information. We do not require any registration or personal details to access our subtitle library.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FAQ;