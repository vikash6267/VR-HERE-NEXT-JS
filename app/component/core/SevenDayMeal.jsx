import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const SevenDayMeal = ({ menu, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex items-center">
        <h3 className="text-sm font-semibold w-32">{title}</h3>
        <button onClick={handleToggle} className="ml-2">
          {isOpen ? <FaMinus size={20} /> : <FaPlus size={20} />}
        </button>
      </div>
      {isOpen && (
        <ul className="mt-2 list-disc pl-5">
          {menu?.map((item, index) => (
            <li key={index} className="text-gray-700">
              <span>{item.menu}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SevenDayMeal;
