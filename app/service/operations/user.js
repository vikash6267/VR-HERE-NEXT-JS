import { toast } from "react-toastify";
import { setLoading, setToken, setUser } from "../../redux/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { userEndpoints } from "../apis";
import { ratingEndpoints } from "../apis";

const {
  ADD_RATING_API,
  UPDATE_RATING_API,
  GET_ROOM_AVERAGE,
  GET_TIFIN_AVERAGE,
  CHECK_RATING_API,
} = ratingEndpoints;

const { SIGNUP_API, LOGIN_API, FETCH_PROFILE, USER_LOGIN_API, USER_SIGNUP_API, CONTACT, GET_VENDOR } = userEndpoints;

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE............", response?.data?.user?.role);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setToken(response?.data?.token));
      dispatch(setUser(response?.data?.user));
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      localStorage.setItem("token", JSON.stringify(response?.data?.token));

      toast.success(response?.data?.message);
      navigate("/vendor/dashboard");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(formData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, formData);

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      toast.success(response?.data?.message);
      navigate("/vendor/dashboard");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error(error?.response?.data?.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}


export function userLogin(email, password) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", USER_LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE............", response?.data?.user?.role);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setToken(response?.data?.token));
      dispatch(setUser(response?.data?.user));
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      localStorage.setItem("token", JSON.stringify(response?.data?.token));

      toast.success(response?.data?.message);
      return true;

    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error(error?.response?.data?.message);
      return false;
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function userSignUp(formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", USER_SIGNUP_API, formData);

      console.log("SIGNUP API RESPONSE............", response);

      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }

      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      toast.success(response?.data?.message);

      dispatch(setLoading(false));
      toast.dismiss(toastId);
      return true; // Indicate success
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error(error?.response?.data?.message);
      dispatch(setLoading(false));
      toast.dismiss(toastId);
      return false; // Indicate failure
    }
  };
}

export const findVendor = async ({ id }) => {
  try {
    const response = await apiConnector("GET", `${GET_VENDOR}/${id}`);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);

    }
    return response.data.user;
  } catch (error) {
    console.error(error);
    toast.error(error?.message || "An error occurred");
  }
};

// Rating Review

export const addRating = async (formData, token) => {
  console.log(formData);
  const toastId = toast.loading("Loading...");
  try {
    // Make the API call
    const response = await apiConnector("POST", ADD_RATING_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("ADD_RATING_API API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could not ADD_RATING_API details");
    }

    toast.success("Rating Send Successfull");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }

  toast.dismiss(toastId);
};

export const editRating = async (formData, token) => {
  console.log(formData);
  const toastId = toast.loading("Loading...");
  try {
    // Make the API call
    const response = await apiConnector("POST", UPDATE_RATING_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    // console.log("UPDATE_RATING_API API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could not UPDATE_RATING_API details");
    }

    toast.success("Update Rating Successfull");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }

  toast.dismiss(toastId);
};

export const roomAverageRating = async (formData, token) => {
  // console.log(formData);

  let result = 0
  try {
    // Make the API call
    const response = await apiConnector("POST", GET_ROOM_AVERAGE, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    // console.log("GET_ROOM_AVERAGE API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could not GET_ROOM_AVERAGE details");
    }
    // console.log(response?.data);
    result = response?.data?.averageRating

    // toast.success("Rating Send Successfull");
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    console.log(error);
  }

  return result
};

export const tifinAverageRating = async (formData, token) => {
  // console.log(formData);
  let result = 0

  const toastId = toast.loading("Loading...");
  try {
    // Make the API call
    const response = await apiConnector("POST", GET_TIFIN_AVERAGE, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    // console.log("GET_TIFIN_AVERAGE API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could not GET_TIFIN_AVERAGE details");
    }
    // console.log(response?.data);
    result = response?.data?.averageRating

    // toast.success("Rating Send Successfull");
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    console.log(error);
  }

  toast.dismiss(toastId);
  return result
};


export const checkRating = async (formData, token) => {
  // console.log(formData);
  // const toastId = toast.loading("Loading...");
  let result = null
  try {
    // Make the API call
    const response = await apiConnector("POST", CHECK_RATING_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("CHECK_RATING_API API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could not CHECK_RATING_API details");
    }
    // console.log(response?.data);
    result = response?.data
    // toast.success("Rating Send Successfull");
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    console.log(error);
  }
  // toast.dismiss(toastId);
  return result
};

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}



export function createContact(data) {
  return async (dispatch) => {
    const toastId = toast.loading("Submitting your contact information...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", CONTACT, data);

      console.log("CONTACT FORM SUBMISSION RESPONSE............", response?.data);

      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }

      toast.success(response?.data?.message);
      return true;

    } catch (error) {
      console.log("CONTACT FORM SUBMISSION ERROR............", error);
      toast.error(error?.response?.data?.message || "Failed to submit contact information.");
      return false;

    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));

    }
  };
}

