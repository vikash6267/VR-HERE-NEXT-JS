import { getAllRoomsForSitemap, getAllTifinsForSitemap } from "./lib/utils";

export default async function sitemap() {
  const baseURL = "https://vrhere.in/";
  let allRooms = [];
  let allTifins = [];

  try {
    allRooms = await getAllRoomsForSitemap();
    allTifins = await getAllTifinsForSitemap();
  } catch (error) {
    console.error("Error fetching data for sitemap");
  }

  const roomSitemap = allRooms.map((room) => ({
    url: `${baseURL}single-room/${room.slug}`,
    lastModified: room.updatedAt || new Date().toISOString(),
  }));

  const tifinSitemap = allTifins.map((tifin) => ({
    url: `${baseURL}tifin/${tifin.slug}`,
    lastModified: tifin.updatedAt || new Date().toISOString(),
  }));

  return [
    {
      url: baseURL,
      lastModified: new Date().toISOString(),
      priority: 1,
    },
    ...roomSitemap,
    ...tifinSitemap,
  ];
}
