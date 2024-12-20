import React from "react";
import TimeLineImage from "../../assests/TimelineImage.png";
import Logo1 from "../../assests/TimeLineLogo/Logo1.svg";
import Logo2 from "../../assests/TimeLineLogo/Logo2.svg";
import Logo3 from "../../assests/TimeLineLogo/Logo3.svg";
import Logo4 from "../../assests/TimeLineLogo/Logo4.svg";
import Image from "next/image";

const TimeLine = [
  {
    Logo: Logo1,
    Heading: "Find PG Near You",
    Description: "PG Near VIT Bhopal In Ashta, Kothri, Sehore",
    compny: "VR Here",
  },
  {
    Logo: Logo2,
    Heading: "Find Tifin Near You",
    Description: "Tifin Near VIT Bhopal In Ashta, Kothri, Sehore",
    compny: "VR Here",
  },
  {
    Logo: Logo3,
    Heading: "PG Near Vit Bhopal",
    Description: "Room/PG Near Vit Bhopal",
    compny: "VR Here",
  },
  {
    Logo: Logo4,
    Heading: "Food Near Vit Bhopal",
    Description: "Tifin/Food Near Vit Bhopal",
    compny: "VR Here",
  },
];

const TimelineSection = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-20 mb-20 items-center">
        <div className="lg:w-[45%] flex flex-col gap-14 lg:gap-3">
          {TimeLine.map((ele, i) => {
            return (
              <div className="flex flex-col lg:gap-3" key={i}>
                <div className="flex gap-6" key={i}>
                  <div className="w-[52px] h-[52px] bg-black rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                    <Image  src={ele.Logo} alt="" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[18px]">{ele.Heading}</h2>
                    <p className="text-base">{ele.Description}</p>
                    <p className="text-[10px]">{ele.compny}</p>
                  </div>
                </div>
                <div
                  className={`hidden ${
                    TimeLine.length - 1 === i ? "hidden" : "lg:block"
                  }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}
                ></div>
              </div>
            );
          })}
        </div>
        <div className="relative w-fit h-fit shadow-pink-700 shadow-[0px_0px_30px_0px]">
          <div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-green-600 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 ">
            {/* Section 1 */}
            <div className="flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14">
              <h3 className="text-3xl font-bold w-[75px]">10</h3>
              <h3 className="text-caribbeangreen-300 text-sm w-[75px]">
                Active Vendor
              </h3>
            </div>

            {/* Section 2 */}
            <div className="flex gap-5 items-center lg:px-14 px-7">
              <h3 className="text-3xl font-bold w-[75px]">250</h3>
              <h3 className="text-caribbeangreen-300 text-sm w-[75px]">
                250 Daily Users
              </h3>
            </div>
            <div></div>
          </div>
          <Image   width={500} height={600}
            src={TimeLineImage}
            alt="timelineImage"
            className="shadow-black shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
