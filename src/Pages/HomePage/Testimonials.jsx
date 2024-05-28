import React, { useState, useEffect } from "react";
import ribbon from "../../../public/ribbon.png";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsData = [
    {
      image:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Sam",
      profession: "Air Quality Monitoring Solutions",
      description:
        "Dear Namita and Airorigin team, Our company has been using your monitors for two years now. Your monitors have proven reliable, accurate, and easy to install across multiple locations. The indoor and outdoor monitors offer superior data quality compared to others we've tried. The user-friendly dashboard and app provide real-time data in a format that's easy to understand. Your team's responsiveness and proactive approach have been outstanding. Wishing you continued success and all the best in your business.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Namita Team",
      profession: "Indoor Air Quality Management",
      description:
        "Airorigin has transformed our approach to indoor air quality management with the help of your reliable monitoring, valuable insights, and exceptional support. We have been able to significantly improve air quality for our clients using Airorigin's solutions. We highly recommend Airorigin for efficient and reliable air quality monitoring solutions.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "John",
      profession: "Environmental Analyst",
      description:
        "Dear Airorigin team, We've been using your monitoring solutions for environmental analysis for the past year. The accuracy and reliability of your monitors have been exceptional. The insights provided by your system have been instrumental in our decision-making processes. We appreciate the user-friendly interface of the dashboard and app, making it easy for us to access real-time data. Keep up the great work!",
    },
    {
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Josh",
      profession: "Environmental Scientist",
      description:
        "To the Airorigin team, Your air quality monitoring solutions have revolutionized our research efforts. The accuracy and reliability of your monitors have significantly enhanced our data collection process. The detailed insights provided by your system have been invaluable in our environmental research projects. We commend your team for their outstanding support and commitment to excellence.",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="my-10 flex flex-col justify-center items-stretch max-w-[90%] mx-auto w-full">
      <br />
      <br />
      <div className="flex justify-center w-[70%] flex-row items-center">
        <h1 className="text-3xl lg:text-5xl font-bold text-left mb-4 text-black">
          <span className="border-b-4 border-[#44caff] me-1">Test</span>imonials
        </h1>
      </div>
      <div className="container my-24 mx-auto md:px-6">
        <section className="mb-32 text-center lg:text-left">
          <div className="py-12 md:px-6 md:px-12">
            <div className="container mx-auto xl:px-32">
              <div className="flex grid items-stretch lg:grid-cols-2 relative">
                <img
                  src={ribbon}
                  alt="Logo"
                  className="absolute top-5 right-0 w-20 h-auto z-10 rotate-6"
                />
                <div className="md:mb-12 md:mt-12 lg:mt-0 lg:mb-0">
                  <div className="relative z-[1] block rounded-lg bg-[#497cdb2c] shadow-[#78d6e744] backdrop-filter backdrop-blur-lg bg-opacity-40 md:px-12 lg:-mr-14 h-full flex justify-center items-start flex-col">
                    <h2 className="mb-2 text-2xl lg:text-3xl font-bold text-primary dark:text-primary-400">
                      {testimonialsData[currentIndex].name}
                    </h2>
                    <p className="mb-4 font-semibold text-lg lg:text-base text-neutral-900 dark:text-neutral-900">
                      {testimonialsData[currentIndex].profession}
                    </p>
                    <p className="mb-6 text-lg lg:text-base text-neutral-700 dark:text-neutral-700">
                      {testimonialsData[currentIndex].description}
                    </p>
                  </div>
                </div>

                <div className="md:mb-12 lg:mb-0 h-full">
                  <img
                    src={testimonialsData[currentIndex].image}
                    className="lg:rotate-[6deg] w-full h-[50vh] rounded-lg shadow-lg dark:shadow-black/20 object-cover"
                    alt="Testimonial"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Testimonials;
