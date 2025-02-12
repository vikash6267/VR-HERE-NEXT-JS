import axios from "axios";

const BASE_API_URL = "https://api.vrhere.in/api/v1";

/**
 * Fetch all rooms for sitemap
 */
export async function getAllRoomsForSitemap() {
  try {
    const res = await axios.get(`${BASE_API_URL}/room/getAll`);
    return res.data.rooms; // axios JSON को ऑटो-पार्स कर देता है
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
}

/**
 * Fetch all tiffins for sitemap
 */
export async function getAllTifinsForSitemap() {
  try {
    const res = await axios.get(`${BASE_API_URL}/tifin/getAll`);
    return res.data.tifins;
  } catch (error) {
    console.error("Error fetching tiffins:", error);
    return [];
  }
}
