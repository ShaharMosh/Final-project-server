import Item from "../models/item.js";
import { getImagesAndColors } from "../WebScraping/scraping.js";
import { getConfig } from "../WebScraping/websitesHtml.js";
import Store from "../models/store.js";
import Size from "../models/size.js";
import Color from "../models/color.js";

const getItemDetails = async (id) => {
  try {
    const item = await Item.findById(id);
    if (!item) return null;

    // Parallelize fetching store, size, and color
    const [store, size, color] = await Promise.all([
      Store.findById(item.store),
      Size.findById(item.size),
      Color.findById(item.color),
    ]);

    // Check if images and colors are already present in the database
    let images = item.images || [];
    let colors = item.colors || [];

    if (images.length === 0 || colors.length === 0) {
      // Get configuration for the store
      const config = getConfig(store.name);
      const url = item.url;

      // Fetch images and colors using web scraping
      const [fetchedImages, fetchedColors] = await getImagesAndColors(
        url,
        config
      );

      images = fetchedImages.length > 0 ? fetchedImages : images;
      colors = fetchedColors.length > 0 ? fetchedColors : colors;

      // Save the fetched images and colors back to the database
      if (images.length > 0 || colors.length > 0) {
        item.images = images;
        item.colors = colors;
        await item.save();
      }
    }

    return {
      id: item.id,
      image: item.image,
      price: item.price,
      store: store.name,
      name: item.name,
      size: size.name,
      color: color.name,
      colors: colors,
      images: images,
      url: item.url,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default {
  getItemDetails,
};
