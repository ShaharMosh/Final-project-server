import Item from "../models/item.js";
import { getImagesAndColors } from "../WebScraping/scraping.js";
import { getConfig } from "../WebScraping/websitesHtml.js";
import Store from "../models/store.js";
import Size from "../models/size.js";
import Color from "../models/color.js";

const getItemDetails = async (id) => {
  try {
    const item = await Item.findById(id);
    if (item) {
      console.log("item-service:", item);
      const store = await Store.findById(item.store);
      const size = await Size.findById(item.size);
      const color = await Color.findById(item.color);
      const config = getConfig(store.name);
      const url = item.url;

      const img_col = await getImagesAndColors(url, config);
      console.log("img_col", img_col);
      const images = img_col[0];
      const colors = img_col[1];

      const itemDetails = {
        id: item.id,
        image: item.image,
        price: item.price,
        store: store.name,
        name: item.name,
        size: size.name,
        color: color.name,
        colors: colors,
        images: images,
      };
      console.log("itemDetails", itemDetails);
      return itemDetails;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default {
  getItemDetails,
};
