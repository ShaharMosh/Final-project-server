import mongoose from "mongoose";

const AdressesSchema = new mongoose.Schema({

    id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'Store',
  },
  address: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
});
const Adress = mongoose.model("Adress", AdressesSchema);


// Connect to the MongoDB server
mongoose.connect("mongodb://127.0.0.1:27017/db_server", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
export default Adress;
