import mongoose from "mongoose";

const EmailSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
});
const Email = mongoose.model("email", EmailSchema);

// Connect to the MongoDB server
mongoose.connect("mongodb://127.0.0.1:27017/db_server", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
export default Email;
