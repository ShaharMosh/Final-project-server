import itemDetailsService from "../services/itemDetails.js";
import Store from "../models/store.js";
import mongoose from "mongoose";
import Size from "../models/size.js";
import Color from "../models/color.js";
import Category from "../models/category.js";
import Gender from "../models/gender.js";

const getItemDetails = async (req, res) => {
    const item = await itemDetailsService.getItemDetails(req.body.itemId);
    if (item !== null) {
        console.log("controler-details:", item);
        const store = await Store.findById(item.store);
        const size = await Size.findById(item.size);
        const color = await Color.findById(item.color);

        res.json({
            id: item.id,
            image: item.image,
            price: item.price,
            store: store.name,
            name: item.name,
            size:size.name,
            color: color.name,
            cloros: item.color_url
        });
    } else {
        return res.status(404).send()
    }
};

export { getItemDetails };
