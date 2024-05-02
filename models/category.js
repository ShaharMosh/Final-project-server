import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const Category = mongoose.model("Category", CategorySchema);

const predefinedcategories = [
  { name: "Shirts" },
  { name: "Pants" },
  { name: "Jeans" },
  { name: "Shorts" },
  { name: "Dresses" },
  { name: "Skirts" },
  { name: "Sweaters" },
  { name: "Jackets" },
  { name: "Sweatshirts" },
  { name: "Shoes" },
];

const createPredefinedcategories = async () => {
  try {
    for (const categoryData of predefinedcategories) {
      const existingCategory = await Category.findOne({
        name: categoryData.name,
      });
      if (!existingCategory) {
        await Category.create(categoryData);
      }
    }
  } catch (error) {
    console.error("Error adding predefined categories:", error);
  }
};

// Connect to the MongoDB server
mongoose
  .connect("mongodb://127.0.0.1:27017/db_server", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => createPredefinedcategories());
export default Category;
