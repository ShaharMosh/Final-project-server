import mongoose from "mongoose";

const dailySearchesSchema = mongoose.Schema({
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
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Color",
    required: true,
  },
  size: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Size",
    required: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
});

const DailySearches = mongoose.model("DailySearches", dailySearchesSchema);

// Connect to the MongoDB server
mongoose.connect("mongodb://127.0.0.1:27017/db_server", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default DailySearches;
