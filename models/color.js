import mongoose from "mongoose";

const ColorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const Color = mongoose.model("Color", ColorSchema);

const predefinedcolors = [
  { name: "Pink" },
  { name: "Red" },
  { name: "Burgundy" },
  { name: "Brown" },
  { name: "Orange" },
  { name: "Yellow" },
  { name: "White" },
  { name: "Black" },
  { name: "Purple" },
  { name: "Blue" },
  { name: "Azure" },
  { name: "Gray" },
  { name: "Green" },
];

const createPredefinedColors = async () => {
  try {
    for (const colorData of predefinedcolors) {
      const existingcolor = await Color.findOne({ name: colorData.name });
      if (!existingcolor) {
        await Color.create(colorData);
      }
    }
  } catch (error) {
    console.error("Error adding predefined colors:", error);
  }
};

// Connect to the MongoDB server
mongoose
  .connect("mongodb://127.0.0.1:27017/db_server", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => createPredefinedColors());
export default Color;
