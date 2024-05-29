import mongoose from "mongoose";

const ItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  gender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gender",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  color: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
      required: true,
    },
  ],
  size: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Size",
      required: true,
    },
  ],
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
  // color_url: [
  //   {
  //     type: String,
  //     required: true,
  //   },
  // ],
  images: { type: [String], default: [] },
  colors: { type: [String], default: [] },
  color_url: { type: [String], default: [] },
});
const Item = mongoose.model("Item", ItemSchema);

// Connect to the MongoDB server
mongoose.connect("mongodb://127.0.0.1:27017/db_server", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default Item;
