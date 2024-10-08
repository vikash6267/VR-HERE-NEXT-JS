// next-sitemap.config.js

const fetchRoomData = async () => {
  try {
    const response = await fetch('https://apivrhere.mahitechnocrafts.in/api/v1/room/getAll');
    const { rooms } = await response.json();
    return rooms.map((room) => ({
      loc: `/single-room/${room.slug}`,
      lastmod: room.updatedAt ? new Date(room.updatedAt).toISOString() : new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Failed to fetch room data:', error);
    return [];
  }
};

const fetchTifinData = async () => {
  try {
    const response = await fetch('https://apivrhere.mahitechnocrafts.in/api/v1/tifin/getAll');
    const { tifins } = await response.json();
    return tifins.map((tifin) => ({
      loc: `/tifin/${tifin.slug}`,
      lastmod: tifin.updatedAt ? new Date(tifin.updatedAt).toISOString() : new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Failed to fetch tiffin data:', error);
    return [];
  }
};

module.exports = {
  siteUrl: 'https://vrhere.in',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  additionalPaths: async (config) => {
    const roomUrls = await fetchRoomData();
    const tifinUrls = await fetchTifinData();
    return [...roomUrls, ...tifinUrls];
  },
};
