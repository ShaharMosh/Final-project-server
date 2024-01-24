import mongoose from 'mongoose'

const StyleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});
const Style = mongoose.model('Style', StyleSchema);

// Connect to the MongoDB server
mongoose.connect('mongodb://127.0.0.1:27017/db_server', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
export default Style;
