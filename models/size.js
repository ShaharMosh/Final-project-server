import mongoose from "mongoose";

const SizeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Size = mongoose.model("Size", SizeSchema);

const predefinedSizes = [
  { name: "XS" },
  { name: "S" },
  { name: "M" },
  { name: "L" },
  { name: "XL" },
  { name: "XXL" },
  { name: "26" },
  { name: "28" },
  { name: "30" },
  { name: "31" },
  { name: "32" },
  { name: "33" },
  { name: "34" },
  { name: "35" },
  { name: "36" },
  { name: "37" },
  { name: "38" },
  { name: "39" },
  { name: "40" },
  { name: "41" },
  { name: "42" },
  { name: "43" },
  { name: "44" },
  { name: "45" },
  { name: "46" },
  { name: "48" },
];

const createPredefinedSizes = async () => {
  try {
    for (const sizeData of predefinedSizes) {
      const existingSize = await Size.findOne({ name: sizeData.name });
      if (!existingSize) {
        await Size.create(sizeData);
      }
    }
  } catch (error) {
    console.error("Error adding predefined sizes:", error);
  }
};

// Connect to the MongoDB server
mongoose
  .connect("mongodb://127.0.0.1:27017/db_server", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => createPredefinedSizes());

export default Size;
