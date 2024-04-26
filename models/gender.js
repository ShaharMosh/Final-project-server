import mongoose from "mongoose";

const GenderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const Gender = mongoose.model("Gender", GenderSchema);

const predefinedgenders = [{ name: "Men" }, { name: "Women" }];

const createPredefinedgender = async () => {
  try {
    for (const genderData of predefinedgenders) {
      const existingGender = await Gender.findOne({ name: genderData.name });
      if (!existingGender) {
        await Gender.create(genderData);
      }
    }
  } catch (error) {
    console.error("Error adding predefined gender:", error);
  }
};

// Connect to the MongoDB server
mongoose
  .connect("mongodb://127.0.0.1:27017/db_server", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => createPredefinedgender());
export default Gender;
