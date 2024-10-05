import { apiConnector } from "../apiConnector";
import { roomEndpoints } from "../apis";
import { toast } from "react-toastify";

const {
  ALL_LOCATION,
  ADD_ROOM_API,
  IMAGE_UPLOAD,
  FIND_ROOM_API,
  ROOM_LEADING,
  ADD_LEADING,
  ROOM_UPDATE_API,
  VISIT_API,
  ALL_ROOM,
  SINGLE_ROOM,
  LOCATION_BY_ID
} = roomEndpoints

export const allLocations = async () => {
  try {
    const response = await apiConnector("GET", ALL_LOCATION);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    const result = response?.data?.locations;
    return result;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const roomVisits = async (token) => {
  try {
    const response = await apiConnector("GET", VISIT_API, null, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    const result = response?.data;
    return result;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const CreateRooms = async (formData, token) => {
  console.log(formData);
  const toastId = toast.loading("Loading...");
  try {
    // Make the API call
    const response = await apiConnector("POST", ADD_ROOM_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("CREATE ROOM API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could not add room details");
    }

    toast.success("Room details added successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }

  toast.dismiss(toastId);
};
export const AddLeading = async (formData) => {
  console.log(formData);
  const toastId = toast.loading("Loading...");
  try {
    // Make the API call
    const response = await apiConnector("POST", ADD_LEADING, formData, {
      "Content-Type": "multipart/form-data",

    });

    console.log("CREATE ROOM API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could not ADD_LEADING details");
    }

    toast.success("Send Enquiry Deatils successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }

  toast.dismiss(toastId);
};

export const updateRoom = async (formData, token) => {
  console.log(formData);
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    // Make the API call
    const response = await apiConnector("POST", ROOM_UPDATE_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("ROOM_UPDATE_API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could not edit room details");
    }
    result = response?.data?.room;
    toast.success("Room details Edited successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
  toast.dismiss(toastId);
  return result;
};

export const allRoom = async () => {
  try {
    const response = await apiConnector("GET", ALL_ROOM);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    const result = response?.data?.rooms;
    return result;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);

  }
};

export const singleRoom = async (slug) => {
  try {
    const response = await apiConnector("GET", `${SINGLE_ROOM}/${slug}`);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    const result = response?.data?.room;
    return result;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Error fetching room data");
    console.error(error);
  }
};
export const singleLocation = async (id) => {
  try {
    const response = await apiConnector("GET", `${LOCATION_BY_ID}/${id}`);
    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }
    const result = response?.data?.location;
    return result;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Error fetching location data");
    console.error(error);
  }
};


export const findRoom = async (token) => {
  try {
    const response = await apiConnector("GET", FIND_ROOM_API, null, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Product");
    }
    const result = response?.data?.rooms;
    console.log("FIND_ROOM_API :", result);
    return result;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};
export const roomLeads = async (token) => {
  try {
    const response = await apiConnector("GET", ROOM_LEADING, null, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Product");
    }
    const result = response?.data?.leading;
    console.log("ROOM_LEADING :", result);
    return result;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const imageUpload = async (data, token) => {
  let result = [];
  console.log(data);
  const toastId = toast.loading("Loading...");
  try {
    const formData = new FormData();
    for (let i = 0; i < data.length; i++) {
      formData.append("thumbnail", data[i]);
    }
    const response = await apiConnector("POST", IMAGE_UPLOAD, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    // console.log("CREATE IMAGE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add IMAGE Details");
    }
    toast.success("IMAGE Details Added Successfully");
    result = response?.data?.images;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
  }
  toast.dismiss(toastId);
  return result;
};
