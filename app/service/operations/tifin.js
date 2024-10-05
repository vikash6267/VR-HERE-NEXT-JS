import { apiConnector } from "../apiConnector"
import { tifinEndpoints } from "../apis"
import { toast } from 'react-toastify';


const {
  ADD_TIFIN_API,
  FIND_TIFIN_API,
  ADD_UPDATE_API,
  FIND_ALL_TIFIN_API,
  SINGLE_TIFIN
} = tifinEndpoints;




export const CreateTifin = async (formData, token) => {
  console.log(formData)
  const toastId = toast.loading("Loading...");
  try {
    // Make the API call
    const response = await apiConnector("POST", ADD_TIFIN_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("CREATE Tifin API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could not add Tifin details");
    }

    toast.success("Tifin details added successfully");

  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }

  toast.dismiss(toastId);
};
export const editTifin = async (formData, token) => {
  console.log(formData)
  let result = []
  const toastId = toast.loading("Loading...");
  try {
    // Make the API call
    const response = await apiConnector("POST", ADD_UPDATE_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("EDIT Tifin API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could not edit Tifin details");
    }
    result = response?.data?.tifin
    toast.success("Tifin details Edited successfully");

  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
  toast.dismiss(toastId);
  return result
};


export const findTifin = async (token) => {
  try {
    const response = await apiConnector("GET", FIND_TIFIN_API, null, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch FIND_TIFIN_API");
    }
    const result = response?.data?.tifin;
    console.log("FIND_TIFIN_API :", result);
    return result;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};
export const singleTifin = async (slug) => {
  try {
    const response = await apiConnector("GET", `${SINGLE_TIFIN}/${slug}`);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    const result = response?.data?.tifin;
    return result;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Error fetching tifin data");
    console.error(error);
  }
};


export const allTifins = async () => {
  try {
    const response = await apiConnector("GET", FIND_ALL_TIFIN_API);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }
    const result = response?.data?.tifins;
    return result;
  } catch (error) {
    toast.error(error?.response?.data?.message)
    console.log(error)
  }
}