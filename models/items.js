import mongoose from "mongoose";

const ItemsSchema = mongoose.Schema({
  companyId: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", UserSchema);

// Connect to the MongoDB server
mongoose.connect("mongodb://127.0.0.1:27017/db_server", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
export default User;
