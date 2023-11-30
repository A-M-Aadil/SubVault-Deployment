import { faArrowAltCircleLeft, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate} from "react-router-dom";

function AboutUs(){

    let navigate = useNavigate(); 

    return(
        <>
        <div id="Aboutus" className="w-screen top-0 bg-cover h-screen relative overflow-x-hidden bg-black">
            <div className="z-10 absolute top-10 left-10 text-white flex items-center">
                <FontAwesomeIcon icon={faArrowAltCircleLeft} onClick={() => navigate(-1)} className="text-black cursor-pointer text-[38px] md:text-[48px] mx-2" />
                <h1 className=' font-barlow font-extrabold text-[42px] lg:text-[68px] text-black'>About Us</h1>
            </div>
            <div className=" absolute top-0 w-full h-[400px] overflow-hidden">
                <img className="w-full" src="https://i.postimg.cc/5N4PkP3g/jakob-owens-ntqa-Ffr-Dd-EA-unsplash.jpg"/>
            </div>
            <div className="z-10 grid justify-center relative mt-[150px] lg:mt-[280px]">
                <div className=" grid justify-center ">
                    <img className="w-[240px] lg:w-[350px] " src="https://i.postimg.cc/DzHj5zh2/SubVault.png" />
                </div>
                <div className=" grid justify-center">
                    <h1 className="text-white text-center my-5 text-[42px] lg:text-[68px] font-poppins">Subtitle Library</h1>
                </div>
            </div>

            <div className="flex text-left justify-center w-full ">
                <p className="text-white m-10 text-justify text-[18px] lg:text-[24px]">
                Our platform is dedicated to providing you with the best possible movie subtitles. 
                We understand that watching movies is not just a pastime, but an immersive way to experience
                different stories and cultures. That's why we have curated a vast collection of movies from around 
                the world, spanning different genres, languages, and eras.<br/><br/>

            
                Our team is committed to bringing quality content to your screens, and we are always searching for new,
                exciting movies to add to our collection. We believe that everyone should have access to high-quality cinema, 
                regardless of where they live or what language they speak. This is why we strive to ensure that our movies are 
                available to viewers worldwide.<br/><br/>
                
                But that's not all - we are also passionate about creating a community of movie lovers. That's why we have 
                implemented features that allow you to share your thoughts about the movies you watch, recommend movies 
                to your friends, and engage with other viewers through discussions and reviews.<br/><br/>
                
                At our platform, we believe that movies have the power to change the world, and we are proud to be a 
                part of that change. So go ahead, sit back, and enjoy the movies - we'll take care of the rest.
                </p>
            </div>

            <div className=" w-full bg-cover bg-[url('https://i.postimg.cc/Kvp9WvT9/rut-miit-o-Tgl-G1-D4h-RA-unsplash.jpg')]">
                <div className=" w-full h-[400px] flex overflow-hidden justify-center items-center">
                    <h2 className="text-white font-poppins font-extrabold text-[68px] lg:text-[98px] drop-shadow-2xl text-center">Who We Are</h2>
                </div>
            </div>
            
            <div className="flex text-left justify-center w-full ">
                <p className="text-white m-10 text-justify text-[18px] lg:text-[24px]">
                We are a group of passionate and driven undergraduate software engineering students. 
                With a shared love for technology and a desire to make a difference in the world, 
                we have come together to embark on this exciting journey of learning and innovation.<br/><br/>

            
                As software engineering students, we are constantly pushing the boundaries of what is possible. 
                We thrive on challenges and enjoy solving complex problems using our technical expertise and creative thinking. 
                Our commitment to excellence drives us to continuously improve our skills and stay up-to-date with the latest advancements in the field.<br/><br/>
                
                But we are more than just programmers and developers. We are a diverse group of individuals with unique perspectives and backgrounds. 
                From our various experiences, we bring a range of skills and knowledge to the table, 
                allowing us to approach projects from different angles and find innovative solutions.<br/><br/>
                
                Collaboration is at the heart of everything we do. We believe that great ideas are born through teamwork and open communication. 
                By working together, sharing ideas, and challenging each other, we are able to 
                create software that not only meets the needs of our clients but also exceeds their expectations.<br/><br/>

                Our dedication to quality is unwavering. We understand the importance of delivering reliable and efficient 
                software that not only functions flawlessly but also provides an exceptional user experience. 
                We take pride in our work and strive for perfection in every line of code we write.<br/><br/>

                As undergraduate students, we are always seeking opportunities to learn and grow. 
                We actively engage in workshops, and conferences to expand our knowledge and gain real-world experience. 
                We are eager to apply our skills and contribute to the ever-evolving software industry.
                </p>
            </div>

            <div className=" w-full bg-cover bg-[url('https://i.postimg.cc/jdXz3sWD/c-chang-duong-Sj0i-Mtq-Z4w-unsplash.jpg')]">
                <div className=" w-full h-[400px] flex overflow-hidden justify-center items-center">
                    <h2 className="text-white font-poppins font-extrabold text-[68px] lg:text-[98px] drop-shadow-2xl">Our Team</h2>
                </div>
            </div>

            <div className=" grid justify-center">
                <h1 className="text-white text-center my-5 text-[48px] font-poppins ">Team Unity</h1>
            </div>

            <div className=" grid justify-center">
                <div class="grid lg:grid-cols-2 2xl:grid-cols-4 gap-4 justify-end items-center p-10">
                    <div className="w-[350px] h-[400px] bg-black border-4 border-[rgba(0,116,247,0.8)] drop-shadow-[0_0px_40px_rgba(0,116,247,0.8)] rounded-lg flex justify-center  items-center">
                        <div className="">
                            <div className="flex justify-center">
                            <div className="w-[175px] h-[175px] border-4 flex justify-center items-center border-sky-500 rounded-full ">
                                <div className="w-[150px] h-[150px] bg-white rounded-full">
                                    <img src='https://media.licdn.com/dms/image/D5603AQHOKkhg3jFg7A/profile-displayphoto-shrink_800_800/0/1685972847725?e=1706140800&v=beta&t=cuJ-7QiA_OKDA2UplDhBypI20qOHpi_MiY5ASXSTvgo'/>
                                </div>
                            </div>
                                
                            </div>
                            <h2 className=" font-poppins text-white text-[28px] mt-3 text-center">Janith Srimal</h2>
                            <h2 className=" font-poppins text-[#dbdbdb] text-[20px] text-center">Software Engineer</h2>
                            <div className="flex justify-center mt-3">
                                <a href="https://www.linkedin.com/in/janith-srimal-aaa9911b4/"><div className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center text-[20px] mx-2 cursor-pointer"><FontAwesomeIcon icon={faLinkedinIn} /></div></a>
                                <a href="https://twitter.com"><div className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center text-[20px] mx-2 cursor-pointer"><FontAwesomeIcon icon={faTwitter} /></div></a>
                                <a href="mailto:janithsrimal9@gmail.com"><div className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center text-[20px] mx-2 cursor-pointer"><FontAwesomeIcon icon={faEnvelope} /></div></a>
                            </div>
                            
                        </div>
                    </div>

                    <div className="w-[350px] h-[400px] bg-black border-4 border-[rgba(0,116,247,0.8)] drop-shadow-[0_0px_40px_rgba(0,116,247,0.8)] rounded-lg flex justify-center items-center">
                        <div className="">
                            <div className="flex justify-center">
                            <div className="w-[175px] h-[175px] border-4 flex justify-center items-center border-sky-500 rounded-full">
                                <div className="w-[150px] h-[150px] bg-white rounded-full">
                                    <img src='https://media.licdn.com/dms/image/D5635AQHzMixo_eebDg/profile-framedphoto-shrink_800_800/0/1676266744565?e=1701090000&v=beta&t=jgXwSMY9LZfP8Wg8G8Lq6slcKxuOnAoDXH7Rxqa4joE'/>
                                </div>
                            </div>
                                
                            </div>
                            <h2 className=" font-poppins text-white text-[28px] mt-3 text-center">Sudeepa Wijerathna</h2>
                            <h2 className=" font-poppins text-[#dbdbdb] text-[20px] text-center">Software Engineer</h2>
                            <div className="flex justify-center mt-3">
                                <a href="https://www.linkedin.com/in/sudeepa-wijerathna-67056617b/"><div className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center text-[20px] mx-2 cursor-pointer"><FontAwesomeIcon icon={faLinkedinIn} /></div></a>
                                <a href="https://twitter.com"><div className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center text-[20px] mx-2 cursor-pointer"><FontAwesomeIcon icon={faTwitter} /></div></a>
                                <a href="s.wijerathna.14d@gmail.com"><div className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center text-[20px] mx-2 cursor-pointer"><FontAwesomeIcon icon={faEnvelope} /></div></a>
                            </div>
                            
                        </div>
                    </div>

                    <div className="w-[350px] h-[400px] bg-black border-4 border-[rgba(0,116,247,0.8)] drop-shadow-[0_0px_40px_rgba(0,116,247,0.8)] rounded-lg flex justify-center items-center">
                        <div className="">
                            <div className="flex justify-center">
                            <div className="w-[175px] h-[175px] border-4 flex justify-center items-center border-sky-500 rounded-full">
                                <div className="w-[150px] h-[150px] bg-white rounded-full">
                                    <img src='https://media.licdn.com/dms/image/D5603AQGElwC562jF4Q/profile-displayphoto-shrink_800_800/0/1689793108733?e=1706140800&v=beta&t=N4aqwNEZRsJ2V0zxAqY1P4Y41YX0CGu42LDCwHt8BmY'/>
                                </div>
                            </div>
                                
                            </div>
                            <h2 className=" font-poppins text-white text-[28px] mt-3 text-center">Kavinda Athukorala</h2>
                            <h2 className=" font-poppins text-[#dbdbdb] text-[20px] text-center">Software Engineer</h2>
                            <div className="flex justify-center mt-3">
                            <a href="https://www.linkedin.com/in/kavindabanukaathukorala/"><div className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center text-[20px] mx-2 cursor-pointer"><FontAwesomeIcon icon={faLinkedinIn} /></div></a>
                                <a href="https://twitter.com"><div className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center text-[20px] mx-2 cursor-pointer"><FontAwesomeIcon icon={faTwitter} /></div></a>
                                <a href="mailto:kbathukorala@gmail.com"><div className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center text-[20px] mx-2 cursor-pointer"><FontAwesomeIcon icon={faEnvelope} /></div></a>
                            </div>
                            
                        </div>
                    </div>

                    <div className=" w-[350px] h-[400px] bg-black border-4 border-[rgba(0,116,247,0.8)] rounded-lg flex justify-center items-center drop-shadow-[0_0px_40px_rgba(0,116,247,0.8)]">
                        <div className="">
                            <div className="flex justify-center">
                            <div className="w-[175px] h-[175px] border-4 flex justify-center items-center border-sky-500 rounded-full">
                                <div className="w-[150px] h-[150px] bg-white rounded-full">
                                    <img src='https://media.licdn.com/dms/image/D5603AQGZ_xhi6bOqdg/profile-displayphoto-shrink_800_800/0/1676539327192?e=1706140800&v=beta&t=tL5tESqHIoBuGCfo0Pux7cG1Bbl_Kmg3ytPdBdQsXWM'/>
                                </div>
                            </div>
                                
                            </div>
                            <h2 className=" font-poppins text-white text-[28px] mt-3 text-center">A.M. Aadil</h2>
                            <h2 className=" font-poppins text-[#dbdbdb] text-[20px] text-center">Software Engineer</h2>
                            <div className="flex justify-center mt-3">
                                <a href="https://www.linkedin.com/in/am-aadil/"><div className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center text-[20px] mx-2 cursor-pointer"><FontAwesomeIcon icon={faLinkedinIn} /></div></a>
                                <a href="https://twitter.com"><div className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center text-[20px] mx-2 cursor-pointer"><FontAwesomeIcon icon={faTwitter} /></div></a>
                                <a href="mailto:aadil.titan@gmail.com"><div className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center text-[20px] mx-2 cursor-pointer"><FontAwesomeIcon icon={faEnvelope} /></div></a>
                            </div>
                            
                        </div>
                    </div>

                    


                </div>
            </div>

            <div className="mt-[100px] w-full bg-cover bg-[url('https://i.postimg.cc/zDRKPNm8/c-nasa-Q1p7bh3-SHj8-unsplash.jpg')]">
                <div className=" w-full h-[400px] flex overflow-hidden justify-center items-center">
                    <h2 className="text-white font-poppins font-extrabold text-[48px] lg:text-[78px] text-center drop-shadow-2xl">Thank You for Visiting..</h2>
                </div>
            </div>
        </div>

        
        </>
    );
}

export default AboutUs;