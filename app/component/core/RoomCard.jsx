import React from "react";
import { HiCurrencyRupee } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import { BiMaleFemale } from "react-icons/bi";
import { TbToolsKitchen3 } from "react-icons/tb";
import Link from "next/link";
import Image from "next/image";

const RoomCard = ({ room, view }) => {
  const getGenderIcon = () => {
    switch (room?.AvailableForBoysOrGirl?.toLowerCase()) {
      case "boy":
        return (
          <div className="flex gap-2 items-center lg:text-xl">
            <FcBusinessman size={25} />
            <span>Boys</span>
          </div>
        );
      case "girls":
        return (
          <div className="flex gap-2 items-center lg:text-xl">
            <FcBusinesswoman size={25} />
            <span>Girls</span>
          </div>
        );
      default:
        return (
          <div className="flex gap-2 items-center lg:text-xl">
            <BiMaleFemale size={25} />
            <span>Both</span>
          </div>
        );
    }
  };

  return (
    <Link
      href={`/single-room/${room?.slug}`}
      className={`mb-8 shadow-xl shadow-yellow-600 ${
        view === "row"
          ? "flex p-4 border rounded shadow"
          : "p-4 border rounded shadow"
      }`}
    >
      <div className="h-[200px]  mx-auto md:mx-0 shadow-lg shadow-yellow-600  ">
        <Image
          width={500}
          height={800}
          src={room?.images?.[0]?.url}
          alt={`Image of ${room?.pgName}`}
          className="object-cover h-full w-full rounded hover:scale-95"
        />
      </div>
      <div
        className={`mt-4 ${
          view === "row"
            ? "ml-4 flex flex-col justify-center"
            : "text-start pl-6 lg:pl-0"
        }`}
      >
        <p className="font-semibold text-lg">{room?.pgName}</p>
        <p className="mt-2 flex gap-2 items-center text-green-600">
          <HiCurrencyRupee size={25} />
          <span className="lg:text-xl">{room?.price}</span>
        </p>
        <p className="mt-2 text-red-600 flex gap-2 items-center">
          <FaLocationDot size={25} />
          <span className="lg:text-xl">
            {room?.Location?.map((loc) => loc?.name).join(", ")}
          </span>
        </p>
        <p className="mt-2 text-gray-600 flex gap-2 items-center">
          {getGenderIcon()}
        </p>
        <p className="mt-2 text-gray-600 flex gap-2 items-center">
          <TbToolsKitchen3 size={25} />
          <span className="lg:text-xl">
            {room?.vegNonveg ? "Veg" : "Non-Veg"}
          </span>
        </p>
      </div>
    </Link>
  );
};

export default RoomCard;

