import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { userLogin, userSignUp } from "../../service/operations/user";
import { RxCross2 } from "react-icons/rx";

const PhoneModal = ({ show, onClose, revieModal }) => {
  const [formData, setFormData] = useState({
    email: "",
    contact: "",
    password: "",
    name: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [errors, setErrors] = useState({}); // State for validation errors
  const dispatch = useDispatch();


  if (!show) {
    return null;
  }

  const validateContact = (contact) => {
    const contactRegex = /^\d{10}$/;
    return contactRegex.test(contact);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "contact") {
      if (!validateContact(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          contact: "Contact number must be 10 digits long.",
        }));
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors.contact;
          return newErrors;
        });
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (isSignup) {
      if (!validateContact(formData.contact)) {
        setErrors({ contact: "Contact number must be 10 digits long." });
        return;
      }

      const signupResult = await dispatch(userSignUp(formData));
      if (signupResult) {
        onClose();
      }
    } else {
      const loginResult = await dispatch(
        userLogin(formData.email, formData.password)
      );

      if (loginResult) {
        onClose();
      }

      if (revieModal) {
        revieModal(true);
      }
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setFormData({ email: "", password: "", name: "", contact: "" });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <div
          onClick={() => onClose()}
          className="absolute cursor-pointer top-2 right-2 text-gray-900 hover:text-gray-700 text-2xl"
        >
          <RxCross2 />
        </div>

        <form className="space-y-4" onSubmit={handleOnSubmit}>
          {isSignup && (
            <>
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleOnChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleOnChange}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.contact ? "border-red-500" : ""
                  }`}
                  required
                />
                {errors.contact && (
                  <p className="text-red-500 text-xs mt-1">{errors.contact}</p>
                )}
              </div>
            </>
          )}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"} // Toggle input type based on state
                id="password"
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
              >
                {passwordVisible ? (
                  <FaEyeSlash size={22} />
                ) : (
                  <FaEye size={22} />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={toggleMode}
            className="text-blue-500 hover:text-blue-700"
          >
            {isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneModal;
