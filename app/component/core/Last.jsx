import React from "react";
import { MdHomeWork } from "react-icons/md";

const Last = () => {
  return (
    <div>
      <div className="flex justify-center flex-col gap-5 items-center">
        <div className="flex justify-center items-center bg-black text-yellow-600  p-4 rounded-full shadow-md shadow-pink-500">
          <MdHomeWork size={42} />
        </div>
        <div>
          <p className="text-yellow-600 text-center font-bold text-3xl">
            Best Deals On PGs and Tifin Near Vit Bhopal with VR Here
          </p>
        </div>
        <div>
          <p className="text-xl text-center mb-10">
            VR Here have tie ups with PGs and Tifin in every city near vit
            bhopal . VR Here sure that You get the best deals for PGs and tifin.{" "}
            <br />
            <span className="text-yellow-600  ">
              City : Ashta,Kothri, Sehore.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Last;
