import '../styles/style.css'

function About() {
    
return (
    <>
        <div id="Abouts" className="relative bg-black">
            <div className=" absolute top-[110px] left-[200px] w-[150px] h-[150px] border-2 hidden lg:block rounded-full">
                
            </div>
            
            <div className="absolute top-[50px] left-[-50px] hidden lg:block">
                <h2 className="text-white pl-10 text-[170px] font-jockey font-stroke tracking-[20px]">ABOUT US</h2>
            </div>

            <div className=" absolute top-[100px] left-[190px] w-[170px] h-[170px] border-2 hidden lg:block rounded-full">
                
            </div>

            <div className=" pt-12 m-10">
                <h2 className=" text-white text-[72px] lg:text-[128px] font-jockey ">ABOUT US</h2>
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
        </div>
        
    </>
    );
}

export default About;